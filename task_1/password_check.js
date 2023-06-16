const rl = require('readline').createInterface(process.stdin, process.stdout);

function getPasswordChecker (password) {
    rl.question("Введите пароль:\n", (check) => {
        let result = password === check;
        if (check === "q") {
            console.log("Операция прервана пользователем!\n");
            rl.close();
            return;
        };
        if (result) {
            console.log("Вы ввели правильный пароль!\n");
            rl.close();
            return result;
        } else if (!result) {
            console.log("Вы ошиблись!\n");    
        } else {
            console.log("Какая-то непонятная ошибка!\n");    
        };
        getPasswordChecker(password);
    });
};


getPasswordChecker("admin");
