const getAccessToken = () => localStorage.getItem("token");

const setAccessToken = (key) => localStorage.setItem("token",key);

const setVerifyStatus = (status) => localStorage.setItem("verified",status);
const getVerifyStatus = () => localStorage.getItem("verified");

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
    setAccessToken,
    getVerifyStatus,
    setVerifyStatus,
    clearStorage,
    getCSRF,
}