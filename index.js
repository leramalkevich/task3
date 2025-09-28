const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const email = "leramalkevich@gmail.com";
const emailPath = emailTransformation(email).toString().trim();
let currentUrl = '';

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

app.get('/app/${emailPath}', (req, res) => {
    res.redirect(`/app/${emailPath}`);
});

app.get(`/app/${emailPath}`, (req, res) => {
    const x = req.query.x || '{}';
    const y = req.query.y || '{}';
    const currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const urlObj = new URL(currentUrl);
    urlObj.searchParams.set('x', x.toString().trim());
    urlObj.searchParams.set('y', y.toString().trim());
    if (!isNatural(x) || !isNatural(y)) {
        res.send('NaN');
        return;
    }
    let result = lcmCalculation(Number(x), Number(y));
    res.set('Content-Type', 'text/plain');
    res.send(String(result));
});


app.get('/', (req, res) => {
    res.redirect(`/${emailPath}`);
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});