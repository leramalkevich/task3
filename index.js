const express = require('express');
const app = express();
const port = process.env.PORT || 10000;
const email = "leramalkevich@gmail.com";
const emailPath = emailTransformation(email).toString().trim();

function isNatural(n) {
    let num = Number(n);
    return Number.isInteger(num) && num >= 0;
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

app.get('/', (req, res) => {
    res.redirect(`/${emailPath}`);
});

app.get(`/${emailPath}`, (req, res) => {
    const x = req.query.x || 'NaN';
    const y = req.query.y || 'NaN';
    if (!isNatural(x) || !isNatural(y)) {
        res.type('text/plain').send('NaN');
        return;
    }
    let result = lcmCalculation(Number(x), Number(y));
    res.type('text/plain').send(result.toString());
});

app.listen(port, () => {
    const urlBase = `https://task3-5eov.onrender.com/${emailPath}`;
    const urlWithParams = `${urlBase}?x={}&y={}`;
    console.log(urlWithParams);
});