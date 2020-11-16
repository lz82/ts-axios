// 拼接url
export default function buildUrl(url: string, params: any): string {
  // 如果没有传params，则直接返回
  if (!params) {
    return url
  }

  // 参数值为数组
  // /base/get?foo[]=bar&foo[]=baz
  // 参数值为对象
  // /base/get?foo=对象encode后的值
  // 参数为date
  // /base/get?date=日期的.toISOString() 的结果
  // 对@ : $ , 空格 [] 这些特殊字符对支持
  // 空值忽略，对值为null 或者 undefined的属性，不会添加到url参数中
  // 丢弃url中的哈希标记
  // 保留url中已存在的参数

  return url
}
