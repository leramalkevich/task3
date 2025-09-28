const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');
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

document.getElementById('button').addEventListener('click', (e) => {
   let x = document.getElementById('x-number').value.toString();
   let y = document.getElementById('y-number').value.toString();
    const urlObj = new URL(currentUrl);
    urlObj.searchParams.set('x', x);
    urlObj.searchParams.set('y', y);
});
app.get('/', (req, res) => {
    // res.redirect(`/${emailPath}`);
    currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    // const currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // const urlObj = new URL(currentUrl);
    // urlObj.searchParams.set('x', '{}');
    // urlObj.searchParams.set('y', '{}');
    // const x = req.query.x;
    // const y = req.query.y;
    // if (!isNatural(x) || !isNatural(y)) {
    //     res.send('NaN');
    //     return;
    // }
    // let result = lcmCalculation(Number(x), Number(y));
    // const updatedUrl = urlObj.toString();
    //
    // try {
    //     Выполняем GET-запрос на обновлённый URL
    //     const response = await fetch(updatedUrl);
    //     const data = await response.text(); // или response.json(), зависит от ответа
    //     res.set('Content-Type', 'text/plain');
    //     res.send(String(data));
        // res.send(`Ответ с сервера по обновлённому URL:\n${data}`);
    // } catch (error) {
    //     res.status(500).send(`Ошибка при запросе: ${error.message}`);
    // }
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