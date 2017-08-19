const digitsRE = /(\d{3})(?=\d)/g;
/*
* type 取整类型, 1 表示使用floor 向下取整
* */
export default function currency(value, currenSign, decimals, type) {
  value = parseFloat(value);
  if (type === 1) {
    value = Math.floor(value);
  }
  if (!isFinite(value) || (!value && value !== 0)) return '';
  currenSign = currenSign != null ? currenSign : '¥';
  decimals = decimals != null ? decimals : 2;
  const stringified = Math.abs(value).toFixed(decimals);
  const intNum = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified;
  const i = intNum.length % 3;
  const head = i > 0
    ? (intNum.slice(0, i) + (intNum.length > 3 ? ',' : ''))
    : '';
  const floatNum = decimals
    ? stringified.slice(-1 - decimals)
    : '';
  const sign = value < 0 ? '-' : '';
  return sign + currenSign + head +
    intNum.slice(i).replace(digitsRE, '$1,') +
    floatNum;
}
