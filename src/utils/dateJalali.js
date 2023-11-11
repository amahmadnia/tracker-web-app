import moment from 'moment-jalaali'

import { persianDigits } from '@/utils/persianCharachters'

export const jalaliMonthName = (monthIndex) => {
  switch (monthIndex) {
    case 0:
      return 'فروردین'
    case 1:
      return 'اردیبهشت'
    case 2:
      return 'خرداد'
    case 3:
      return 'تیر'
    case 4:
      return 'مرداد'
    case 5:
      return 'شهریور'
    case 6:
      return 'مهر'
    case 7:
      return 'آبان'
    case 8:
      return 'آذر'
    case 9:
      return 'دی'
    case 10:
      return 'بهمن'
    case 11:
      return 'اسفند'

    default:
      return 'Enter month index correctly!!'
  }
}
export const getDateInfoInPersian = (date) => {
  return {
    year: persianDigits(String(date.jYear())),
    month: jalaliMonthName(date.jMonth()),
    day: persianDigits(String(date.jDate()))
  }
}

export const formatJalaliDate = (date) => {
  return `${getDateInfoInPersian(date).day}-${getDateInfoInPersian(date).month}-${
    getDateInfoInPersian(date).year
  }`
}

export const convertGregorianToJalali = (gregorianDateString) => {
  return moment(gregorianDateString, 'YYYY-M-D')
}

export const convertAndFormatToJalaliDate = (date) => {
  const converted = convertGregorianToJalali(date)
  return `${getDateInfoInPersian(converted).day} ${getDateInfoInPersian(converted).month} ${
    getDateInfoInPersian(converted).year
  }`
}

export const isToday = (jDateString) => {
  const splitDate = jDateString.split('-')
  const reformattedDate = `${splitDate[0]}/${splitDate[1]}/${splitDate[2]}`
  const receivedDate = new Date(moment(reformattedDate, 'jYYYY/jM/jD'))
  const today = new Date()

  return (
    receivedDate.getDate() === today.getDate() &&
    receivedDate.getMonth() === today.getMonth() &&
    receivedDate.getFullYear() === today.getFullYear()
  )
}

export const compareDates = (jDateString1, jDateString2) => {
  const splitDate1 = jDateString1.split('-')
  const splitDate2 = jDateString2.split('-')
  const reformattedDate1 = `${splitDate1[0]}/${splitDate1[1]}/${splitDate1[2]}`
  const reformattedDate2 = `${splitDate2[0]}/${splitDate2[1]}/${splitDate2[2]}`
  const date1 = new Date(moment(reformattedDate1, 'jYYYY/jM/jD'))
  const date2 = new Date(moment(reformattedDate2, 'jYYYY/jM/jD'))

  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

export const convertJalaaliToGregorian = (date) => {
  return new Date(moment(date, 'jYYYY-jM-jD'))
}
