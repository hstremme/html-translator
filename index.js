const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const { debug } = require('console');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/', async (req, res) => {
    var url = 'https://api-free.deepl.com/v2/translate';
    key = req.body.key;
    text = req.body.text;
    return fetch(url, {
    method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:`auth_key=${key}&text=${text}&source_lang=DE&target_lang=EN&tag_handling`
    }).then((response) => {
        if (!response.ok) {
            res.status(403).send("403");
            throw new Error(`HTTP error! Status: ${ response.status }`);
        }
        return response.json();
    }).then((data) => {
        res.send(data.translations[0]);
    }).catch((error) => {
        console.log(error);
    });
});

app.listen(3000, () => console.log("Server started on port 3000"));
