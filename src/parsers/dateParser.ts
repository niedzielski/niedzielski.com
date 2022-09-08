export function parseYYYYMMDDDate(str: string): Date {
  const match = str.match(/(?<yyyy>\d{4})-(?<mm>\d{2})-(?<dd>\d{2})/);
  const { yyyy, mm, dd } = match?.groups ?? {};
  if (yyyy == null) throw Error('Date expected year in YYYY-MM-DD format.');
  if (mm == null) throw Error('Date expected month in YYYY-MM-DD format.');
  if (dd == null) throw Error('Date expected day in YYYY-MM-DD format.');
  return new Date(`${yyyy}-${mm}-${dd}`);
}
