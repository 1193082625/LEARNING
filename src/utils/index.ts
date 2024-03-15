// 计算字符串中特定子串的出现次数
export function countOccurrences(str: string, substr: string | RegExp) {
  // 使用正则表达式进行匹配，并返回匹配结果的数组
  const matches = str.match(new RegExp(substr, 'g'));

  // 如果匹配结果数组不为空，则返回数组的长度（即匹配次数），否则返回 0
  return matches ? matches.length : 0;
}
