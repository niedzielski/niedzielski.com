export function assertObject(
  val: unknown,
  msg = 'Object expected.',
): asserts val is Record<string, unknown> {
  if (isObject(val)) return;
  throw Error(msg);
}

export function isObject(val: unknown): val is Record<string, unknown> {
  return val != null && !Array.isArray(val) && typeof val == 'object';
}
