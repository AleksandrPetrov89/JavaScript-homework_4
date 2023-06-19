function getPasswordChecker (password) {
    return check => {
        return password == check;
    };
};


console.log("Строковый пароль:");
const password_1 = getPasswordChecker("admin");
console.log(password_1("azg"));
console.log(password_1("admin"));
console.log(password_1(45154));

console.log("Числовой пароль:");
const password_2 = getPasswordChecker(1234);
console.log(password_2("azg"));
console.log(password_2("admin"));
console.log(password_2(45154));
console.log(password_2(1234));
console.log(password_2("1234"));
