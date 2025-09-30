const express = require('express');
const crypto = require('crypto');
const app = express();
const port = process.env.PORT || 3000;
const email = "leramalkevich@gmail.com";
const emailPath = emailTransformation(email).toString().trim();
let x = getRandomBigInt() || 'NaN';
let y = getRandomBigInt() || 'NaN';

function isNatural(n) {
    // let num = Number(n);
    // return Number.isInteger(num) && num > 0;
    try {
        const num = BigInt(n);
        return num > 0n;
    } catch {
        return false;
    }
}

function lcmCalculation(x, y) {
    const divisor = gcd(x, y);
    const bigA = BigInt(x);
    const bigB = BigInt(y);
    const bigDivisor = BigInt(divisor);
    return (bigA / bigDivisor) * bigB;
}

function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function emailTransformation(email) {
    return email.replace(/[^A-Za-z0-9]/g, '_');
}

function getRandomBigInt() {
    const bytesCount = 64;
    const buffer = crypto.randomBytes(bytesCount);
    return BigInt('0x' + buffer.toString('hex'));
}

app.get('/', (req, res) => {
    const url = `/${emailPath}`;
    // const url = `/${emailPath}?x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}`;

    res.redirect(url);
});

app.get(`/${emailPath}`, (req, res) => {
// app.get(`/:emailPath{.x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}}`, (req, res) => {
    try {
        if (!req.query.x || !req.query.y) {
            res.type('text/plain').send('');
            return;
        }
        const x = req.query.x || 'NaN';
        const y = req.query.y || 'NaN';
        if (!isNatural(x) || !isNatural(y)) {
            res.type('text/plain').send('NaN');
            return;
        }
        let result = lcmCalculation(Number(x), Number(y));
        res.type('text/plain').send(result.toString());
    } catch (error) {
        res.type('text/plain').send('NaN');
    }
});

app.listen(port, () => {
    const urlBase = `https://task3-5eov.onrender.com/${emailPath}`;
    const urlWithParams = `${urlBase}?x={}&y={}`;
    console.log(urlWithParams);
});