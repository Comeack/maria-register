const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");

exports.run =  async (client, message, args) => {
  
if(!['798257016291459083'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} **Bu komutu kullanmak için yetkin bulunmamakta.**`)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
  
const tag = 'र'   


const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} **bir kullanıcı belirt.**`)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
let name = args[1]
let age = Number(args[2])
if(!name) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`\`Bir isim belirtmelisin.\``)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
if(!age) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`\`Bir yaş belirtmelisin.\``)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
if(member.id === message.author.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`\`Kendini kayıt edemezsin.\``)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
if(member.id === client.user.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`\`Bot kayıt edemezsin.\``)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
if(member.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`\`Sunucu sahibini kayıt edemezsin.\``)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`\`Belirtilen kullanıcı sizden üst/aynı pozisyonda işleme devam edilemiyor.\``)
.setColor('#2e042c')).then(x => x.delete({timeout: 5000}));
  
  


member.setNickname(`${tag} ${name} | ${age}`)
member.setNickname(`${tag} ${name} | ${age}`)

message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${member} **Üyesinin ismini değiştirdi** ${message.author} \n \n \`${tag} ${name} | ${age}\` **Olarak ismi güncellendi.**`)

.setColor('#2e042c'))
  


datab.push(`isim.${message.guild.id}`, {userID: member.id, isim: name, yas: age, role: "İsim Komutu"})};exports.conf = {enabled: true, guildOnly: true, aliases: ["isim","i"], permLevel: 0}
exports.help = {name: 'nick', description: "isim komudu .d", usage: '.isim @etiket/id İsim Yaş'}