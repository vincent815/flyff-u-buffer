// person.js
'use strict';
const puppeteer = require('puppeteer');

module.exports = class Browser {
    page
    cooldown
    countdown
    constructor(website, min, max) {
        this.website = website;
        this.min = min;
        this.max = max;
    }

    async play() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(this.website);

        this.page = page
    }

    async heal() {
        await this.page.keyboard.press('1');
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    async buff() {
        await this.page.keyboard.press('3');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.page.keyboard.press('4');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.page.keyboard.press('5');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.page.keyboard.press('6');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.page.keyboard.press('c');
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    randomMin() {
        const seconds = Math.random() * (this.max - this.min) + this.min;
        return seconds * 1000 // convert to milliseconds
    }

    enableAutoBuff() {
        this.cooldown = this.randomMin();
        clearInterval(this.countdown)
        let cooldownSec = this.cooldown/1000
        this.countdown = setInterval(() => {
            console.log(`Buffing in ${cooldownSec} sec(s)`)
            cooldownSec -= 1
            if (cooldownSec <= 0) {
                this.buff()
                // repeat
                this.enableAutoBuff()
            }
        }, 1000)
    }

    disableAutoBuff() {
        console.log(`auto buff disabled`)
        clearInterval(this.countdown)
    }
}