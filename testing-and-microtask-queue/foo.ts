// @ts-nocheck

let res;
const resultPromise = new Promise((r) => (res = r));

const values = [];

new Promise((r) => r("v0")).then((v) => {
  console.log("v0!!");

  values.push(v);
  Promise.resolve("v0.1").then((nextV) => values.push(nextV));
});
Promise.resolve("v1").then((v) => values.push(v));

let r2;
new Promise((r) => (r2 = r)).then((v) => values.push(v));

Promise.resolve("v3").then((v) => {
  values.push(v);
  res(values);
});

resultPromise.then(console.log);

r2("v2");
