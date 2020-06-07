const Discord = require("discord.js");
const client = new Discord.Client();
const moment = require("moment");
const config = require("./config.json");
require("moment-duration-format");

// This makes the bot work. When the bot is working and online it send the message "Ready" in closal
client.on("ready", () => {
  console.log("Ready");
});

// Note: Load token from config
client.login(config.token);

// Note: Consolidated all event listeners into one listener
client.on("message", (message) => {
  if (message.author.bot) return;

  // Ping Command
  if (message.content.startsWith("??ping")) {
    message.channel.send(`Pong! :ping_pong: = ${Math.round(client.ping)}ms `);
  }

  // Help Command
  if (message.content.startsWith("??help")) {
    message.channel.send('??help -> what this is \n??about -> about this bot \n??poll -> makes a new poll \n??ping -> Shows you how fast i respond.');
  }
  // Note: With a more advanced command loader you could avoid hard-coding the help

  // About Command
  if (message.content.startsWith("??about")) {
    message.channel.send('I am a lurking Racoon made by Gideon Grey#4325. I basicly tell people what not to do here. Before you say *WOW Gideon is a grate dev* let me stop you there. This is a crapply made bot. A verson 2 will be made soon so dont worry about this!');
  }

  // Poll Command
  if (message.content.startsWith("??poll")) {
    message.react('598126537681928193')
      .then(() => message.react('598126524033662976'))
      .then(() => message.react('🤷'))
      .catch(() => console.error('One of the emojis failed to react.'));
  }

  // Filters
  // This flags bad words and tells users not to say them.
  if (config.badWords.find(banned => message.content.toLowerCase().startsWith(banned))) {
    message.channel.send(`<@${message.author.id}> <a:RedX:597874985167618133> Please do not say that word. Violation of <#597882894752677898> 1.`);
  };

  if (config.nsfwCommands.find(banned => message.content.toLowerCase().startsWith(banned))) {
    message.channel.send(`<@${message.author.id}> <a:RedX:597874985167618133> Please don't try to run not safe for work (NSFW) bot commands. Violation of <#597882894752677898> 5.`);
  };

  if ([config.atEveryone, config.atHere].find(banned => message.content.toLowerCase().startsWith(banned))) {
    message.channel.send(`<@${message.author.id}> <a:RedX:597874985167618133> Please don't try pinging @everyone or @here. Violation of <#597882894752677898> 2.`)
  };

  // Note: Why not make thet role unmentionable?
  if (message.content.includes(config.welcomer)) {
    message.channel.send(`<@${message.author.id}> <a:RedX:597874985167618133> Please don't to ping that role. Violation of <#597882894752677898> 2.`)
  };

  // This bans you if you say the n word.
  if (config.nWords.find(banned => message.content.toLowerCase().startsWith(banned))) {
    message.member.ban({
      reason: 'Lurking Raccoon#1622: [AUTOMOD FILTER] Use of discriminatory terminology. Violation rule of 1.',
    }).then(() => {
      message.channel.send(`<@${message.author.id}> was banned for for using discriminative terminology, violation of <#597882894752677898> 1.`);
    }).catch(err => {
      message.reply('I was unable to ban the member');
      // Log the error
      console.error(err);
    })
  }

  // Note: I don't know what you're doing here, so I left it alone.
  // If the message is "ping"
  if (message.content === 'ping') {
    // Send "pong" to the same channel
    message.channel.send(({
      embed: {
        color: 16755489,
        author: {
        },
        title: "Counting",
        description: `This is the couning channel where you count 1+ from the last person. **DO NOT** consecutive count. Wait until someone else counts before you go. `,
        footer: {
        }
      }
    }))
  }

  // If the message is "ping"
  if (message.content === 'embed') {
    // Send "pong" to the same channel
    message.channel.send(({
      embed: {
        color: 16755489,
        author: {
        },
        title: "Question and Answer",
        description: `In this channel you answer a question and ask a question for the next person. Please answer a question before asking one! \n\nformat:\n A: your answer to the previous question.\nQ: your question for the next person to answer. `,
        footer: {
        }
      }
    }))
  }
});

// Note: To do this you would probably need to do something like:
// if (message.content.includes("trigger A") && message.content.includes("trigger B")) { ... }
// copypast trigger [BROKEN]
/*    client.on("message", (message) => {
      if (message.author.bot) return;
      if (message.content.includes("out for a Discord && going around && those who accept && send this to as many && if you see this || not accept friend request from && hackers && tell everyone && copy && paste || discord && clos && populated && active && please send && copy && paste && deleted without hesitation || || ╰━▅╮ && ╰╮ && ┳━━╯ && ╰┳╯ || ╰┳┳┳╯ && ▔╰━╯ && ╱╲╱╲ || Λ＿Λ && ( 'ㅅ' ) && >　⌒ヽ || Carry on reading && Once there was && Now every week && send this to && copy and paste || Jake Paul on a tower about to jump && copy and paste && discord server || funny you opened this because && over the next && first you have && send it to && break the chain ||  || /▌ && /\ && This is bob || ╚═(███)═╝ && Lenn || say about me && ll have you know I && I am trained && Think again && Not only am I extensively trained && kid || have to have a very high IQ && extremely && solid grasp && deftly woven && heavily && intellectual capacity && cryptic reference || years old && is love && is life && spread && push against && straight in the")) {
        message.channel.send(`<@${message.author.id}> <a:RedX:597874985167618133> Do not spred fake copypasts. Violation of <#597882894752677898> 2.`);
}});*/
//declare function moment(inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, strict?: boolean): moment.Moment;
//const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
//const moment = require("moment");
