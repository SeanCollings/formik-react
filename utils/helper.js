export const orderList = (list) => {
  return list.sort((a, b) => {
    return a > b ? 1 : -1
  })
}