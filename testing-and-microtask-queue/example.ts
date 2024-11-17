import { myPromiseAll } from "./main";
import { promiseWithTimer } from "./testing/utils";

const promises = [
  Promise.resolve("foo"),
  promiseWithTimer(2000, "hello"),
  Promise.resolve("bar"),
];

myPromiseAll(promises).then(console.log);
