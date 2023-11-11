export const validateDateRange = (value) => {
  if (value.length === 0) return 'تاریخ را انتخاب کنید'

  return true
}

export const title = (value) => {
  if (!value || !value.length) {
    return 'عنوان را وارد کنید'
  }

  return true
}

// activity validators
export const activityTitle = (value) => {
  if (!value || !value.length) {
    return 'عنوان فعالیت را وارد کنید'
  }

  return true
}

export const activityDescription = (value) => {
  if (!value || !value.length) {
    return 'توضیحات فعالیت را وارد کنید'
  }

  return true
}

export const activityStartTime = (value) => {
  if (!value || !value.length) {
    return 'ساعت شروع فعالیت را وارد کنید'
  }

  return true
}

export const activityEndTime = (value) => {
  if (!value || !value.length) {
    return 'ساعت شروع فعالیت را وارد کنید'
  }

  return true
}

export const activityDate = (value) => {
  if (!value || !value.length) {
    return 'تاریخ فعالیت را انتخاب کنید'
  }

  return true
}

// event validators
export const eventTitle = (value) => {
  if (!value || !value.length) {
    return 'عنوان رویداد را وارد کنید'
  }

  return true
}

export const eventDescription = (value) => {
  if (!value || !value.length) {
    return 'توضیحات رویداد را وارد کنید'
  }

  return true
}

export const eventDate = (value) => {
  if (!value || !value.length) {
    return 'تاریخ رویداد را انتخاب کنید'
  }

  return true
}

export const eventTime = (value) => {
  if (!value || !value.length) {
    return 'ساعت رویداد را انتخاب کنید'
  }

  return true
}
