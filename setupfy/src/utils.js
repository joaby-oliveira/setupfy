export const isEmpty = (value) => {
  if (value) return true
  return false
}

export const isEnoughLength = (requiredLength, { length }) => {
  if (length >= requiredLength) return true
  return false
}