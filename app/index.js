const express = require('express');
// const app = express();
// const port = process.env.PORT || 10000;
// const email = "leramalkevich@gmail.com";
// const emailPath = emailTransformation(email).toString().trim();
const router = express.Router();

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
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// function emailTransformation(email) {
//     return email.replace(/[^A-Za-z0-9]/g, '_');
// }

// app.router(`/${emailPath}`)
//     // res.redirect(`/${emailPath}`);
//     .get((req, res) => {
//         const x = req.query.x || 'NaN';
//         const y = req.query.y || 'NaN';
//         if (!isNatural(x) || !isNatural(y)) {
//             res.type('text/plain').send('NaN');
//             return;
//         }
//         let result = lcmCalculation(Number(x), Number(y));
//         res.type('text/plain').send(result.toString());
//     });
    // });

router.get(`/`, (req, res) => {
// app.get(`/${emailPath}`, (req, res) => {
    const x = req.query.x || 'NaN';
    const y = req.query.y || 'NaN';
    if (!isNatural(x) || !isNatural(y)) {
        res.type('text/plain').send('NaN');
        return;
    }
    let result = lcmCalculation(Number(x), Number(y));
    res.type('text/plain').send(result.toString());
});

// app.listen(port, () => {
//     const urlBase = `https://task3-5eov.onrender.com/${emailPath}`;
//     const urlWithParams = `${urlBase}?x={}&y={}`;
//     console.log(urlWithParams);
// });

module.exports = router;