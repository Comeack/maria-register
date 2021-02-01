const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

    run: async(client, message, args) => {

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("Öncellikle Bir Kullanıcı Belirtmelisin.")
        let isimler = db.get(`isimler_${member.user.id}`);
        if (!isimler) return message.channel.send("Bu Kullanıcının Daha Öncedenki İsmi Bulunmuyor.")
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle("Bu kullanıcı daha önceden")
            .setDescription(isimler.map((data, i) => `**${i + 1}.** ${data}`).join("\n") + `\nisimlerinde kayıt olmuş.`)
            .setFooter('Morsteo was Here')
            .setTimestamp()//silersen yapmam
        message.channel.send(embed)
    }
exports.conf = {enabled: true, guildOnly: true, aliases: ["isimler"], permLevel: 0}

exports.help = {name: 'isimler', description: "Etiketlenen kişiyi erkek rolleriyle kayıt eder.", usage: '.erkek @etiket/id İsim Yaş'}