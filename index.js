/****************************
 * IEEE754F32
 * encode: float to IEEE754 array
 * decode: IEEE754 array to float32
 * author: Bryan Nystrom
 * ver: 1.1
 * date: 20220425
 * **************************/


let target = 400.0;

target = -815.336;

console.log(`Target: ${target}`);

// Determine sign
let signBit = (target > 0 ) ? '0' : '1';
console.log(`signed: ${signBit}`);
target = Math.abs(target);
console.log(`Target: ${target}`);

let wholeStr = Number(Math.trunc(target)).toString(2);
console.log(`wholeStr: ${wholeStr}`);
let bias = 127 + (wholeStr.length -1);

console.log(`bias: ${bias}`);
let expStr = Number(bias).toString(2);
console.log(`expStr: ${expStr}`);

let fracStr = '';

if (target.toString().split('.').length > 1){
  // we have a fractional part
  let frac = target - Math.trunc(target);
  fracStr = Number(target - Math.trunc(target)).toString(2).substring(2,23);
}
console.log(`fracStr: ${fracStr}`);

let manStr = wholeStr.slice(1) + fracStr
manStr = manStr.padEnd(23,0).substring(0,23);
console.log(`manStr: ${manStr}`);
let x = signBit + expStr + manStr;
console.log(`x: ${x}`);
let n = parseInt(x,2);
console.log(`n: ${n}`);
let buf = Buffer.allocUnsafe(4);
buf.writeUInt32BE(n);
console.log(buf);
let arr = [buf.readUInt16BE(0),buf.readUInt16BE(2)];

console.log(arr);
