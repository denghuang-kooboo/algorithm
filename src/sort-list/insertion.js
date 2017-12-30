const sort = (data) => {
  for (let j = 1; j < data.length; j++) {
    let key = data[j]
    let i = j - 1
    while (i >= 0 && data[i] > key) {
      data[i + 1] = data[i]
      i--
    }
    data[i + 1] = key
  }
  return data
}
module.exports = sort
