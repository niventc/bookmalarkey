function responseListener(details) {
    var flag = false,
    rule = {
            "name": "Access-Control-Allow-Origin",
            "value": "*"
        };

    for (var i = 0; i < details.responseHeaders.length; ++i) {
        if (details.responseHeaders[i].name.toLowerCase() === rule.name.toLowerCase()) {
            flag = true;
            details.responseHeaders[i].value = rule.value;
            break;
        }
    }
    if(!flag) details.responseHeaders.push(rule);

    // if (accessControlRequestHeaders) {

    //     details.responseHeaders.push({"name": "Access-Control-Allow-Headers", "value": accessControlRequestHeaders});

    // }

    // if(exposedHeaders) {
    //     details.responseHeaders.push({"name": "Access-Control-Expose-Headers", "value": exposedHeaders});
    // }

    details.responseHeaders.push({"name": "Access-Control-Allow-Methods", "value": "GET, PUT, POST, DELETE, HEAD, OPTIONS"});

    return {responseHeaders: details.responseHeaders};
}

chrome.webRequest.onHeadersReceived.addListener(this.responseListener);