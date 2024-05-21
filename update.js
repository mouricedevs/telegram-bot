const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

const GITHUB_ACCESS_TOKEN = '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';
const REPO_OWNER = 'samirxpikachuio';
const REPO_NAME = 'XaR-V2';

const VERSION_FILE = path.join(__dirname, 'version.txt');

async function syncRepo() {
    try {
        const git = simpleGit(path.join(__dirname));
        const remoteUrl = `https://${GITHUB_ACCESS_TOKEN}@github.com/${REPO_OWNER}/${REPO_NAME}.git`;

        await git.addRemote('authenticated-origin', remoteUrl).catch(() => {});

        await git.fetch('authenticated-origin', 'main');
        await git.reset(['--hard', 'authenticated-origin/main']);

        // Get the latest commit SHA after syncing
        const log = await git.log();
        const latestCommitSha = log.latest.hash;

        // Write the latest commit SHA to version.txt
        fs.writeFileSync(VERSION_FILE, latestCommitSha);

        console.log('Repository synchronized with the latest commit.');
        console.log(`Latest commit SHA: ${latestCommitSha}`);
    } catch (error) {
        console.error('Error synchronizing repository:', error);
    }
}

syncRepo();
