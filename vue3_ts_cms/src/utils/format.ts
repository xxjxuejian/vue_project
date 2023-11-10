import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export default function formatUTC(utcString: string, format = 'YY/MM/DD HH:mm:ss') {
  const resTimeStr = dayjs.utc(utcString).utcOffset(8).format(format)
  return resTimeStr
}
