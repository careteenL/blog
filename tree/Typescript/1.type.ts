/**
 * @desc 获取 props 中类型为 Function 的 键
 * @knowledge 泛型 never keyof extends in
 */
interface SomeProps {
  a: string
  b: number
  c: (e: Event) => void
  d: () => any
}
type GetKeyByValueType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]
// 返回 'c' | 'd'
type FunctionPropNames = GetKeyByValueType<SomeProps, Function>

/**
 * @desc 不确定传参或返回值时，都使用 unknown 而非 any
 * @knowledge unknown 会保留静态类型检查， any 会放弃检查容易带来报错
 */
function resultValueBySome(val: unknown) {
  if (typeof val === 'string') {
    return val.split(' ')
  } else if (typeof val === 'number') {
    return val.toFixed(2)
  }
  // Error
  // return val.split('')
}

/**
 * @desc 联合类型
 * @knowledge infer
 */
type UnionInferType<T> = T extends { a: infer U; b: infer U } ? U : never
type Foo1 = UnionInferType<{ a: string; b: boolean }>


/**
 * @des 后者覆盖前者的同名属性
 * 1. 找到 T 有，但 U 没有的 { other: boolean} Exclude
 * 2. 找到 T 有 U 也有的 key key1 在 U 中 pick 出来 {key1: string}
 * 3. 合并 1 和 2
 * @knowledge Pick Exclude Extract keyof 
 */
type Diff<T extends object, U extends object> = Pick<T, Exclude<keyof T, keyof U>>
type Intersection<T extends object, U extends object> = Pick<U, Extract<keyof T, keyof U>>

type Overwrite<T extends object, U extends object, I = Diff<T, U> & Intersection<T, U>> = Pick<I, keyof I>

type OverwriteEg = Overwrite<{ key1: number, other: boolean }, { key1: string, key3: number }>

