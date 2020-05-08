(function(FakeAirBnb, fakeApi) {
    var app;

    var self = FakeAirBnb;

    var data = [];
    var propertyType = "";
    var displayedData = [];

    var pageBy = 6;
    var currentPage = 1;

    var totalValue = 0;

    let typeColors = {
        'Apartamento': 'color-apartment',
        'Casa': 'color-house',
        'Chácara': 'color-farm',
        'Estúdio': 'color-studio',
        'Loft': 'color-loft',
        'Quarto': 'color-room',
        'Sítio': 'color-site'
    };

    function renderProperties(data) {
        var content = '';
        let range = (currentPage * pageBy) > data.length ?
            data.length :
            currentPage * pageBy;

        for (var i = 0; i < range; ++i) {
            let item = data[i];
            content += `
                <div class="item">
                    <div class="item-image">
                        <div class="img" style="background-image:url('${item.photo}');"></div>
                    </div>
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <span class="badge ${typeColors[item.property_type]}">${item.property_type}</span>
                        <span>US$ ${item.price.toFixed(2)}</span>
                        <br />
                        <label>
                            <input type="checkbox" class="checkbox" onchange="window.FakeAirBnb.calcTotalValue(this, ${item.price})">
                            Reservar
                        </label>
                    </div>
                </div>
            `
        }

        app.innerHTML = content;
    }

    self.initApp = function(appElement) {
        app = document.getElementById(appElement)
        data = fakeApi.getData();
        displayedData = Array.from(data);

        renderProperties(displayedData);
    };

    self.filterByPropertyType = function($event) {
        currentPage = 1;
        propertyType = $event.value

        if (!propertyType) {
            displayedData = data;
        } else {
            displayedData = data.filter(item => item.property_type === propertyType);
        }

        renderProperties(displayedData);
    }

    self.loadMore = function() {
        currentPage += 1;
        if (!(currentPage * pageBy >= displayedData.length))
            renderProperties(displayedData);
    }

    self.calcTotalValue = function($event, value) {
        let checked = $event.checked;

        if (checked) {
            totalValue += value;
        } else {
            totalValue -= value;
        }

        document.getElementById('total').value = `US$ ${totalValue.toFixed(2)}`;
    }

    self.clean = function() {
        let checkBoxes = document.getElementsByClassName('checkbox');

        for (var i = 0; i < checkBoxes.length; ++i) {
            checkBoxes.item(i).checked = false;
        }

        totalValue = 0;
        document.getElementById('total').value = `US$ ${totalValue.toFixed(2)}`;
    }

})(window.FakeAirBnb = window.FakeAirBnb || {}, window.FakeApi);