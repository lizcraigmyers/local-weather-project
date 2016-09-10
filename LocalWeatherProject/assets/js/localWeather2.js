function getLocation() {
  $.get('http://ip-api.com/json', function (loc) {
      $('#city').text(loc.city + ', ' + loc.region + ', ' + loc.country);
      getWeather(loc.lat, loc.lon, loc.countryCode);
    })
    .fail(function (err) {
      getWeather();
  });
}

function getWeather(lat, lon, countryCode) {
  var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
    lat + '&lon=' + lon + '&units=imperial' + '&type=accurate' +
    '&APPID=1ad12784cb8033ea29607b446dad158f'; 

$.get(weatherAPI, function (weatherData) {
  // Also used by convert();
  temp = weatherData.main.temp.toFixed(0);
  tempC = ((temp - 32) * (5 / 9)).toFixed(0);
    
console.log(weatherData)

  var city = weatherData.name,
    condition = weatherData.weather[0].description,
    id = weatherData.weather[0].id,
    speed = Number((weatherData.wind.speed * 0.86897624190816).toFixed(1)),
    deg = weatherData.wind.deg,
    countryShort = weatherData.sys.country,
    windDir,
    iconClass,
    bgIndex,
    backgroundId = [299, 499, 599, 699, 799, 800],
    backgroundIcon = ['thunderstorm',
      'sprinkle',
      'rain',
      'snow',
      'fog',
      'night-clear',
      'cloudy',
    ],
    backgroundImg = [
      'http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/images/thunderstorm.jpg',
      'http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/images/sprinkle.jpg',
      'http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/images/rain.jpg',
      'http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/images/snow.jpg',
      'http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/images/fog.jpg',
      'http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/images/clear.jpg',
      'http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/images/cloudy.jpg',

    ];

  backgroundId.push(id);
  bgIndex = backgroundId.sort().indexOf(id);
  $('body').css('background-image', 'url(' + backgroundImg[bgIndex] + ')');
  iconClass = backgroundIcon[bgIndex];   
    
      if (deg) {
    var val = Math.floor((deg / 22.5) + 0.5),
      arr = [
        'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
      ],
      windDir = arr[(val % 16)];
  } else {
    windDir = 'N';
  }
    
$('#wind-speed').html(
    '<i class="wi wi-wind wi-from-' + windDir.toLowerCase() + '"></i><br>' +
    windDir + ' ' + speed + ' knots');
  $('#condition').html(
    '<i class="wi wi-' + iconClass + '"></i><br>' + condition);
})
    
$('#convert-button').click(function () {
  if ($('#temperature').text().indexOf('F') > -1) {
    $('#temperature').text(tempC + ' C');
  } else {
    $('#temperature').text(temp + ' F');
  }
});
