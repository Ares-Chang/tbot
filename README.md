<p align='center'>
<b>简体中文</b> | <a href="https://github.com/Ares-Chang/tbot/blob/master/README.en-US.md">English</a>
</p>

# tbot

运行在终端上的聊天机器人

<p align='center'>
  <img src='https://github.com/Ares-Chang/tbot/assets/36911513/58ac8ec0-713d-4c04-afe7-476e6e5ced38' alt='tbot' width='800'/>
</p>

## Use

通过 NPM 进行全局安装
```bash
npm install @areschang/tbot -g
```

键入以下命令，唤醒聊天机器人
```bash
tbot # or chat
```

键入 `exit` 退出程序运行

## Config

项目初次运行会在用户目录下新建一个名为 `.tbot` 的配置文件，基本配置为下:

```bash
# ~\.tbot
TBOT_BASE_URL = https://api.chatanywhere.com.cn # 请求基本路径
TBOT_OPENAI_API_KEY = 'You Keys' # 请填充自己的 api key
TBOT_MODEL = gpt-3.5-turbo # 模型类型
TBOT_MESSAGE_MAX = 10 # 聊天携带历史信息数
TBOT_USER_NAME = You # 用户昵称
TBOT_BOT_NAME = Bot # 机器人昵称
TBOT_USER_NAME_COLOR = '#61afef' # 用户昵称颜色
TBOT_BOT_NAME_COLOR = '#c678dd' # 机器人昵称颜色
TBOT_BOT_TEXT_COLOR = '#d1d5db' # 机器人文本颜色
```

配置内容可按需更改

> 默认请求路径为国内中转程序，基于 [GPT_API_free](https://github.com/chatanywhere/GPT_API_free) 项目提供，仅供学习，感谢！
