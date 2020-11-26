async function sum(a, b, cb) {
  // return a + b;
  await setTimeout(() => {
    let s = a + b;
    cb(s)
  },10)
}

module.exports = {
  sum
}