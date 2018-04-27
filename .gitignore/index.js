const Discord = require('discord.js')
const bot = new Discord.Client()

const PREFIX = "!";

var dispatcher;

function sendError(message, description) {
  message.channel.send({embed: {
    color: 15158332,
    description: ':x: ' + description
  }})
}


bot.on('ready', function () {
  console.log("Je suis connecté !")
})


bot.on('message', message => { 
  if(message.content[0] === PREFIX) {
    let splitMessage = message.content.split(" ");
    if(splitMessage[0] === '!jouer') {
      if(splitMessage.lenght === 2)
      {
         if(message.member.voiceChannel)
         {
            message.member.voiceChannel.join().then(connection => {
              dispatcher = connection.playArbitraryInput(splitMessage[1]);

              dispatcher.on('error', e => {
                console.log(e);
              });

              dispatcher.on('end', e => {
                dispatcher = undefined;
                console.log('fin du son');
              });

            }).catch(console.log);

         }
        else
        sendError(message, 'Erreur, vous devez être connecté à un salon vocal.');
      }
      else
          sendError(message, 'Erreur, problème dans le paramètre.');

    }
    else if(spliMessage[0] === '!pause') {
      if(dispatcher !== undefined)
          dispatcher.pause();

       }

       else if(spliMessage[0] === '!resume') {
        if(dispatcher !== undefined)
            dispatcher.resume();
  
        }
      
  } 
});


bot.login('NDM5NDIwOTE5NDE3NjY3NTg0.DcTTww.ALsxiiJHZyZBLRWfQq6hhttSubI')

bot.on('message', message => {
    if (message.content === 'ping') {
      message.reply('pong !')
    }
  })

  bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
      return channel.send('Bienvenue sur mon serveur ' + member.displayName)
    }).catch(console.error)
    // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
  })

