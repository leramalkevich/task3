const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const email = "leramalkevich@gmail.com";
const emailPath = emailTransformation(email).toString().trim();
let x = 5;
let y = 13;

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
    res.redirect(`/${emailPath}`);
    const currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const urlObj = new URL(currentUrl);
    urlObj.searchParams.set('x', '{}');
    urlObj.searchParams.set('y', '{}');
    const updatedUrl = urlObj.toString();
    res.redirect(updatedUrl);
});

app.get(`/${emailPath}`, (req, res) => {
    const x = req.query.x;
    const y = req.query.y;

    if (!isNatural(x) || !isNatural(y)) {
        res.send('NaN');
        return;
    }

    let result = lcmCalculation(Number(x), Number(y));
    res.set('Content-Type', 'text/plain');
    res.send(String(result));
});


app.listen(port, () => {
    console.log(`Server running at ${port}`);
});