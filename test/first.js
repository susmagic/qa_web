const fs = require('fs')
const needle = require('needle');
const cheerio = require('cheerio');
const { expect } = require('chai');

let data = fs.readFileSync('tmp/1.txt', 'utf8');
let lines = data.split('\n');

console.log(lines)

describe('Задача 1: Проверка title и ошибок консоли', () => {
        for (let line = 0; line < lines.length; line++) {
            let arr = lines[line]
            let url = arr.substr(0, arr.indexOf(','));
            let title = arr.substring(url.length + 1, arr.length)
            it(`${title}`, () => {
                browser.url(url)
                console.log(browser.log('browser'))
                expect(browser.getTitle()).to.equal(title)
            });
        };
});