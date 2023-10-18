import { parseDate } from '@internationalized/date';
import { format, subMonths } from 'date-fns';

export const INITIAL_PERIOD = {
  start: parseDate(format(subMonths(new Date(), 1), 'yyyy-MM-dd')),
  end: parseDate(format(new Date(), 'yyyy-MM-dd'))
}
