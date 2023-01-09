// Read emoji data from a JSON file and download all of the turtles pictures
const fs = require("fs")
const client = require('https');

emojiJson = fs.readFileSync("./scripts/emojiOutput.json");
emojiData = JSON.parse(emojiJson);

(async ()=>{
    count = 0;
    for (turtle of emojiData["1f422"]) {
        turtle.leftEmoji = turtle.leftEmoji.split("-").reduce((acc, curr) => acc + "-u" + curr, "").slice(1)
        turtle.rightEmoji = turtle.rightEmoji.split("-").reduce((acc, curr) => acc + "-u" + curr, "").slice(1)
        console.log(`${turtle.leftEmoji}_${turtle.rightEmoji}.png`);
        await downloadTurtle(turtle, count)
        count++;
    }
})();

async function downloadTurtle(turtle, name) {
    return new Promise((resolve) => {
        url = `https://www.gstatic.com/android/keyboard/emojikitchen/${turtle.date}/${turtle.leftEmoji}/${turtle.leftEmoji}_${turtle.rightEmoji}.png`
        client.get(url, (res) => {
            res.pipe(fs.createWriteStream(`./tortoises_data/tortoises_png/${name}.png`));
        });
        resolve();
    })
}
