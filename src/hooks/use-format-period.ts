import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { SchemaFilter } from '../Filter'

export function useFormatPeriod(filter: SchemaFilter) {
  const [dateStart, dateEnd] = [
    parseISO(filter.period.start.toString()),
    parseISO(filter.period.end.toString())
  ]
  const [formattedStart, formattedEnd] = [
    format(dateStart, 'LLL, yyyy', { locale: ptBR }),
    format(dateEnd, 'LLL, yyyy', { locale: ptBR })
  ]

  if (formattedStart === formattedEnd) {
    return formattedStart
  }

  return `${formattedStart} | ${formattedEnd}`

}
