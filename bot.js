// person.js
'use strict';
const puppeteer = require('puppeteer');

module.exports = class Browser {
    page
    cooldown
    countdown
    countGap = 2000
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
        await new Promise(resolve => setTimeout(resolve, this.countGap));
    }

    async fly() {
        await this.page.keyboard.press('2');
        await new Promise(resolve => setTimeout(resolve, this.countGap));
    }

    async buff() {
        await this.page.keyboard.press('3');
        await new Promise(resolve => setTimeout(resolve, this.countGap));
        await this.page.keyboard.press('4');
        await new Promise(resolve => setTimeout(resolve, this.countGap));
        await this.page.keyboard.press('5');
        await new Promise(resolve => setTimeout(resolve, this.countGap));
        await this.page.keyboard.press('6');
        await new Promise(resolve => setTimeout(resolve, this.countGap));
        await this.page.keyboard.press('7');
        await new Promise(resolve => setTimeout(resolve, this.countGap));
        await this.page.keyboard.press('8');
        await new Promise(resolve => setTimeout(resolve, this.countGap));
        await this.page.keyboard.press('9');
        await new Promise(resolve => setTimeout(resolve, this.countGap));
        await this.page.keyboard.press('c');
        await new Promise(resolve => setTimeout(resolve, this.countGap));
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

            if (cooldownSec <= 10) {
                console.log(`Buffing in ${cooldownSec} sec(s)`)
            }

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

    spamHeal() {
        clearInterval(this.countdown)
        console.log(`spam heal active`)
        this.countdown = setInterval(async () => {
            await this.page.keyboard.press('1');
        }, 500);
    }
}