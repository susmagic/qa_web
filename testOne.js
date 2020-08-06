const fs = require('fs')
const needle = require('needle');
const cheerio = require('cheerio');

const fileRead = fs.readFile('tmp/1.txt', 'utf8', function(err, data) {
    let lines = data.split('\n');
    for (let line = 0; line < lines.length; line++) {
        let arr = lines[line]
        let url = arr.substr(0, arr.indexOf(','));
        let title = arr.substring(url.length + 1, arr.length)
        needle.get(url, function(error, response) {
            if (!error) {
                let $ = cheerio.load(response.body)
                let findTitle = $("title").text()
                if (findTitle === title) {
                    console.log(`Line ${line + 1} PASS`)
                    console.log(`Actual Result - ${findTitle}`)
                    console.log(`Expected Result - ${title}`)
                } else {
                    console.log(`Line ${line + 1} FAIL`)
                    console.log(`Actual Result - ${findTitle}`)
                    console.log(`Expected Result - ${title}`)
                }
            };
        });
    };
});