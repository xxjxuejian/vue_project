var intersection = function (nums1, nums2) {
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)
  const res = []
  let pre = null

  let i = 0
  let j = 0
  let v1 = nums1[i]
  let v2 = nums2[j]
  // 转为boolean值的时候就需要考虑，0 的问题
  while (v1 !== undefined && v2 !== undefined) {
    if (v1 !== v2) {
      if (v1 < v2) i++
      else j++
    } else {
      if (v1 !== pre) {
        res.push(v1)
        pre = v1
      }
      i++
      j++
    }
    v1 = nums1[i]
    v2 = nums2[j]
  }

  return res
}
const nums1 = [4, 7, 9, 7, 6, 7]
const nums2 = [5, 0, 0, 6, 1, 6, 2, 2, 4]
const res = intersection(nums1, nums2)
console.log(res)
