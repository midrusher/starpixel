//Суффикс после цифр в днях рождения
function toOrdinalSuffix(num) {
    const int = parseInt(num), digits = [int % 10, int % 100], ordinals = [`-ым`, `-ым`, `-им`, `-ым`], oPattern = [1, 2, 3, 4], tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19]

    return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
        ? int + ordinals[digits[0] - 1]
        : int + ordinals[3]
};

//Игра в дурака
class gameConstructor {
    constructor() { }
    getAmountAndList(amount) {
        let err = new Error(`Значение не является числом! (${typeof amount})`)
        if (typeof amount !== "number") return err
        let cards_list = [`9♥`, `9♦`, `9♠`, `9♣`, `10♥`, `10♦`, `10♠`, `10♣`, `J♥`, `J♦`, `J♠`, `J♣`, `Q♥`, `Q♦`, `Q♠`, `Q♣`, `K♥`, `K♦`, `K♠`, `K♣`, `T♥`, `T♦`, `T♠`, `T♣`]
        if (amount === 24) {
            cards_list
        } else if (amount === 36) {
            cards_list.push([`6♥`, `6♦`, `6♠`, `6♣`, `7♥`, `7♦`, `7♠`, `7♣`, `8♥`, `8♦`, `8♠`, `8♣`])
        } else if (amount === 52) {
            cards_list.push([`2♥`, `2♦`, `2♠`, `2♣`, `3♥`, `3♦`, `3♠`, `3♣`, `4♥`, `4♦`, `4♠`, `4♣`, `5♥`, `5♦`, `5♠`, `5♣`, `6♥`, `6♦`, `6♠`, `6♣`, `7♥`, `7♦`, `7♠`, `7♣`, `8♥`, `8♦`, `8♠`, `8♣`])
        } else {
            let err = new Error(`Введённое вами число не является допустимым для создания игры!`)
            return err
        }
        return cards_list
    }

    getRule(rule) {
        let err = new Error(`Выбранный вариант не является допустим типом игры! ${rule}`)
        if (typeof rule !== "string") return err
    }
}


//Получить ВСЕГО ОПЫТА АКТИВНОСТИ
function calcActLevel(i, level, exp) {
    let sum0 = []
    let sum1 = 0
    let result
    for (i = 0; i <= level; i++) {
        if (i < level) {
            sum1 = ((5 * (i ** 2)) + (50 * i) + 100)
            sum0.push(sum1)
        } else if (i == level) {
            sum0.push(exp)
            result = sum0.reduce((prev, cur) => {
                return prev + cur
            })
            return result
        }
    }
}

//Рассчитать УРОВЕНЬ АКТИВНОСТИ по ВСЕГО ОПЫТА
function getLevel(exp) {
    let level = 0
    if (exp >= ((5 * (level ** 2)) + (50 * level) + 100)) {
        while (exp >= ((5 * (level ** 2)) + (50 * level) + 100)) {
            exp -= ((5 * (level ** 2)) + (50 * level) + 100);
            level += 1;
        }
    }
    return [level, exp]
}



module.exports = { toOrdinalSuffix, gameConstructor, calcActLevel, getLevel }