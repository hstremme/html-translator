 const express = require('express');
 const path = require('path');
 const fetch = require('node-fetch');

 const app = express();

 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));

 app.use(express.static(path.join(__dirname, 'public')));

 app.post('/', async (req, res) => {
    var data = await deepl_call(req.body.key, req.body.text);
    res.send(data);
 });

 async function deepl_call(key, text){
     var url = 'https://api-free.deepl.com/v2/translate';
     var res = await fetch(url,{
     method: 'POST',
         headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
         },
         body:`auth_key=${key}&text=${text}&source_lang=DE&target_lang=EN&tag_handling`
     });
     var data = await res.json();
     return data.translations[0];
 }

 app.listen(3000, () => console.log("Server started on port 3000"));
