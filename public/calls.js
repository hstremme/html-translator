var text_input = document.getElementById("html_input");
var api_input = document.getElementById("api_key");
var text_output = document.getElementById("html_output");
var alert_box = document.getElementById("alert");

document.getElementById("trans_button").onclick = translate;

var typingTimer;
text_input.addEventListener('keyup', () => {
    console.log("Event Fired");
    clearTimeout(typingTimer);
    if (text_input.value){
        typingTimer = setTimeout(translate, 1000);
    }
});

async function translate(){
    console.log("this is called");
    if (!api_input.value){
        console.log("No Key entered");
        alert_box.innerHTML = "Please enter DeepL-API Key!"
        alert_box.style.display = "block";
    } else {
        alert_box.style.display = "none";
        var data = await api_call();
        text_output.value = data.text;    
    }
}

async function api_call(){ 
    var req_data = {
        'text': text_input.value,
        'key': api_input.value
    }
    var url = "";
    var res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(req_data)
    });
    return await res.json();
}

function isItRuning(){
    console.log("HAAAAAAAAAAAALOO")
}
