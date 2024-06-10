### StepWise ###
-**Ensure you've entered your bot token and bot uid in config.json file found in  the gift/cmds dir.**

1. **Setup your Termux using below cmds. Skip setup if you had already did it before.**

- Termux will take 1.35GB of your device storage for full set up so ensure you've got enough space):

```
termux-setup-storage
```
```
apt update
```
```
apt upgrade
```
```
pkg update && pkg upgrade
```
```
pkg install python
```
```
pkg install python2
```
```
pkg install bash
```
```
pkg install libwebp
```
```
pkg install git -y
```
```
pkg install nodejs -y
```
```
pkg install ffmpeg -y
```
```
pkg install wget
```
```
pkg install imagemagick -y
```

2. **Clone the Repository:**
```
git clone https://github.com/mouricedevs/telegram-bot.git
```
```
cd telegram-bot
```
   
3. **Install Dependencies**:
```
npm install 
```

4. **Run the Bot**
```
node gifted.js 
```
