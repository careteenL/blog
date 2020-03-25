//函数的签名就是参数和返回值的组件类型
//Java里的重载
function sum(a: number, b: number): number;
function sum(a: string, b: string): string;
function sum(a: any, b: any); any{
    return a + b;
}

let obj1 = {};
let obj2 = obj1;