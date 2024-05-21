const express = require('express');
const path = require('path');
const { spawn } = require('child_process');


const app = express();


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let startTime = process.hrtime(); 

function formatUptime(uptime) {
  const seconds = Math.floor(uptime);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;

  return `${hours} hours, ${remainingMinutes} minutes, and ${remainingSeconds} seconds`;
}

app.get('/uptime', (req, res) => {
  const now = process.hrtime(startTime);
  const uptime = now[0] + (now[1] / 1e9); 

  const uptimeString = formatUptime(uptime);
  res.json({ uptime: uptimeString });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});


function startProject() {
    const child = spawn("node", ["main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (code) => {
        if (code === 2) {
            console.log("Restarting Project...");
            startProject();
        }
    });
}


startProject();
