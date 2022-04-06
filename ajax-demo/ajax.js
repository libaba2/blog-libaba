var xmlhttp = require('./xmlHttp').createXmlHttp()
xmlhttp.open('GET', 'http://localhost:9000/login/list', true)
xmlhttp.onreadystatechange = function () {
    console.log(xmlhttp,'xmlhttp');
    if (xmlhttp.readystate === 4 && xmlhttp.status === 200){
        console.log(xmlhttp.responseText,'responseText');
    }
}
xmlhttp.send()