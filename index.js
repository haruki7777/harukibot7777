const { Client , Intents , Collection} = require('discord.js')
const client = new Client({intents:32767})
const fs = require('fs')
const {prefix , token} = require('./config.json')

client.once('ready',()=>{
    console.log("봇이 준비되었습니다")
    client.once('ready',()=>{
        let number = 0
        setInterval(() => {
            const list = ["나츠미는 방을 지키는중!!", "하루키의방에도 놀러오는것이다냥!!" , "냐냥~~" , "지친 나츠미다냥~~"]
            if(number == list.length) number = 0
            client.user.setActivity(list[number],{
                type:"PLAYING"
            })
            number++
        }, 2000) //몇초마다 상태메세지를 바꿀지 정해주세요 (1000 = 1초)
        console.log("봇이 준비되었습니다")
    })

})
client.on('messageCreate' , message=>{
    if(message.content == "핑"){
        message.reply("응?내핑?")
    }
})
client.commands = new Collection()

const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandsFile){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name , command)
}

client.on('messageCreate' , message=>{
    if(!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    try{
        command.execute(message,args)
    } catch (error) {
        console.error(error)
    }
})

client.login("OTA1MzU1NDkxNzA4OTAzNDg1.YYI4AQ.2H6tLF-5UfUrmqggXpw0KLlWPs8")