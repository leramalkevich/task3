const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const email = "leramalkevich@gmail.com";
const emailPath = emailTransformation(email).toString().trim();
let url = require('url');

function fullUrl(req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    });
}

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

app.get(`/${emailPath}`, (req, res) => {
    const x = req.query.x || 'NaN';
    const y = req.query.y || 'NaN';
    // const currentUrl = fullUrl(req);
    // const currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // const urlObj = new URL(currentUrl);
    // currentUrl.searchParams.get('x');
    // currentUrl.searchParams.get('y');
    if (!isNatural(x) || !isNatural(y)) {
        res.type('text/plain').send('NaN');
        return;
    }
    let result = lcmCalculation(Number(x), Number(y));
    console.log(result);
    res.type('text/plain').send(result.toString());
});

app.get('*', (req, res) => {
    const targetUrl = new URL();
    const x = req.query.x || 'NaN';
    const y = req.query.y || 'NaN';
    targetUrl.searchParams.set('x', x);
    targetUrl.searchParams.set('y', y);

    res.redirect(targetUrl.toString());
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});