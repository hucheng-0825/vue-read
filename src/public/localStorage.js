/* 本地存储模块 */

/* 获取本地存储数据 */
export const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}
/* 设置本地存储数据 */
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
/* 清除本地存储数据 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
