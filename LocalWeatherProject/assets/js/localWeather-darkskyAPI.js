$("#getWeather").on("click", function(){
    getLocation();
});

function getLocation() {
  $.getJSON('http://ip-api.com/json', function (loc) {
      $('#city').text("for " + loc.city + ', ' + loc.region + ', ' + loc.country);
      console.log(loc.lat, loc.lon);
      getWeather(loc.lat, loc.lon);
    });
};


function getWeather(lat, lon) {
    $.getJSON('https://api.forecast.io/forecast/d9f5f22ab17a7e2f810ac2fc9f0bdefa/'+lat+','+lon), function (data) {
       console.log(data);    
                
// 
//var weatherIcons = {
//    "800": {
//    "label": "clear sky",
//    "icon": "sunny"
//  },
//};        
var code = data.weather[0].id;
//var icon = weatherIcons[code].icon;
//
//  // If we are not in the ranges mentioned above, add a day/night prefix.
//  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
//    icon = 'day-' + icon;
//  }
//
//  // Finally tack on the prefix.
//  icon = prefix + icon;
//        
//        
        
        
        $('#description').text(data.weather[0].description);
        $('#icon').html("<i class='wi wi-owm-"+code+"' aria-hidden='true'></i>");

        $('#temp').html(Math.round(data.main.temp) + "&#176; F");
        $('#humidity').html(data.main.humidity + "&#37; humidity");
        $('#wind').text(Math.round(data.wind.speed) + " mph wind");

        $('body').css({
            backgroundImage: 'url("http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/assets/images/919861-winter-snow-wallpaper.jpg")',  backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
            });
             

    };
};


//function insertWeather() {
//    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' +
//    lat + '&lon=' + lon + '&units=imperial' + '&type=accurate' +
//    '&APPID=1ad12784cb8033ea29607b446dad158f', function (data){
//        $('#temp').text(data.main.temp);
//        $('#condition').text(data.weather[0].description);
//    });
//};
//
