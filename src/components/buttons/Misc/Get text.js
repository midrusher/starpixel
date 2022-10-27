const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, InteractionType, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const apply = require('../../../commands/Misc/apply');
const { Apply } = require(`../../../schemas/applications`)
module.exports = {
    data: {
        name: "text"
    },
    async execute(interaction, client) {
        await interaction.deferUpdate()

        try {
            await interaction.member.send({
                content: `(1)Я получил недавно письмо, в котором школьница пишет о своей подруге. (2)Учительница литературы предложила этой подруге написать сочинение об очень крупном советском писателе. (3)И в этом сочинении школьница, отдавая должное и гениальности писателя, и его значению в истории литературы, написала, что у него были ошибки. (4)Учительница сочла всё это неуместным и очень её бранила. (5)И вот подруга той школьницы обращается ко мне с вопросом: можно ли писать об ошибках великих людей? (6)Я ей ответил, что не только можно, но и нужно писать об ошибках великих людей, что велик человек не тем, что он ни в чём не ошибался. (7)Никто не свободен от ошибок в нашей жизни, в нашей сложной жизни.
(8)Что человеку важно? (9)Как прожить жизнь? (10)Прежде всего – не совершить никаких поступков, которые бы роняли его достоинство. (11)Можно не очень много сделать в жизни, но если ты не делаешь ничего, даже мелкого, против своей совести, то уже этим самым ты приносишь колоссальную пользу. (12)Даже в обыденной нашей, повседневной жизни. (13)А ведь в жизни могут быть и тяжёлые, горькие ситуации, когда перед человеком стоит проблема выбора – быть обесчещенным в глазах окружающих или в своих собственных. (14)Уверен, что лучше быть обесчещенным перед другими, нежели перед своей совестью. (15)Человек должен уметь жертвовать собой. (16)Конечно, такая жертва — это героический поступок. (17)Но на него нужно идти.

(18)Когда я говорю о том, что человек не должен идти против своей совести, не должен совершать с ней сделку, я вовсе не имею в виду, что человек не может или не должен ошибаться, оступаться. (19)Никто не свободен от ошибок в нашей сложной жизни. (20)Однако человека, который оступился, подстерегает серьёзнейшая опасность: он нередко приходит в отчаяние. (21)Ему начинает казаться, что все кругом подлецы, что все лгут и скверно поступают. (22)Наступает разочарование, а разочарование, потеря веры в людей, в порядочность — это самое страшное.

(23)Да, говорят: «Береги честь смолоду». (24)Но если даже не удалось сберечь честь смолоду, её нужно и можно вернуть себе в зрелом возрасте, переломить себя, найти в себе смелость и мужество признать ошибки.`
            })

            await interaction.member.send({
                content: `(25)Я знаю человека, которым сейчас все восхищаются, которого очень ценят, которого и я в последние годы его жизни любил. (26)Между тем в молодости он совершил дурной поступок, очень дурной. (27)И он мне потом рассказал об этом поступке. (28)Сам признался. (29)Позже мы плыли с ним на теплоходе, и он сказал, опершись на поручни палубы: «А я думал, что вы со мной и разговаривать не станете». (30)Я даже не понял, о чём он: моё отношение к нему изменилось гораздо раньше, чем он признался в грехах молодости. (31)Я уже сам понимал, что он многое не осознавал из того, что делал...

(32)Путь к раскаянию может быть долгим и трудным. (33)Но как же украшает мужество признать свою вину – украшает и человека, и общество.

(34)Тревоги совести... (35)Они подсказывают, учат; они помогают не нарушать этических норм, сохранять достоинство – достоинство нравственно живущего человека.`
            })
        } catch (e) {
            await interaction.reply({
                content: `Вы закрыли личные сообщения! Пожалуйста, откройте их!`,
                ephemeral: true
            })
        }


    }
}