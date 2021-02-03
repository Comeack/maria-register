const Discord = require('discord.js');
const moment = require("moment");

exports.run = async (client, message, args) => { 
const guild = message.member.guild
let executor = message.member
moment.locale("tr")  
if (!message.member.roles.cache.has("798257016291459083") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().addField("<a:maria__tac:798886561428275211> Yetersiz Yetki",`> Bu Komutu Kullanabilmeniz için Yeterli Yetkiniz Yok.`).setColor("#ccc8c8")).then(m => m.delete({timeout: 7000}));
let mariauye = message.mentions.users.first()
if (!mariauye) return message.channel.send(new Discord.MessageEmbed().addField("<a:maria__tac:798886561428275211> Hatalı Kullanım\n",`> Lütfen Yetki Verilecek Kişiyi Etiketleyiniz.`).setColor("#ccc8c8")).then(m => m.delete({timeout: 7000}));
let user = message.mentions.users.first();
let rol = message.mentions.roles.first()
let member = message.guild.member(mariauye)

//-------------------------------------------------------------------------------------------------------\\


member.roles.add("805509081430360125"); //vip permi
  

//-------------------------------------------------------------------------------------------------------\\

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["vip"],
  permLevel: 0
}
exports.help = {
  name: "vip",
  description: "vip"
}