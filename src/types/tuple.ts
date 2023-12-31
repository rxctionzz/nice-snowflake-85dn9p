import { ZodTypes } from "../ZodTypes";
import { ZodType, ZodTypeDef, ZodTypeAny } from "./base";

// import { objectUtil } from '../helpers/objectUtil';
// import { ZodUnion } from './union';
// import { ZodUndefined } from './undefined';
// import { ZodNull } from './null';

// export type identity<T> = T;
// export type flatten<T extends [any, ...any[]]> = identity<
//   { [k in keyof T]: T[k] }
// >;
// type tupleOptionalKeys<T extends [any, ...any[]]> = {
//   [k in keyof T]?: undefined extends T[k] ? T[k] : unknown;
// }; //[keyof T];

// type tupleRequiredKeys<T extends [any, ...any[]]> = {
//   [k in keyof T]: undefined extends T[k] ? unknown : T[k];
// };

// export type addTupleQuestionMarks<T extends [any, ...any[]]> = flatten<
//   tupleOptionalKeys<T> & tupleRequiredKeys<T>
// >;

// export type addTupleQuestionMarks<T extends [any, ...any[]]> = {
//   [k in tupleOptionalKeys<T>]?: T[k];
// } &
//   { [k in tupleRequiredKeys<T>]: T[k] };

// type test = [string, number | undefined]
// type t2 = tupleOptionalKeys<test>;
// type t3 = tupleRequiredKeys<test>;
// type t4 = addTupleQuestionMarks<test>;
// const x:t4 = ['asdf'];
// type t5 = string & unknown;

export type OutputTypeOfTuple<T extends [ZodTypeAny, ...ZodTypeAny[]] | []> = {
  [k in keyof T]: T[k] extends ZodType<any, any> ? T[k]["_output"] : never;
};

export type InputTypeOfTuple<T extends [ZodTypeAny, ...ZodTypeAny[]] | []> = {
  [k in keyof T]: T[k] extends ZodType<any, any> ? T[k]["_input"] : never;
};

export interface ZodTupleDef<
  T extends [ZodTypeAny, ...ZodTypeAny[]] | [] = [ZodTypeAny, ...ZodTypeAny[]]
> extends ZodTypeDef {
  t: ZodTypes.tuple;
  items: T;
}

export class ZodTuple<
  T extends [ZodTypeAny, ...ZodTypeAny[]] | [] = [ZodTypeAny, ...ZodTypeAny[]]
> extends ZodType<OutputTypeOfTuple<T>, ZodTupleDef<T>, InputTypeOfTuple<T>> {
  toJSON = () => ({
    t: this._def.t,
    items: (this._def.items as any[]).map((item) => item.toJSON()),
  });

  get items() {
    return this._def.items;
  }

  // opt optional: () => ZodUnion<[this, ZodUndefined]> = () => ZodUnion.create([this, ZodUndefined.create()]);

  // null nullable: () => ZodUnion<[this, ZodNull]> = () => ZodUnion.create([this, ZodNull.create()]);

  static create = <T extends [ZodTypeAny, ...ZodTypeAny[]] | []>(
    schemas: T
  ): ZodTuple<T> => {
    return new ZodTuple({
      t: ZodTypes.tuple,
      items: schemas,
    });
  };
}
