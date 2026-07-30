import fs from 'fs';
import path from 'path';

let hasError = false;

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    hasError = true;
  }
}

console.log('Validating Architecture Boundaries...');

const ROOT_DIR = path.resolve(process.cwd(), 'src');

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allSrcFiles = getAllFiles(ROOT_DIR);

allSrcFiles.forEach((filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const importLines = content.split('\n').filter((line) => line.startsWith('import '));
  const relativePath = filePath.replace(ROOT_DIR, '').replace(/\\/g, '/');

  importLines.forEach((line) => {
    // 1. Shared cannot import Features
    if (relativePath.startsWith('/shared/')) {
      assert(
        !line.includes('@/features/') && !line.includes('../features/'),
        `[Architecture Violation] ${relativePath} (Shared) imports Feature layer: ${line}`
      );
    }

    // 2. Core cannot import Features
    if (relativePath.startsWith('/core/')) {
      assert(
        !line.includes('@/features/') && !line.includes('../features/'),
        `[Architecture Violation] ${relativePath} (Core) imports Feature layer: ${line}`
      );
    }

    // 3. Features cannot import other Features (Must be completely decoupled)
    if (relativePath.startsWith('/features/')) {
      const featureMatch = relativePath.match(/^\/features\/([^/]+)/);
      if (featureMatch) {
        const currentFeatureName = featureMatch[1];
        
        // Check for absolute @/features/ imports
        const absoluteMatch = line.match(/@\/features\/([^/'"]+)/);
        if (absoluteMatch) {
          const importedFeature = absoluteMatch[1];
          assert(
            importedFeature === currentFeatureName,
            `[Architecture Violation] ${relativePath} imports another feature '${importedFeature}': ${line}`
          );
        }
        
        // Relative crossing is harder to detect with naive regex, but we block `@/features/other`
      }
    }
  });
});

if (hasError) {
  console.error('\n💥 Architecture validation FAILED.');
  process.exit(1);
} else {
  console.log('\n✅ Architecture boundaries verified successfully!');
}
