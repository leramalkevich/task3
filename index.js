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
});

const url = new URL(window.location.href);
url.searchParams.append('x', x.toString());
url.searchParams.append('y', y.toString());
history.pushState({}, '', url.toString());

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