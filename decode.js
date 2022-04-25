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

  let bias = parseInt(expStr,2) - 127;
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

  let ret = (1 + x) * (2 ** bias) * sign;
  return ret;
}
