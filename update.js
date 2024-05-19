const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const axios = require('axios');

const repoUrl = 'https://api.github.com/repos/samirxpikachuio/XaR-V2/contents';
const rootDirectory = __dirname;
const cmdsDirectory = path.join(__dirname, 'script', 'cmds');
const accessToken = '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';

async function handleUpdateCommand() {
  exec('git pull origin main', async (error, stdout, stderr) => {
    if (error) {
      console.error('Error updating bot:', error);
      return;
    }

    try {
      await updateDirectory(rootDirectory, repoUrl);
      await updateDirectory(cmdsDirectory, `${repoUrl}/script/cmds`);
      console.log('Update process completed.');
    } catch (error) {
      console.error('Error updating files:', error);
    }
  });
}

async function updateDirectory(directory, directoryUrl) {
  try {
    const response = await axios.get(directoryUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const filesInRepo = response.data.map(file => file.name);

    const filesInDirectory = fs.readdirSync(directory);

    // Remove files that are not in the repository
    filesInDirectory.forEach(fileName => {
      if (!filesInRepo.includes(fileName)) {
        fs.unlinkSync(path.join(directory, fileName));
        console.log(`Deleted file: ${fileName}`);
      }
    });

    // Add or update files from the repository
    await Promise.all(filesInRepo.map(async fileName => {
      const fileContent = await axios.get(`${directoryUrl}/${fileName}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const filePath = path.join(directory, fileName);

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, Buffer.from(fileContent.data.content, 'base64'));
        console.log(`Added file: ${fileName}`);
      } else if (fs.readFileSync(filePath, 'utf8') !== Buffer.from(fileContent.data.content, 'base64').toString('utf8')) {
        fs.writeFileSync(filePath, Buffer.from(fileContent.data.content, 'base64'));
        console.log(`Updated file: ${fileName}`);
      }
    }));
  } catch (error) {
    console.error('Error updating files:', error);
  }
}

module.exports = {
  handleUpdateCommand
};