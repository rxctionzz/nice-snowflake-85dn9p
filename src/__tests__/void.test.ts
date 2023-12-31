import { util } from "../helpers/util";
import * as z from "../index";
test("void", () => {
  const v = z.void();
  v.parse(null);
  v.parse(undefined);

  expect(() => v.parse("")).toThrow();

  type v = z.infer<typeof v>;
  const t1: util.AssertEqual<v, void> = true;
  t1;
});
