const numericReg = /^[0-9]+$/; //正整数
const integerReg = /^\-?[0-9]+$/; //整型（负整数和正整数）
const decimalReg = /^\-?[0-9]*\.?[0-9]+$/; //浮点型(整数和小数)
const userNameReg = /^[a-zA-Z0-9]{8,16}$/; //8到16位 数字、字母或字母数字组合
const nsrsbhReg = /^[a-zA-Z0-9\-]{15,20}$/; //15位到20位数字或字母（纳税人识别号）
const yzbm = /^[0-9]{6}$/; //邮政编码
const zjhm = /^([0-9A-Za-z]|[-]){0,20}$/;
const organizationCodeReg = /^[A-Z0-9]{9}$/; //组织机构代码（必须为9位数字字母，字母为半角大写）
const moneyReg = /^(([-]?[0-9]{1,14}[.]{1}[0-9]{1,2})$|([-]?[0-9]{1,14})$)/; //最大14位整数，最多两位小数金额
const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/; //邮箱
const alphaReg = /^[a-z]+$/i; //字母
const alphaNumericReg = /^[a-z0-9]+$/i; //字母、数字或者数字字母组合
const alphaDashReg = /^[a-z0-9_\-]+$/i; //可以含有下划线的字母、数字或者数字字母组合
const naturalReg = /^[0-9]+$/i; //自然数
const chineseReg = /^[\u4e00-\u9fa5]+$/; //中文字符
const phoneNumReg = /^1[3456789]\d{9}$/; //手机号码
const telNumReg = /^(0\d{2,3}-){0,1}\d{7,8}$/; //固定电话
const sfzhmReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; //身份证号码
const noSpecialChar = /^[\u4e00-\u9fa5a-zA-Z0-9_\(\)$#@!\-]+$/; //不允许特殊字符
const alphaAndNumReg = /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]/; //数字和字母组合
const urlReg = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/; //url
const pwdReg = /(?:\d.*_)|(?:_.*\d)|(?:[A-Za-z].*_)|(?:_.*[A-Za-z])|(?:[A-Za-z].*\d)|(?:\d.*[A-Za-z])/;


//正整数
export function isNumeric(val) {
  if (numericReg.test(val)) return true;
  return false;
}
//整型（负整数和正整数）
export function isInteger(val) {
  if (integerReg.test(val)) return true;
  return false;
}
//邮政编码
export function isYzbm(val) {
  if (yzbm.test(val)) return true;
  return false;
}
//证件号码(证件号码不同于身份证号码)
export function isZjhm(val) {
  if (zjhm.test(val)) return true;
  return false;
}
//浮点型(整数和小数)
export function isDecimal(val) {
  if (decimalReg.test(val)) return true;
  return false;
}
//最大14位整数，最多两位小数金额
export function isMoney(val) {
  if (moneyReg.test(val)) return true;
  return false;
}
//邮箱
export function isEmail(val) {
  if (emailReg.test(val)) return true;
  return false;
}
//字母
export function isAlpha(val) {
  if (alphaReg.test(val)) return true;
  return false;
}
//字母、数字或者数字字母组合
export function isAlphaNumeric(val) {
  if (alphaNumericReg.test(val)) return true;
  return false;
}
//可以含有下划线的字母、数字或者数字字母组合
export function isAlphaDash(val) {
  if (alphaDashReg.test(val)) return true;
  return false;
}
//自然数
export function isNatural(val) {
  if (naturalReg.test(val)) return true;
  return false;
}
//中文
export function isChinese(val) {
  if (chineseReg.test(val)) return true;
  return false;
}
//手机号码
export function isPhoneNum(val) {
  if (phoneNumReg.test(val)) return true;
  return false;
}
//固定电话
export function isTelNum(val) {
  if (telNumReg.test(val)) return true;
  return false;
}
//身份证号码
export function isSfzhm(val) {
  //检验位的检测
  if (!checkParity(val)) {
    return false;
  }
  //校验长度，类型
  if (!isCardNo(val)) {
    return false;
  }
  return true;
}
//特殊字符
export function isNoSpecialChar(val) {
  if (noSpecialChar.test(val)) return true;
  return false;
}
//url
export function isUrl(val) {
  if (urlReg.test(val)) return true;
  return false;
}
//组织机构代码，必须为9位数字字母，字母为半角大写
export function isOrganizationCode(val) {
  if (organizationCodeReg.test(val)) return true;
  return false;
}
//8到16位 数字、字母或字母数字组合
export function isUserName(val) {
  if (userNameReg.test(val)) return true;
  return false;
}
//密码需要8位以上，数字和英文组合，可以含有下划线
export function isPwd(val) {
  if (pwdReg.test(val) && val.length > 7 && val.length<=16) return true;
  return false;
}
//数字和字母组合
export function isAlphaAndNum(val) {
  if (alphaAndNumReg.test(val)) return true;
  return false;
}
//纳税人识别号(15位到20位 数字或字母)
export function isNsrsbh(val) {
  if (nsrsbhReg.test(val)) return true;
  return false;
}
export default function validateReg(type,val,emptyText,errorText) {
  if (val === '' || val === undefined || val === null || val.trim().length === 0) {
    if (emptyText) {
      console.log(emptyText)
    } else {
      console.log('请请输入正确手机号')
    }
    return
  }
  if (type === 'tel') {    
    if (!isPhoneNum(val)) {
      if (errorText) {
        console.log(errorText)
      } else {
        console.log('请请输入正确手机号')
      }
      return
    }
  }
}