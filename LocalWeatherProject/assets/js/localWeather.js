$(document).ready(getLocation());
debugger
$("#getWeather").on("click", function(){
    getLocation();
});

function getLocation() {
  $.getJSON('http://ip-api.com/json', function (loc) {
      $('#city').text("for " + loc.city + ', ' + loc.region + ', ' + loc.country);
      getWeather(loc.lat, loc.lon);
    });
}

        
function getWeather(lat, lon) {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' +
    lat + '&lon=' + lon + '&units=imperial' + '&type=accurate' +
    '&APPID=1ad12784cb8033ea29607b446dad158f', function (data) {
       console.log(data);    
              
        var code = data.weather[0].id; 
        
        $('#description').text(data.weather[0].description);
        $('#icon').html("<i class='wi wi-owm-"+code+"' aria-hidden='true'></i>");
        $('#temp').html(Math.round(data.main.temp));
        $('#humidity').html(data.main.humidity + "&#37; humidity");
        $('#wind').text(Math.round(data.wind.speed) + " mph wind");
        
        $('#units').on('click', function(){
            if ($(this).hasClass('F')) {
                $('#temp').html(Math.round((data.main.temp - 32) * 5/9));
                $('#units').html('C');
                $('#units').toggleClass('C F');
            }
            else if ($(this).hasClass('C')) {
                $('#temp').html(Math.round(data.main.temp));
                $('#units').html('F');
                $('#units').toggleClass('C F');
            }
        });
        
        var str = data.weather[0].description;
       
       if (str.includes('few clouds')) {
            $('body').css({
            background: 'url("http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/assets/images/mostlySunny2.jpg") no-repeat center center fixed',  backgroundSize: 'cover'
            });   
       
        } else if (str.includes('thunderstorm')) {
            $('body').css({
            background: 'url("http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/assets/images/Staccoto_Lightning.jpg") no-repeat center center fixed',  backgroundSize: 'cover'
            });
        } else if (str.includes('drizzle') || str.includes('rain') || str.includes('sleet')) {
            $('body').css({
            background: 'url("http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/assets/images/rain.jpg") no-repeat center center fixed',  backgroundSize: 'cover'
            });
        } else if (str.includes('clouds')) {
            $('body').css({
            background: 'url("http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/assets/images/blue-cloudy-sky-1.jpg") no-repeat center center fixed',  backgroundSize: 'cover'
            });
        } else if (str.includes('clear')) {
            $('body').css({
            background: 'url("http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/assets/images/sunnyday2.jpg") no-repeat center center fixed',  backgroundSize: 'cover'
            }); 
        } else if (str.includes('snow')) {
            $('body').css({
            background: 'url("http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/assets/images/6959343-snow-white.jpg") no-repeat center center fixed',  backgroundSize: 'cover'
            }); 
        } else if (str.includes('overcast') || str.includes('fog')) {
            $('body').css({
            background: 'url("http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/assets/images/overcast2.jpg") no-repeat center center fixed',  backgroundSize: 'cover'
            }); 
        } else {
            $('body').css({
            background: 'url("http://nine-grain-design.com/clients/codecampexercises/LocalWeatherProject/assets/images/mostlySunny.jpg") no-repeat center center fixed',  backgroundSize: 'cover'
            });     
  
        }

    });
}



