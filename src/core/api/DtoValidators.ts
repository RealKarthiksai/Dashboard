export class DtoValidators {
  public static isValidId(id: unknown): id is string {
    return typeof id === 'string' && id.trim().length > 0;
  }

  public static ensureArray<T>(data: unknown, fallback: T[] = []): T[] {
    return Array.isArray(data) ? (data as T[]) : fallback;
  }

  public static ensureObject<T extends object>(data: unknown, fallback: T): T {
    return data && typeof data === 'object' && !Array.isArray(data) ? (data as T) : fallback;
  }
}
