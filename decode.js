function decodef32( inArr ){

  let buf = Buffer.allocUnsafe(4);
  buf.writeUInt16BE(inArr[0],0);
  buf.writeUInt16BE(inArr[1],2);

  //console.log(buf);
  let fl32 = buf.readUInt32BE(0);

  let target =  fl32.toString(2);
  target = target.padStart(32,'0');
  //console.log(`target: ${target}`);
  //console.log(`len: ${target.length}`);
  let sign = (target[0] == '1')? -1 : 1;
  target = target.substring(1);

  let tarArr = target.split('');
  ////console.log(tarArr);

  let expStr = target.substring(0,8);
  //console.log(`expStr: ${expStr}`);
  let exp = parseInt(expStr,2);
  let bias = exp - 127;
  //console.log(`bias: ${bias}`);

  tarArr = tarArr.slice(8);
  //console.log(`manArr: ${tarArr}`);

  let x = tarArr.reduce( (total, currVal, idx) => {
    /*
  //console.log(`total: ${total}`);
  //console.log(`currVal: ${currVal}`);
  //console.log(`idx: ${idx}`);
  */
    return total + (Number(currVal) * (2 / (2 ** (idx + 2))));
  },0);

  //console.log(`x: ${x}`);

  let retVal;
  if (exp == 0){
    // Exponental is all zeros
    if (x == 0){
    // and Fractional is all zeros
    // Special Zero Rule
    retVal = 0;
    }else {
      // Exponential is all zeros but there is a Fractional value
      // Special Denormalized Rule
      // .. Don't add the leading 1
      retVal = x * (2 ** bias) * sign;
    }
  }else{
    // Normal operation
    retVal = (1 + x) * (2 ** bias) * sign;
  }

  return retVal;
}

let inArr = [0,0];

//console.log(decodef32(inArr));
