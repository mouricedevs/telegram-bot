const sgiftGit = require('simple-git');
const gift = require('path');
const fs = require('fs');



const giftechke = require('gradient-string');

function createGiftedLogin() {
    const colors = ['blue', 'cyan'];
    return (message) => {
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color1 = colors[colorIndex];
        const color2 = colors[(colorIndex + 1) % colors.length];
        const gradientMessage = gradient(color1, color2)(message);
        console.log(gradientMessage);
    };
}

const giftedlogin = createGiftedLogin();




const GIFTED_TECH = 'mouricedevs';
const GIFTED_DEVS = 'telegram-bot';

const GIFTED_UPDATE = gift.join(__dirname, 'version.txt');

async function syncGifted() {
    try {
        const gifte = sgiftGit(gift.join(__dirname));
        const remoteGiftedUrl = `https://github.com/${GIFTED_TECH}/${GIFTED_DEVS}.git`;

        await gifte.addRemote('authenticated-origin', remoteGiftedUrl).catch(() => {});

        await gifte.fetch('authenticated-origin', 'main');
        await gifte.reset(['--hard', 'authenticated-origin/main']);

        const giftedevs = await gifte.log();
        const GiftlatestGiftedCommit = giftedevs.latest.hash;

        fs.writeFileSync(GIFTED_UPDATE, latestGiftedCommit);

        giftedlogin('[ Repository synchronized to the latest version. ]');
        giftedlogin(`Current version: ${GiftlatestGiftedCommit}`);
    } catch (error) {
    giftedlogin('Error synchronizing repository:', error);
    }
}

syncGifted();
