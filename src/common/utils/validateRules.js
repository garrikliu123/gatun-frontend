export function checkDouble(message = "valid double") {
    return (rule, value, callback) => {
        var num2 = /^([1-9][\d]{0,}|0)(\.\d{1,2})?$/
        value = '' + value
        if (isNaN(value) || !(num2.test(value))) {
            callback(new Error(message));
        } else {
            callback();
        }
    }

}


/* 验证密码 */
export function validatePassword(rule, value, callback) {
    if (value.match(/^[a-zA-Z0-9^%&'!@#*()_+[{}:'"<>/,;=?$\x22]{5,16}$/)) {
        callback();
    } else {
        callback("Only contain number and letter, no less than 6 character")
    }
}

/* 合法邮箱 */
export function validateEmail(rule, value, callback) {
    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    if (!value) {
        return callback(new Error('Email cannot be empty'))
    }
    setTimeout(() => {
        if (mailReg.test(value)) {
            callback()
        } else {
            callback(new Error('Please enter a valid email'))
        }
    }, 100)
}


/* 验证姓名 */
export function validateName(rule, value, callback) {
    const reg = /^[a-zA-Z]{0,50}$/;
    setTimeout(() => {
        if (!reg.test(value)) {
            return callback(new Error('Please enter a valid name'));
        } else {
            callback()
        }
    }, 100)
}


/* 合法手机号 */
export function validatePhone(rule, value, callback) {
    const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!value) {
        return callback(new Error('手机号码不能为空!!'))
    }
    setTimeout(() => {
        if (!phoneReg.test(value)) {
            return callback(new Error('手机号码格式错误'))
        } else {
            callback()
        }
    }, 100)
}