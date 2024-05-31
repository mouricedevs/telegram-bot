const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');



const gradient = require('gradient-string');

function createGradientLogger() {
    const colors = ['blue', 'cyan'];
    return (message) => {
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color1 = colors[colorIndex];
        const color2 = colors[(colorIndex + 1) % colors.length];
        const gradientMessage = gradient(color1, color2)(message);
        console.log(gradientMessage);
    };
}

const logger = createGradientLogger();




const REPO_OWNER = 'samirxpikachuio';
const REPO_NAME = 'XaR-V2';

const VERSION_FILE = path.join(__dirname, 'version.txt');

async function syncRepo() {
    try {
        const git = simpleGit(path.join(__dirname));
        const remoteUrl = `https://github.com/${REPO_OWNER}/${REPO_NAME}.git`;

        await git.addRemote('authenticated-origin', remoteUrl).catch(() => {});

        await git.fetch('authenticated-origin', 'main');
        await git.reset(['--hard', 'authenticated-origin/main']);

        const log = await git.log();
        const latestCommitSha = log.latest.hash;

        fs.writeFileSync(VERSION_FILE, latestCommitSha);

        logger('[ Repository synchronized with the latest version. ]');
        logger(`Current version: ${latestCommitSha}`);
    } catch (error) {
    logger('Error synchronizing repository:', error);
    }
}

syncRepo();
