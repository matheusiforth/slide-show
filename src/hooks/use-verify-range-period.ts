import { addMonths, isAfter } from "date-fns";

import { useFilterContext } from "../contexts/filter";

export function useVerifyRangePeriod() {
  const { filter } = useFilterContext()

  const { period } = filter;
  const outRange = verifyRangePeriod(period.start.toString(), period.end.toString())

  return {
    outRange,
  }
}

function verifyRangePeriod(startDate: string, endDate: string) {
  const oneMonth = addMonths(new Date(startDate), 1);

  if (isAfter(new Date(endDate), oneMonth)) {
    return true
  } else {
    return false
  }
}
