

function createXmlHttp() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest()
    } else {
        // IE6,IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    return xmlhttp;
}
