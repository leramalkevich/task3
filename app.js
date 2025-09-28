const express = require('express');
const app = express();
const port = process.env.PORT || 10000;
const email = "leramalkevich@gmail.com";
const emailPath = emailTransformation(email).toString().trim();

function emailTransformation(email) {
    return email.replace(/[^A-Za-z0-9]/g, '_');
}
// Import your home page router
const homeRouter = require(`./app/${emailPath}`);

// Use the home page router for the root path
app.use('/', homeRouter);

app.listen(port, () => {
    const urlBase = `https://task3-5eov.onrender.com/${emailPath}`;
    const urlWithParams = `${urlBase}?x={}&y={}`;
    console.log(urlWithParams);
});