const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const axios = require('axios')
const gift = express();


gift.use(express.static(path.join(__dirname, 'gifted')));


gift.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'gifted', 'gifted.html'));
});

const PORT = process.env.PORT || 5000;
gift.listen(PORT, () => {});


//startGifted function is taken from gifted-md v4.5.0
function startGifted() {
    const child = spawn("node", ["gift.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (code) => {
        if (code === 2) {
            console.log("Restarting Gifted...");
            startGifted();
        }
    });
}


startGifted();
