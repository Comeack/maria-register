const Discord = require('discord.js');
const db = require('quick.db');


//f(!['798257016291459083'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
//(!['798257016291459083'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR'))return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
//tColor('#2e042c')).then(x => x.delete({timeout: 5000}));
//if(!['798257016291459083'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMI
    run: async(client, message, args) => {
    
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('🎄Developed by Niwren🎄');

  //öğkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk     
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi!"))
      
        let name = args[1]
        if (!name) return message.channel.send(embed.setDescription("Kullanıcı için bi isim yazılmak zorunda!"))

        let age = args[2]
        if (!age) return message.channel.send(embed.setDescription("Kullanıcı için bir yaş yazılmak zorunda!"))

        message.guild.members.cache.get(member.id).setNickname(`• ${name} | ${age}`)
        db.push(`isimler_${member.id}`, ` \`${name} | ${age}\` (isim değiştirme>)`);
        message.channel.send(embed.setDescription(`${member} adlı kullanıcının ismi \`${name} | ${age}\` olarak değiştirildi`)

        )
    };
exports.conf = {enabled: true, guildOnly: true, aliases: ["nick","i"], permLevel: 0}

exports.help = {name: 'isim', description: "isim komudu işte sjsjsj", usage: '.isim @etiket/id İsim Yaş'}