
const simpleGit = require('simple-git');


const GITHUB_ACCESS_TOKEN = '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';
const REPO_OWNER = 'samirxpikachuio';
const REPO_NAME = 'XaR-V2';



async function syncRepo() {
    try {
        const git = simpleGit(path.join(__dirname));
        const remoteUrl = `https://${GITHUB_ACCESS_TOKEN}@github.com/${REPO_OWNER}/${REPO_NAME}.git`;


        await git.addRemote('authenticated-origin', remoteUrl).catch(() => {});


        await git.fetch('authenticated-origin', 'main');


        await git.reset(['--hard', 'authenticated-origin/main']);

        console.log('Repository synchronized with the latest commit.');
    } catch (error) {
        console.error('Error synchronizing repository:', error);
    }
}

syncRepo();
