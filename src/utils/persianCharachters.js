export const persianDigits = (digits) => {
  const digitsMap = {
    0: '۰',
    1: '۱',
    2: '۲',
    3: '۳',
    4: '۴',
    5: '۵',
    6: '۶',
    7: '۷',
    8: '۸',
    9: '۹'
  }

  return digits.replace(/[0-9]/g, (match) => digitsMap[match] || match)
}
