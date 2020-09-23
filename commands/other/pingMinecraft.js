//COMMANDO DOCUMENTATION HERE: https://discord.js.org/#/docs/commando/master/general/welcome
const { Command } = require('discord.js-commando');
const ping = require('minecraft-server-util');
const { MessageEmbed } = require('discord.js');

module.exports = class PingMinecraftCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pingminecraft',
      aliases: ['minecraftping', 'minecraftinfo'],
      memberName: 'pingminecraft',
      group: 'other',
      description: 
        'Pings the desired Minecraft server. This does not ensure that the server can be connected to.',
      throttling: {
        usages: 1,
        duration: 8
      },
      args: [
        {
          key: 'ipaddress',
          prompt: 
            'Enter the full IP of the server you wish to ping.\nFor example: 127.0.0.1:43381',
          error: 'Invalid argument, try again.',
          type: 'string',
          wait: 10
        }
      ]
    });
  }

  run(message, { ipaddress }) {
    var destination = ipaddress.split(":"); //Split the input IP, must be 2 elements in this order: host,port
    if(destination.length > 2 || destination.length == 0) return message.say('I don\'t think you followed the IP entry format. Try again.');
    console.log(`Someone is attempting to ping ${ipaddress}`);
    if(destination.length = 1) {  
      ping(destination[0])
        .then((response) => {
          //console.log(response);
          const serverEmbed = new MessageEmbed()
            .setColor('#178c0d')
            .setTitle('Server Response')
            .setThumbnail('https://theme.zdassets.com/theme_assets/2155033/bc270c23058d513de5124ffea6bf9199af7a2370.png')
            .addField('Server IP:', `${response.getHost()}:${response.getPort()}`)
            .addField('Server Version:', response.getVersion())
            .addField('Online Players:', `${response.getOnlinePlayers()}/${response.getMaxPlayers()}`)
            .addField('Server Mods:', response.getModList())
            .addField('Description:', response.getDescriptionText())
            .setFooter(
              `Requested by ${message.member.user.tag}`,
              message.member.user.avatarURL('webp', false, 16)
            );
          message.say(serverEmbed);
        })
        .catch((error) => {
          message.say('I had an error trying to ping the server. The server may be down, or the owner might need to whitelist my IP.');
          throw error;
        });
      }
    else {
      ping(destination[0], parseInt(destination[1]))
        .then((response) => {
          //console.log(response);
          const serverEmbed = new MessageEmbed()
            .setColor('#178c0d')
            .setTitle('Server Response')
            .setThumbnail('https://theme.zdassets.com/theme_assets/2155033/bc270c23058d513de5124ffea6bf9199af7a2370.png')
            .addField('Server IP:', `${response.getHost()}:${response.getPort()}`)
            .addField('Server Version:', response.getVersion())
            .addField('Online Players:', `${response.getOnlinePlayers()}/${response.getMaxPlayers()}`)
            .addField('Server Mods:', response.getModList())
            .addField('Description:', response.getDescriptionText())
            .setFooter(
              `Requested by ${message.member.user.tag}`,
              message.member.user.avatarURL('webp', false, 16)
            );
          message.say(serverEmbed);
        })
        .catch((error) => {
          message.say('I had an error trying to ping the server. The server may be down, or the owner might need to whitelist my IP.');
          throw error;
        });
      }
    return;
  }
};
