var text_input = document.getElementById("html_input");
var api_input = document.getElementById("api_key");
var text_output = document.getElementById("html_output");
var alert_box = document.getElementById("alert");

document.getElementById("trans_button").onclick = translate;

var typingTimer;
text_input.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    if (text_input.value){
        typingTimer = setTimeout(translate, 1000);
    }
});

api_input.addEventListener('input', () => {
    if (api_input.value != ""){
        alert_box.style.display = "none";
    } else {
        alert_box.style.display = "block";
    }
});

async function translate(){
    if (!api_input.value){
        console.log("No Key entered");
        alert_box.innerHTML = "Please enter DeepL-API Key!"
        alert_box.style.display = "block";
    } else {
        var data;
        try{
            data = await api_call();
            text_output.value = data.text;
        } catch (e){
            console.log(e);
        }   
    }
}

async function api_call(){ 
    var req_data = {
        'text': text_input.value,
        'key': api_input.value
    }
    var url = "";
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(req_data)
    }).then((response) => {
        if (!response.ok){
            console.log(response.status)
            alert_box.innerHTML = "Authorization failed. Please supply a valid API Key."
            alert_box.style.display = "block";
            throw new Error(`HTTP error! Status: ${ response.status }`);
        }
        return response.json();
    }).then((data) => {
        return data;
    }).catch((error) => {
        console.log(error);
    });
}