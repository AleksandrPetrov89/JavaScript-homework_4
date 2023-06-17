const rl = require('readline').createInterface(process.stdin, process.stdout);
const fs = require('node:fs/promises');


const questionPromise = function (query, options) {
    return new Promise((resolve) => {
        rl.question(query, options, (answer) => {
            resolve(answer);
        });
    });
};


async function guessNumber (number, log = "", counter = 1) {
    /* Игра "угадай число" с подсказками "больше" и "меньше".
        number - число, которое необходимо отгадать, может быть от 0 до 999;
        log - необязательный параметр, строка, которая выведется вначале протокола записи игры
        counter - необязательный параметр, число. Точка отсчета попыток выиграть. */
    let check = await questionPromise (`Попытка № ${counter}. \nВведите число от 0 до 999:\n`);
    let message = `Попытка № ${counter}. \nВведите число от 0 до 999: \nВы ввели: ${check}\n`;
    log += message;
    if (check === "q") {
        message = "\nВы вышли из игры!";
        console.log(message + "\n");
        rl.close();
        log += message;
        fs.appendFile("game_protocol.txt", log);
        return;
    };
    check = Number(check);
    if (isNaN(check) || check < 0 || check > 999) {
        message = "Вы ошиблись при вводе!\n";
    } else if (number === check) {
        message = `\nВы угадали с ${counter} попытки! Поздравляю!!!`;
        console.log(message + "\n");
        rl.close();
        log += message;
        fs.appendFile("game_protocol.txt", log);
        return;
    } else if (number < check) {
        message = "Загаданное число меньше, чем Вы предположили!\n";
    } else if (number > check) {
        message = "Загаданное число больше, чем Вы предположили!\n";
    } else {
        message = "\nКакая-то непонятная ошибка!!!\n";
    };
    console.log(message);
    log += message + "\n";
    counter += 1;
    guessNumber (number, log, counter);
};


let randomNumber = Math.floor(Math.random() * 1000);

// console.log(`Загадано число: ${randomNumber}\n`); /* Для удобства проверки игры */
fs.writeFile("game_protocol.txt", `Загадано число: ${randomNumber}\n\n`); /* Для лога игры, я думаю, хорошо знать загаданное число */

guessNumber(randomNumber);
