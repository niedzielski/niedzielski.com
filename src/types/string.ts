export function assertNonBlank(
  str: string,
  msg = 'Nonblank string expected.'
): void {
  if (isNonBlank(str)) return
  throw Error(msg)
}

export function isNonBlank(str: string): boolean {
  return !/^\s*$/.test(str)
}
