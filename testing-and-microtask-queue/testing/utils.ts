export const promiseWithTimer = (timeMs: number, value: unknown) => {
  let res: any;
  const promise = new Promise((r) => (res = r));

  setTimeout(() => {
    res(value);
  }, timeMs);

  return promise;
};
