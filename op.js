const Discord = require("discord.js");
const client = new Discord.Client({ws: {intents: Discord.Intents.ALL}});
const fs = require("fs");  
client.commands = new Discord.Collection();

client.once("ready", () =>{
    console.log("Agent's Outlist is online!");

    
    fs.readdir('./commands', (err, files) =>{
        if(err) return console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() == 'js');
        if (jsfile.length == 0) {return console.log("could not find any commands!")}

        jsfile.forEach(f => {
            let props = require(`./commands/${f}`);
            client.commands.set(props.help.name, props)
         });
    });
    client.user.setPresence({activity: {name: "playing [>]"}, status: "online"});
})


client.on("message", (message) => {
    if(message.author.bot) return;
    if(message.channel.type !== "text") return;
    let prefix = ">";
    let MessageArray = message.content.split(' ');
    let cmd = MessageArray[0].slice(prefix.length);
    let args = MessageArray.slice[1];
    if(!message.content.startsWith(prefix)) return;

    let commandfile = client.commands.get(cmd);
    if(commandfile) {commandfile.run(client,message,args)}
        
    });
    


client.on('guildMemberAdd', (member) => {

    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome")
    if (!channel) return;

    const joinembed = new Discord.MessageEmbed()
    .setTitle(`A new Member just arrived Now!`)
    .setDescription(`Welcome ${member} we hope you enjoy your stay here!\n**Yay you made us**: ${member.guild.memberCount} members!`)
    .setFooter(`Thanks For joining!!`)
    .setColor("#FF0000")
    .setThumbnail(member.user.avatarURL());
    channel.send(joinembed)
});
     
client.on('guildMemberAdd', (member) => {
    
    const joinembedprivet = new Discord.MessageEmbed()    
    .setTitle(`Welcome To Our Server!`)
    .setDescription(`Welcome ${member} we hope you enjoy your stay here!\nYay you made us: ${member.guild.memberCount} members!\nServer Owner: ${member.guild.owner}\nDon't forget to read the the rules`)
    .setFooter(`Thanks For joining!!`)
    .setColor("#FF0000")
   
    member.send(joinembedprivet)
});



client.on('guildMemberUpdate', (oldMember, newMember) => {
    if(oldMember.nickname !== newMember.nickname) {
    newMember.send('You Just Changed Your Nickname!');
    }
});



client.login("ODY5NTA0NTk4NjE0ODY3OTg5.YP_LQg.HZfX8QKIeYE778iygazGl9tzizQ");
