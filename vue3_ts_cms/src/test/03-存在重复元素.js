var containsDuplicate = function (nums) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const tmp = nums[i]
    if (map.get(tmp) !== undefined) {
      return true
    } else {
      map.set(tmp, 0)
      console.log(map)
    }
  }
  return false
}

console.log(containsDuplicate([1, 2, 3, 1]))
