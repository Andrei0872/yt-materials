import { promiseWithTimer } from "./testing/utils";

export async function myPromiseAll(promises: Promise<any>[]) {
  if (!promises.length) {
    return Promise.resolve([]);
  }

  let resolvePromise: any;
  let rejectPromise: any;
  const promiseResult = new Promise(
    (r, rej) => ((resolvePromise = r), (rejectPromise = rej)),
  );

  const promisesCount = promises.length;
  let counter = 0;
  const values: any[] = Array.from({ length: promisesCount });

  for (const promiseIdx in promises) {
    const p = promises[promiseIdx];
    p.then((v) => {
      counter++;
      values[promiseIdx] = v;

      if (counter === promisesCount) {
        resolvePromise(values);
      }
    }).catch((e) => {
      rejectPromise(e);
    });
  }

  return promiseResult;
}
