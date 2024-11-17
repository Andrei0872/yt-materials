import { beforeAll, expect, test, vi } from "vitest";
import { myPromiseAll } from "./main";
import { promiseWithTimer } from "./testing/utils";

beforeAll(() => {
  vi.useFakeTimers();
});

test("should resolve to an empty array when empty array is provided", async () => {
  await expect(myPromiseAll([])).resolves.toEqual([]);
});

test.only("should resolve to an array of values when all given promises resolve", async () => {
  const promises = [
    Promise.resolve("foo"),
    promiseWithTimer(2000, "bye"),
    promiseWithTimer(1500, "hello"),
    Promise.resolve("bar"),
  ];

  const resultCb = vi.fn();
  myPromiseAll(promises).then(resultCb);

  await vi.advanceTimersByTimeAsync(1500);
  expect(resultCb).not.toHaveBeenCalled();

  await vi.advanceTimersByTimeAsync(500);
  expect(resultCb).toHaveBeenCalledWith(["foo", "bye", "hello", "bar"]);
});

test("should reject with the error of the first rejected promise", async () => {
  const promises = [
    Promise.resolve("foo"),
    promiseWithTimer(2000, "hello"),
    Promise.reject("bar"),
  ];

  expect(() => myPromiseAll(promises)).rejects.toThrowError("bar");
});
