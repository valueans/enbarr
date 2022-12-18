const getAccessToken = (key) => localStorage.getItem(key);

const clearStorage = () => localStorage.clear();

const getCSRF =  (name="csrftoken") => {
    var cookieArr = document.cookie.split(";");
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

export {
    getAccessToken,
    clearStorage,
    getCSRF,
}