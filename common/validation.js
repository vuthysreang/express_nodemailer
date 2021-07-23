// Password should contains at least 8 or more than characters with one numeric digit, one uppercase and one lowercase letter
const passwordValidator = function (password) {
    var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (password.match(reg)) {
        return true;
    } else {
        return false;
    }
};

module.exports = {
    passwordValidator
};