async function foo() {
  return await "Hello";
}
console.log(foo().then((res) => console.log(res)));
