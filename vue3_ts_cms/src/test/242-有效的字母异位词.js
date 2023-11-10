var isAnagram = function (s, t) {
  if (s.length !== t.length) return false
  // 模拟字母表
  const table = new Array(26).fill(0)

  for (let i = 0; i < s.length; i++) {
    const index = s.charCodeAt(i) - 'a'.charCodeAt(0)
    table[index] += 1
  }

  for (let i = 0; i < t.length; i++) {
    const index = t.charCodeAt(i) - 'a'.charCodeAt(0)
    table[index] -= 1
    if (table[index] < 0) {
      return false
    }
  }
  return true
}

let res = isAnagram('anagram', 'nagaram')
console.log(res)
