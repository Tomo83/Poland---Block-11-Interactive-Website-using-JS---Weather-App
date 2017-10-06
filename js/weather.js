if ('geolocation' in navigator) {
    $('.js-geolocation').show();
} else {
    $('.js-geolocation').hide();
}

$('.js-geolocation').on('click', function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        loadWeather(position.coords.latitude + ',' + position.coords.longitude);
    });
});

navigator.geolocation.getCurrentPosition(function (position) {
        loadWeather(position.coords.latitude + ',' + position.coords.longitude);
    },
    function (error) {
        if (error.code == error.PERMISSION_DENIED);
        loadWeather('Bytom', '');
    });

function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'c',
        success: function (weather) {
            city = weather.city.toUpperCase() + ', ' + weather.country;
            temp = weather.temp + '&deg;<span>C</span>';
            wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg">';
            wind = '<th>' + weather.wind.speed + ' ' + weather.units.speed + '</th>';
            humidity = '<td>' + weather.humidity + ' %</td>';
            currentlyTemp = '<p>' + weather.currently + '</p>';
            sunrise = '<td>' + weather.sunrise + '</td>';
            sunset = '<td>' + weather.sunset + '</td>';

            $(".location").text(city);
            $(".temperature").html(temp);
            $(".climate_bg").html(wcode);
            $(".currentlyTemp").html(currentlyTemp);
            $(".windspeed").html(wind);
            $(".humidity").html(humidity);
            $(".sunrise").html(sunrise);
            $(".sunset").html(sunset);
        },

        error: function (error) {
            $(".error").html('<p>' + error + '</p>');
        }
    });
}