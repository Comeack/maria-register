const Discord = require('discord.js');
const moment = require("moment");

exports.run = async (client, message, args) => { 
const guild = message.member.guild
let executor = message.member
moment.locale("tr")  
if (!message.member.roles.cache.has("798257016291459083") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed());
let salvouye = message.mentions.users.first()
if (!salvouye) return message.channel.send(new Discord.MessageEmbed());
let user = message.mentions.users.first();
let rol = message.mentions.roles.first()
let member = message.guild.member(salvouye)



member.roles.add("798257046914334731"); 
  
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kaytısz"],
  permLevel: 0
}
exports.help = {
  name: "unregister"
 
}