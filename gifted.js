const gifted = require('express');
const giftech = require('path');
const { spawn } = require('child_process');
const axios = require('axios')
const gift = gifted();


gift.use(gifted.static(giftech.join(__dirname, 'gifted')));


gift.get('/', (req, res) => {
    res.sendFile(giftech.join(__dirname, 'gifted', 'gifted.html'));
});

const PORT = process.env.PORT || 3000;
gift.listen(PORT, () => {});


//startGifted function is taken from gifted-md whatsapp bot v4.0.0
function startGifted() {
    const child = spawn("node", ["gift.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (code) => {
        if (code === 2) {
            console.log("Restarting Gifted-Md...");
            startGifted();
        }
    });
}


startGifted();
