import * as z from "..";
import { util } from "../helpers/util";

test("type guard", () => {
  const stringToNumber = z.string().transform(z.number(), (arg) => arg.length);

  const s1 = z.object({
    stringToNumber,
  });
  type t1 = z.input<typeof s1>;

  const data: any = "asdf";
  if (s1.check(data)) {
    const f1: util.AssertEqual<typeof data, t1> = true;
    f1;
  }
});

test("test this binding", () => {
  const callback = (predicate: (val: string) => boolean) => {
    return predicate("hello");
  };

  expect(callback(z.string().is)).toBe(true); // true
  expect(callback((value) => z.string().is(value))).toBe(true); // true
  expect(callback(z.string().check)).toBe(true); // true
  expect(callback((value) => z.string().check(value))).toBe(true); // true
});
