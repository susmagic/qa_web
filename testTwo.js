const fs = require('fs')
const needle = require('needle');

const fileRead = fs.readFile('tmp/2.txt', 'utf8', function(err, data) {
    let lines = data.split('\n');
    for (let line = 0; line < lines.length; line++) {
        let arr = lines[line]
        let url = arr.substr(0, arr.indexOf(','));
        let code = arr.substring(url.length + 1, arr.length)
        needle.get(url, function(error, response) {
            if (!error) {
                let statusCode = response.statusCode.toString()
                if (statusCode === code) {
                    console.log(`Line ${line + 1} PASS`)
                    console.log(`Actual Result - ${statusCode}`)
                    console.log(`Expected Result - ${code}`)
                } else {
                    console.log(`Line ${line + 1} FAIL`)
                    console.log(`Actual Result - ${statusCode}`)
                    console.log(`Expected Result - ${code}`)
                }
            };
        });
    };
});