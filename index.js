const express = require('express');
const path = require('path');
const { spawn } = require('child_process');


const app = express();


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/uptime', (req, res) => {
    let currentTime = Date.now();
    let uptime = currentTime - startTime;

    let days = Math.floor(uptime / (1000 * 60 * 60 * 24));
    let hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));

    res.json({ uptime: `${days} day(s) ${hours} hour(s) ${minutes} minute(s)` });
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
