function getEle(selector) {
    return document.querySelector(selector);
};

function saveLocalStorage(dsnv) {
    // convert data về json để lưu xuống localStorage
    // khi convert data về json thì sẽ mất phương thức của object 
    var dataJson = JSON.stringify(dsnv);

    // lưu xuống localStorage 
    localStorage.setItem("DSNV_LOCAL", dataJson);
};