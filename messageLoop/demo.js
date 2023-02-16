setTimeout(function() {
  console.log('1')
  Promise.resolve().then(function() {
    console.log('2')
  })
}, 0)

Promise.resolve().then(function() {
  console.log('3')
  setTimeout(function() {
    console.log('4')
  }, 0)
})

console.log('5')