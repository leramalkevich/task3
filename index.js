const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

function isNatural(x, y) {
    let num = Number(n);
    return Number.isInteger(num) && num > 0;
    while (y !== 0) {
        let temp = y;
        y = x % y;
        x = temp;
    }
    return x;
}

function lcmCalculation(x, y) {
    let gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    return (x * y) / gcd(x, y);
    // if (x === 0 || y === 0) {
    //     return 0;
    // }
    // return Math.abs(x * y) / gcd(x, y);
}

// function emailTransformation(email) {
//     return email.replace(/[^A-Za-z0-9]/g, '_');
// }

app.get('/', (req, res) => {
    res.redirect('/leramalkevich_gmail_com');
});

app.get(`/leramalkevich_gmail_com`, (req, res) => {
    const x = parseInt(req.query.x);
    const y = parseInt(req.query.y);

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