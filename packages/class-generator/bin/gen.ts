import config from "../config";
import fs from 'node:fs'

const template = (prefix:string, propertyname:string, map:Record<string,unknown>) => {
  let string = ''
  Object.entries(map).forEach(item => {
    const [key,value] = item
    string += '.'+ (prefix ? prefix + '-' : '') + key + ' {\n' + '  ' + propertyname + ': ' + value + ';\n}\n'
  })
  return string
}

function genClassFile() {
  let string = ''
  config.forEach(item => {
    const {prefix, propertyName, map} = item
    string += template(prefix, propertyName, map as Record<string,unknown>)
  })
  return string
}


// 生成的字符串写入文件
fs.writeFile('style.scss', genClassFile(), (err) => {
  if (err) throw err
  console.log('文件已保存')
})

