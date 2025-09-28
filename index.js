const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const email = "leramalkevich@gmail.com";
const emailPath = emailTransformation(email).toString().trim();

function isNatural(n) {
    let num = Number(n);
    return Number.isInteger(num) && num > 0;
}

function lcmCalculation(x, y) {
    // let gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    // return (x * y) / gcd(x, y);
    return Math.abs(x * y) / gcd(x, y);
}

function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
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

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});