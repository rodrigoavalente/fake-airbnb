(function(LocalDatabase) {
    var self = LocalDatabase;

    var dbName = 'properties';

    self.addData = function(data) {
        localStorage.setItem(dbName, JSON.stringify(data));
    }

    self.retrieveData = function() {
        return JSON.parse(localStorage.getItem(dbName)) || [];
    }
})(window.LocalDatabase = window.LocalDatabase || {});