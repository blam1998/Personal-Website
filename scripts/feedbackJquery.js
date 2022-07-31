$("#form1").on("submit",function(e){
    e.preventDefault();
    let payload = {};
    let elements = this.elements;
    for (i = 0; i < elements.length; ++i){
        if (elements[i].type !== "submit"){
            payload[elements[i].name] = elements[i].value;
        }
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST','/');
    xhr.setRequestHeader('Content-Type','application/json');
    console.log(payload);
    let payloadString = JSON.stringify(payload);
    xhr.send(payloadString);
})