const ejs = require("ejs");
const fs = require("fs");

const files = ["index"];
const english = JSON.parse(fs.readFileSync("./languages/en.json", { encoding: 'utf8' }));

fs.rmSync("./html", { recursive: true });
fs.mkdirSync("./html", { recursive: true })
fs.mkdirSync("./html/en", { recursive: true })

files.forEach(name => {
    ejs.renderFile(
        `./ejs/${name}.ejs`,
        english
        ,
        (err, html) => {
            if (err !== null) {
                console.log(err);
            }
            fs.writeFile(`./html/${name}.html`, html, (err) => {
                if (err !== null) {
                    console.log(err);
                }
            })
        }
    )
});
