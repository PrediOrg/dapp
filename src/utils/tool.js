import { Charms1 } from "@/config/constants";
import { Charms2 } from "./device.js";
import jsSHA from "jssha";
function row(args, Charms) {
    console.log({ Charms });
    let keys = Object.keys(args);
    keys = keys.sort()
    let string = '';
    keys.forEach(k => {
        string += '&' + k + '=' + args[k];
    })
    string = string.substring(1);
    return string + Charms;
}
function sign(param) {
    let str = row(param, Charms1 + Charms2);
    const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
    shaObj.update(str);
    let sha1Str = shaObj.getHash('HEX');
    param['sign'] = sha1Str;
    return param;
}
export {
    sign,
}