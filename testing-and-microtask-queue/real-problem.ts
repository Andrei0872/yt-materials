let r1;
const p1 = new Promise((r) => (r1 = r)).then(console.log);

let r2;
const p2 = new Promise((r) => (r2 = r)).then(console.log);

// r1("v1");
// r2("v2");

// Promise.resolve("v3").then(console.log);

Promise.all([p1, p2]).then(() => console.log("promise.all"));

r1("v1");
r2("v2");

Promise.resolve("v3").then(console.log);
