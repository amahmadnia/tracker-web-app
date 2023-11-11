export const getDateRange = (interval) => {
  const currentDate = new Date()
  if (interval === 'weekly') {
    const startDate = new Date(currentDate)
    startDate.setDate(currentDate.getDate() - 7)

    return { startDate, endDate: currentDate }
  } else if (interval === 'daily') {
    return { startDate: currentDate, endDate: currentDate }
  } else if (interval === 'monthly') {
    const startDate = new Date(currentDate)
    startDate.setDate(currentDate.getDate() - 30)
    return { startDate, endDate: currentDate }
  } else if (interval === 'yearly') {
    const startDate = new Date(currentDate)
    startDate.setDate(currentDate.getDate() - 365)
    return { startDate, endDate: currentDate }
  } else {
    return 'Wrong Input'
  }
}

export const getTodayDateString = () => {
  const today = new Date()

  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()

  return `${year}-${month}-${date}`
}

export const compareDates = (dateString1, dateString2) => {
  const date1 = new Date(dateString1)
  const date2 = new Date(dateString2)

  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

export const formatDate = (dateObject) => {
  const year = dateObject.getFullYear()
  const month = dateObject.getMonth() + 1
  const date = dateObject.getDate()

  return `${year}-${month}-${date}`
}
