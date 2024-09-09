import BigNumber from 'bignumber.js';
import moment from 'moment';
BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_DOWN });
const isNullOrEmpty = function (val) {
    if (val == null || val == '' || typeof val == undefined) {
        return true;
    } else {
        return false;
    }
};

const timeFormat = (value, format, $default = null) => {
    if (!value) {
        if ($default) {
            return $default;
        }
        return '';
    }
    if (/^\d+$/.test(value)) {
        return moment.unix(value).utc().format(format);
    } else {
        return moment.utc(value).format(format);
    }
};

const decimalsPrecision = function (val, precision, decimals = 4) {
    if (!val) {
        return '0.' + '0'.repeat(decimals);
    }
    let num = BigNumber(val.toString()).div(BigNumber(10).pow(precision)).toFixed(decimals);
    return (num);
};

const rate = function (val) {
    if (!val) {
        return '0.00';
    }
    return BigNumber(val.toString()).div(100).toFixed(2);
};

const decimals = function (val, size = 4, fillZero = true) {
    if (typeof val === 'undefined' || val === null) {
        val = BigNumber(0);
    } else if (!(typeof val === 'string' || val instanceof String || typeof val === 'number')) {
        val = val.toString();
    }
    val = BigNumber(val);
    if (val.isNaN()) {
        val = BigNumber(0);
    }
    if (fillZero) {
        return BigNumber(val.toString()).toFixed(size);
    } else {
        return BigNumber(BigNumber(val.toString()).toFixed(size)).toString();
    }
};

const decimalsUnit = function (val, size = 4) {
    if (!val) {
        return val === 0 ? '0.000' : '-';
    }
    let unit = '';
    if (val >= 1e3 && val < 1e6) {
        val = val / 1e3;
        unit = 'K';
        size = 2;
    }
    if (val >= 1e6 && val < 1e9) {
        val = val / 1e6;
        unit = 'M';
        size = 2;
    }
    if (val >= 1e9) {
        val = val / 1e9;
        unit = 'B';
        size = 2;
    }
    return new BigNumber(val.toString()).toFixed(size) + unit;
};
const decimalsFormat = function (val, size = 3) {
    if (!val) {
        return val === 0 ? 0 : '-';
    }
    return new BigNumber(new BigNumber(val.toString()).toFixed(size)).toFixed();
};
export { isNullOrEmpty, timeFormat, decimals, decimalsUnit, decimalsFormat, decimalsPrecision, rate };
