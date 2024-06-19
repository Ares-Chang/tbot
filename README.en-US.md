<p align='center'>
<a href="https://github.com/Ares-Chang/tbot/blob/master/README.md">简体中文</a> | <b>English</b>
</p>

# tbot

A chatbot that runs on the terminal

<p align='center'>
  <img src='https://github.com/Ares-Chang/tbot/assets/36911513/58ac8ec0-713d-4c04-afe7-476e6e5ced38' alt='tbot' width='800'/>
</p>

## Use

Install globally via NPM
```bash
npm install @areschang/tbot -g
```

Type the following command to wake up the chatbot
```bash
tbot # or chat
```

Type `exit` to quit the program

## Config

When the project runs for the first time, a configuration file named `.tbot` will be created in the user's directory, with basic configurations as follows:

```bash
# ~\.tbot
TBOT_BASE_URL=https://api.chatanywhere.com.cn # Request base URL
TBOT_OPENAI_API_KEY='You Keys' # Please fill in your own API key
TBOT_MODEL=gpt-3.5-turbo # Model type
TBOT_MESSAGE_MAX=10 # Number of chat history carried
TBOT_USER_NAME=You # User nickname
TBOT_BOT_NAME=Bot # Bot nickname
```

Configuration content can be changed as needed

> The default request path is a domestic transfer program, based on the [GPT_API_free](https://github.com/chatanywhere/GPT_API_free) project, provided for learning purposes only. Thank you!
