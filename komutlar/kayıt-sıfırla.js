const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
if(!["798257001237970965"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} **bu komutu kullanmak için yetkin bulunmamakta.**`)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));


const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`**Bir kullanıcı belirt.**`)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
if(!member.roles.highest.position >= message.member.roles.highest.position) message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`**Belirtilen kullanıcı sizden üst/aynı pozisyonda.**`)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));

  
let bilgi = db.get(`isim.${member.id}`);  
db.delete(`isim.${message.author.id}`)
db.delete(`isim.${message.author.id}`)  
db.delete(`isim.${message.author.id}`)
let toplami = db.fetch(`isim.${message.author.id}`)  

message.react('✅')

message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setColor("#2e042c")
.setDescription(`${member} **Adlı Kullanıcının İsimleri Silindi,** <@${message.author.id}> **Tarafından Sıfırlandı.**`))
  

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["i-sıfırla", "isim-sıfırla", "isimleri-sıfırla"],
    permLevel: 0
};

exports.help = {
    name: "iisim-sıfırla"
}

