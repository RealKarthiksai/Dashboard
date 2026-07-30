import { Permission } from '../src/core/authorization/permissions';
import { ROLE_TEMPLATES } from '../src/core/authorization/roles/templates';

let hasError = false;

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    hasError = true;
  }
}

console.log('Validating Permissions and Roles...');

// 1. Uniqueness of Permissions
const permissionValues = new Set<string>();
const allPermissions = Object.values(Permission).flatMap((group) => Object.values(group));

allPermissions.forEach((perm) => {
  assert(!permissionValues.has(perm), `Duplicate permission value found: ${perm}`);
  permissionValues.add(perm);
});
console.log(`✅ Validated ${allPermissions.length} unique permissions.`);

// 2. Role Templates Validation
const activeRoles = Object.keys(ROLE_TEMPLATES);
activeRoles.forEach((role) => {
  const perms = ROLE_TEMPLATES[role as keyof typeof ROLE_TEMPLATES];
  assert(perms.length > 0 || role === 'Viewer', `[Role: ${role}] has no permissions assigned.`);
  
  perms.forEach((perm) => {
    assert(permissionValues.has(perm), `[Role: ${role}] references invalid permission: ${perm}`);
  });
});
console.log(`✅ Validated ${activeRoles.length} roles against permission registry.`);

if (hasError) {
  console.error('\n💥 Permission validation FAILED.');
  process.exit(1);
} else {
  console.log('\n✅ Permission and Role integrity checks passed!');
}
