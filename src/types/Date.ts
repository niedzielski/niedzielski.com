export function compareDates(lhs: Readonly<Date>, rhs: Readonly<Date>): number {
  return lhs.getTime() - rhs.getTime()
}
