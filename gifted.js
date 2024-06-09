const giftech = require('express');
const gifted = require('path');
const { spawn } = require('child_process');
const axios = require('axios')
const gift = giftech();


gift.use(giftech.static(gifted.join(__dirname, 'gifted')));


gift.get('/', (req, res) => {
    res.sendFile(gifted.join(__dirname, 'gifted', 'gifted.html'));
});

const GIFTED_TECH = process.env.GIFTED_TECH || 3000;
gift.listen(GIFTED_TECH, () => {});


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
