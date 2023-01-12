import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function dateToUTC(date: string | number | Date | Dayjs): string {
  return dayjs(date).utc().local().format();
}
