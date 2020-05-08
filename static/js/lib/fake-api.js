(async function(FakeApi, localDatabase) {
    var self = FakeApi;

    var data = localDatabase.retrieveData();
    var apiUrl = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';

    if (!data.length) {
        var response = await fetch(apiUrl);
        if (response.ok) {
            data = await response.json();
            localDatabase.addData(data);
        }
    }

    self.getData = function() {
        return Array.from(data);
    }
})(window.FakeApi = window.FakeApi || {}, window.LocalDatabase);