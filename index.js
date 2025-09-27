const express = require('express');
const process = require('node:process');
const app = express();
const port = process.env.PORT || 3000;
let email = "leramalkevich@gmail.com";
const emailPath = emailTransformation(email);

function isNatural(n) {
    let num = Number(n);
    return Number.isInteger(num) && num > 0;
}

function lcmCalculation(x, y) {
    let gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    return (x * y) / gcd(x, y);
}

function emailTransformation(email) {
    return email.replace(/[^A-Za-z0-9]/g, '_');
}

app.get('/', (req, res) => {
    res.send(`You should use the /${emailPath}?x={}&y={} endpoint`);
});

app.get(`/${emailPath}`, (req, res) => {
    let x = req.query.x;
    let y = req.query.y;

    if (!isNatural(x) || !isNatural(y)) {
        res.send('NaN');
        return;
    }

    let result = lcmCalculation(Number(x), Number(y));
    res.send(String(result));
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});