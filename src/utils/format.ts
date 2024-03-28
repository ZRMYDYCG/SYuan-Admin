import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

/**
 * 将UTC时间字符串格式化为指定格式的本地时间字符串
 * @param {string} utcString - 需要格式化的UTC时间字符串
 * @param {string} [formatType='YYYY-MM-DD HH:mm:ss'] - 格式化后的时间字符串格式，默认为'YYYY-MM-DD HH:mm:ss'
 * @return {string} - 格式化后的本地时间字符串
 * @example
 * formatUTC('2024-03-28T00:00:00Z'); // 返回 "2024-03-28 08:00:00"
 * formatUTC('2024-03-28T00:00:00Z', 'YYYY-MM-DD'); // 返回 "2024-03-28"
 */
export function formatUTC(utcString: string, formatType = 'YYYY-MM-DD HH:mm:ss') {
  const result = dayjs.utc(utcString).utcOffset(8).format(formatType)
  return result
}
