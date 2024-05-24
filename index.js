const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const axios = require('axios')
const app = express();


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});


//startproject function is taken from goat-bot v2
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
