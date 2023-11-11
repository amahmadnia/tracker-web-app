export const filterTypes = {
  array: 'array',
  arrayMultiple: 'arrayMultiple',
  dateRange: 'date',
  activityType: 'activityType'
}

export const filterDataList = (data, filterState, target, secondTarget, filters) => {
  if (!validateEntries(data, filterState, target)) return false

  if (filters.length === 0) return data

  let modifiedData = data

  filters.forEach(({ type, target, secondTarget, filterState }) => {
    const state = filterState.value

    switch (type) {
      case filterTypes.dateRange:
        modifiedData = modifiedData.filter((item) => {
          const startDate = new Date(state.start).setHours(0, 0, 0, 0)
          const endDate = new Date(state.end).setHours(0, 0, 0, 0)
          const itemDate = new Date(item[target][secondTarget]).setHours(0, 0, 0, 0)

          return itemDate >= startDate && itemDate <= endDate
        })

        break

      case filterTypes.array:
        modifiedData = modifiedData.filter((obj) =>
          filterState.value.includes(obj[target][secondTarget])
        )
        break

      case filterTypes.arrayMultiple:
        modifiedData = modifiedData.filter((obj) => {
          let keepItem = false

          obj[target][secondTarget].forEach((item) => {
            filterState.value.forEach((value) => {
              if (item === value) keepItem = true
            })
          })

          return keepItem
        })
        break

      default:
        return modifiedData
    }
  })

  return modifiedData
}

const validateEntries = (data, filterState, target) => {
  const isListArray = Array.isArray(data)
  const isListItemTypeValid = data.every((item) => {
    return typeof item === 'string' || item instanceof Object || item instanceof Date
  })
  const isFilterStateTypeValid =
    typeof filterState === 'string' || filterState instanceof Object || filterState instanceof Date
  const isTargetTypeValid = typeof target === 'string'

  return isListArray && isFilterStateTypeValid && isListItemTypeValid && isTargetTypeValid
}
