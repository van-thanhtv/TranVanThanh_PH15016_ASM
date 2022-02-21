function MyLocalStorage(key) {
    this.save = function (data) {
        localStorage.setItem(key, JSON.stringify(data));
        return this;
    };

    this.clear = function () {
        localStorage.setItem(key, undefined);
        return this;
    };

    this.isPresent = function () {
        var ob = localStorage.getItem(key);
        return ob != '' && ob != "null" && ob != "undefined" & ob != null;
    };

    this.get = function () {
        return JSON.parse(localStorage.getItem(key));
    }
};