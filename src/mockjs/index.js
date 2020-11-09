import MockJS from 'mockjs'
MockJS.setup({
  timeout: 400
})
const files = require.context('.', true, /\.js$/)
const currentArray = []
files.keys().forEach(key => {
  if (key === './index.js') return
  currentArray.push(files(key).default)
})
currentArray.forEach(item => {
  for (const [path, target] of Object.entries(item)) {
    const protocal = path.split('|')
    MockJS.mock(new RegExp(`^${protocal[0]}`), protocal[1], target)
  }
})
