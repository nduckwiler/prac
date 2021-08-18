// generator function does not require yield
function* firstGenerator() {
  console.log('hello there!')
}

generator = firstGenerator();
generator.next();

// generator function with two yields
function* secondGenerator() {
  console.log('first line of generator')
  yield console.log('yielded line 1')
  yield console.log('yielded line 2')
}

console.log('\n...constructing generator...')
gen2 = secondGenerator()
console.log('...calling next on generator...')
gen2.next()
console.log('...calling next on generator...')
gen2.next()

// generator function with two yields returning values
function* thirdGenerator() {
  yield 1;
  yield 2;
}

console.log('\n...constructing third generator...')
gen3 = thirdGenerator()
console.log('...calling next on generator...')
console.log(gen3.next())
console.log('...calling next on generator...')
console.log(gen3.next())
