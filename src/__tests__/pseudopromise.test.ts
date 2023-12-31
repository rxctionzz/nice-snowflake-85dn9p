// import * as z from '.';
import { PseudoPromise } from "../PseudoPromise";

test("sync pass", () => {
  const myProm = new PseudoPromise()
    .then(() => 15)
    .then((arg) => arg.toString())
    .then((arg) => arg.length);
  expect(myProm.getValueSync()).toEqual(2);
});

test("sync fail", async () => {
  const myProm = new PseudoPromise()
    .then(async () => 15)
    .then((arg) => arg.toString())
    .then((arg) => {
      return arg.length;
    });

  expect(myProm.getValueSync()).toEqual(16);
  myProm.getValueSync();
  // expect(myProm.getValue()).resolves.toEqual(2);
  const val = await myProm.getValueAsync();
  expect(val).toEqual(2);
  return val;
  // (myProm.getValue() as Promise<any>).then(val => expect(val).toEqual(2));
});

test("pseudopromise all", async () => {
  const myProm = PseudoPromise.all([
    new PseudoPromise().then(() => "asdf"),
    PseudoPromise.resolve(12),
  ]).getValueAsync();
  expect.assertions(1);
  const val = await myProm;
  expect(val).toEqual(["asdf", 12]);
  return val;
});

test(".resolve sync ", () => {
  expect(PseudoPromise.resolve(12).getValueSync()).toEqual(12);
});

test(".resolve async", () => {
  expect.assertions(1);

  return PseudoPromise.resolve(Promise.resolve(12))
    .getValueAsync()
    .then((val) => expect(val).toEqual(12));
});

test("sync and async", () => {
  expect.assertions(2);
  expect(PseudoPromise.resolve(15).getValueSync()).toEqual(15);
  return PseudoPromise.resolve(15)
    .getValueAsync()
    .then((val) => expect(val).toEqual(15));
});

test("object", async () => {
  const prom = PseudoPromise.object({
    asdf: PseudoPromise.resolve(15),
    qwer: new PseudoPromise().then(async () => "asdfadsf"),
  });

  expect(await prom.getValueAsync()).toEqual({ asdf: 15, qwer: "asdfadsf" });
  return "asdf";
});

test("all", async () => {
  const asdf = new PseudoPromise().then(async () => "asdf");
  await PseudoPromise.all([asdf])
    .getValueAsync()
    .then((val) => expect(val).toEqual(["asdf"]));
  return "asdf";
});
