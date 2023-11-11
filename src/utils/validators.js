export const urlOrFilePath = (value) => {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

  const filePathRegex = /^(?:[a-zA-Z]:|\/)?(?:\/[^/]+)*\/?$/

  return urlRegex.test(value) || filePathRegex.test(value)
}
