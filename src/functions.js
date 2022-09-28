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

        let g_rule
        if (rule === "Переводной") {
            g_rule = "Переводной"
        } else if (rule === "Подкидной") {
            g_rule = "Переводной"
        } else {
            let err = new Error(`Введённое вами правило не является допустимым для создания игры!`)
            return err
        }
        return g_rule
    }

    getFinal(final) {
        let err = new Error(`Выбранный вариант не является допустим финалом игры! ${final}`)
        if (typeof rule !== "string") return err
        let g_final
        if (final === "Дурак один") {
            g_final = "Дурак один"
        } else if (final === "Ничья") {
            g_final = "Ничья"
        } else {
            let err = new Error(`Введённое вами правило не является допустимым для создания игры!`)
            return err
        }
        return g_final

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

function permToName(array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
        let name
        switch (array[i]) {
            case `AddReactions`: {
                name = `Добавлять реакции`
                result.push(name)
            }
                break;
            case `Administrator`: {
                name = `Администратор`
                result.push(name)
            }
                break;
            case `AttachFiles`: {
                name = `Прикреплять файлы`
                result.push(name)
            }
                break;
            case `BanMembers`: {
                name = `Банить участников`
                result.push(name)
            }
                break;
            case `ChangeNickname`: {
                name = `Изменять никнейм`
                result.push(name)
            }
                break;
            case `Connect`: {
                name = `Подключаться`
                result.push(name)
            }
                break;
            case `CreateInstantInvite`: {
                name = `Создавать приглашения`
                result.push(name)
            }
                break;
            case `CreatePrivateThreads`: {
                name = `Создавать приватные ветки`
                result.push(name)
            }
                break;
            case `CreatePublicThreads`: {
                name = `Создавать публичные ветки`
                result.push(name)
            }
                break;
            case `DeafenMembers`: {
                name = `Отключать участникам звук`
                result.push(name)
            }
                break;
            case `EmbedLinks`: {
                name = `Встраивать ссылки`
                result.push(name)
            }
                break;
            case `KickMembers`: {
                name = `Выгонять участников`
                result.push(name)
            }
                break;
            case `ManageChannels`: {
                name = `Управлять каналами`
                result.push(name)
            }
                break;
            case `ManageEmojisAndStickers`: {
                name = `Управлять эмодзи с стикерами`
                result.push(name)
            }
                break;
            case `ManageEvents`: {
                name = `Управлять событиями`
                result.push(name)
            }
                break;
            case `ManageGuild`: {
                name = `Управлять сервером`
                result.push(name)
            }
                break;
            case `ManageMessages`: {
                name = `Управлять сообщениями`
                result.push(name)
            }
                break;
            case `ManageNicknames`: {
                name = `Управлять никнеймами`
                result.push(name)
            }
                break;
            case `ManageRoles`: {
                name = `Управлять ролями`
                result.push(name)
            }
                break;
            case `ManageThreads`: {
                name = `Управлять ветками`
                result.push(name)
            }
                break;
            case `ManageWebhooks`: {
                name = `Управлять вебхуками`
                result.push(name)
            }
                break;
            case `MentionEveryone`: {
                name = `Упоминание \@everyone, \@here и всех ролей`
                result.push(name)
            }
                break;
            case `ModerateMembers`: {
                name = `Отправлять участников подумать о своем поведении`
                result.push(name)
            }
                break;
            case `MoveMembers`: {
                name = `Перемещать участников`
                result.push(name)
            }
                break;
            case `MuteMembers`: {
                name = `Отключать участникам микрофон`
                result.push(name)
            }
                break;
            case `PrioritySpeaker`: {
                name = `Приоритетные режим`
                result.push(name)
            }
                break;
            case `ReadMessageHistory`: {
                name = `Читать историю сообщений`
                result.push(name)
            }
                break;
            case `RequestToSpeak`: {
                name = `Попросить выступить`
                result.push(name)
            }
                break;
            case `SendMessages`: {
                name = `Отправлять сообщения`
                result.push(name)
            }
                break;
            case `SendMessagesInThreads`: {
                name = `Отправлять сообщения в ветках`
                result.push(name)
            }
                break;
            case `SendTTSMessages`: {
                name = `Отправлять TTS сообщения`
                result.push(name)
            }
                break;
            case `Speak`: {
                name = `Говорить`
                result.push(name)
            }
                break;
            case `Stream`: {
                name = `Использовать видео`
                result.push(name)
            }
                break;
            case `UseApplicationCommands`: {
                name = `Использовать команды приложений`
                result.push(name)
            }
                break;
            case `UseEmbeddedActivities`: {
                name = `Использовать активности`
                result.push(name)
            }
                break;
            case `UseExternalEmojis`: {
                name = `Использовать внешние эмодзи`
                result.push(name)
            }
                break;
            case `UseExternalStickers`: {
                name = `Использовать внешние стикеры`
                result.push(name)
            }
                break;
            case `UseVAD`: {
                name = `Использовать режим активации по голосу`
                result.push(name)
            }
                break;
            case `ViewAuditLog`: {
                name = `Просматривать журнал аудита`
                result.push(name)
            }
                break;
            case `ViewChannel`: {
                name = `Просматривать канал`
                result.push(name)
            }
                break;
            case `ViewGuildInsights`: {
                name = `Просматривать статистику сервера`
                result.push(name)
            }
                break;

            default:
                break;
        }
    }


    return result
}

function isURL(string) {
    let url;

    try {
        url = new URL(string);
        return true
    } catch (_) {
        return false;
    }
}

function SettingsPluginsGetID(string) {
    let id
    switch (string) {
        case `Коробки`: { id = 0 }
            break;
        case `Косметика`: { id = 1 }
            break;
        case `Достижения`: { id = 2 }
            break;
        case `Питомцы`: { id = 3 }
            break;
        case `Активность`: { id = 4 }
            break;
        case `Ранги`: { id = 5 }
            break;
        case `Магазин`: { id = 6 }
            break;
        case `Система никнеймов`: { id = 7 }
            break;
        case `Премиум`: { id = 8 }
            break;
        case `Новые участники`: { id = 9 }
            break;
        case `Дни рождения`: { id = 10 }
            break;
        case `Служба поддержки`: { id = 11 }
            break;
        case `Модерация`: { id = 12 }
            break;
        case `Безопасность`: { id = 13 }
            break;
        case `Временные каналы`: { id = 14 }
            break;
        case `Личные сообщения бота`: { id = 15 }
            break;
        case `Логи`: { id = 16 }
            break;
        case `Временные роли`: { id = 17 }
            break;
        case `Автороли`: { id = 18 }
            break;
        case `Обновление пользователей`: { id = 19 }
            break;
        case `Обновление каналов`: { id = 20 }
            break;
        case `Опыт гильдии`: { id = 21 }
            break;
        case `Музыка`: { id = 22 }
            break;
        case `Запись звука`: { id = 23 }
            break;
        case `Предметы`: { id = 24 }
            break;
        default: { id = 9999 }
            break;
    }

    return id
}

function toggleOnOff(boolean) {
    let err = new Error(`\`Выбранная опция должны иметь тип Boolean!\``)
    if (typeof boolean !== "boolean") return err

    if (boolean === false) return `\`Отключено\` ❌`
    else if (boolean === true) return `\`Включено\` ✅`

}


module.exports = {
    toOrdinalSuffix,
    gameConstructor,
    calcActLevel,
    getLevel,
    permToName,
    isURL,
    SettingsPluginsGetID,
    toggleOnOff
}