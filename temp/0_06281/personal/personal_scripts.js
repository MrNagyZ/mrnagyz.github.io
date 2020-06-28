var hg = 0;
var hsog = 0;
var hsw = 0;
var hfc = 0;
var hyc = 0;
var hrc = 0;
var hc = 0;
var ag = 0;
var asog = 0;
var asw = 0;
var afc = 0;
var ayc = 0;
var arc = 0;
var ac = 0;

var mirol = 0;
var mirolVal = 0;
var mirolID = 0;
var mire = 0;
var mireVal = 0;
var mireID = 0;
var nyomott = ["0", "0"];
var kezdo = 2;

var half = 0;
var lastMainTime = 0;
var lastHomeTime = 0;
var lastAwayTime = 0;

var timerStop = 1;

var WebSocketIP = "127.0.0.1";

var home_c = 0;

var main_start_time = 0;
var main_end_time = 0;
var main_full_time = 0;
var temp_home_time = 0;
var temp_away_time = 0;
var time_home = 0;
var time_away = 0;
var homepercent = 0;
var awaypercent = 0;

var adatbazisProba = [];

var WebSocketUzenet = 0;
var Webmez = 0;
var tesztMez = 1;
var tesztOszlop = "nev";
var tesztID = 1;
var tesztUzenet = "tesztuzenet";
var homeAway = 0;

var setup = 0;

var resHome = 0;
var resAway = 0; 

var n = 0;

phpUzenet = [0, 0];

$(document).ready(function(){
    $(".blur").css("filter","blur(3px)");
    $(".choose").fadeIn(100);
    socketExample();
});

function uzenetFigyelo() {
    switch(WebSocketUzenet[0]) {
        case '0':
            $('#start').trigger("click");
            break;
        case '1':
            $('#stop').trigger("click");
            break;
        case '2':   // homeGoal
            Webmez = WebSocketUzenet.split("/");
            $.get('http://127.0.0.1/sql.php?WebSocketHome&&Webmezszam='+Webmez[1]+'&&Webakcio=Goal', function(data) {});
            setTimeout(function() {phpTabla()}, 20);
            return false;
            break;
        case '3':   // awayGoal
            Webmez = WebSocketUzenet.split("/");
            $.get('http://127.0.0.1/sql.php?WebSocketAway&&WebmezszamAway='+Webmez[1]+'&&WebakcioAway=Goal', function(data) {});
            setTimeout(function() {phpTabla()}, 20);
            return false;
            break;
        case '4':   // homeYC
            Webmez = WebSocketUzenet.split("/");
            $.get('http://127.0.0.1/sql.php?WebSocketHome&&Webmezszam='+Webmez[1]+'&&Webakcio=YellowCards', function(data) {});
            setTimeout(function() {phpTabla()}, 20);
            return false;
            break;
        case '5':   // awayYC
            Webmez = WebSocketUzenet.split("/");
            $.get('http://127.0.0.1/sql.php?WebSocketAway&&WebmezszamAway='+Webmez[1]+'&&WebakcioAway=YellowCards', function(data) {});
            setTimeout(function() {phpTabla()}, 20);
            return false;
            break;
        case '6':   // homeRC
            Webmez = WebSocketUzenet.split("/");
            $.get('http://127.0.0.1/sql.php?WebSocketHome&&Webmezszam='+Webmez[1]+'&&Webakcio=RedCards', function(data) {});
            setTimeout(function() {phpTabla()}, 20);
            return false;
            break;
        case '7':   // awayRC
            Webmez = WebSocketUzenet.split("/");
            $.get('http://127.0.0.1/sql.php?WebSocketAway&&WebmezszamAway='+Webmez[1]+'&&WebakcioAway=RedCards', function(data) {});
            setTimeout(function() {phpTabla()}, 20);
            return false;
            break;
    }
}

function recordUpdate() {
        $('.teszt').text(adatbazisProba);
};

// function tablUpdate() {
//     $('.teszt').html(tablazat);
// };



function socketExample() {
	var socket;
	if (window.hasOwnProperty("WebSocket")) { // webkit-browser
        socket = new WebSocket("ws://"+WebSocketIP+":5665/");
	}
	//console.log("Socket is ready.");
	socket.onopen = function() { // the socket is ready, send something
	   socket.send("Wow, HTML5-WebSocket is nice!");
	   console.log("Sent data.");
	};

	socket.onmessage = function(msg) { // the server send something
	 //   alert("The server said: " + msg.data);
        WebSocketUzenet = msg.data;
		uzenetFigyelo();
	 console.log(msg.data);
	};

	socket.onclose = function() { // the server closed the connection
	   //console.log("The server closed the connection.");
	   
       setTimeout(socketExample, 1000);
       //socketExample();
	};
}


function homeTime() {
    temp_away_time = new Date();
    getdate();
    time_home = time_home + (temp_away_time - temp_home_time);
    var totalSeconds = parseInt((time_home) / 1000);
    var minutes = parseInt(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    if(seconds<10){seconds = "0"+seconds;}
    if(minutes<10){minutes = "0"+minutes;}
    $("#hometime").text(minutes+" : "+seconds);
    homepercent = (time_home  / (main_full_time + lastMainTime) * 100).toFixed(2);
    awaypercent = (100 - homepercent).toFixed(2);
    $("#homepercent").text(" "+homepercent+" %");     
    $("#awaypercent").text(" "+awaypercent+" %");
    $(".grass").css('background-color', 'rgb(184, 75, 12)'); 
    home_c = 1;    
}
function awayTime() {
    temp_home_time = new Date();
    getdate();
    time_away = time_away + (temp_home_time - temp_away_time);
    var totalSeconds = parseInt((time_away) / 1000);
    var minutes = parseInt(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    if(seconds<10){seconds = "0"+seconds;}
    if(minutes<10){minutes = "0"+minutes;}
    $("#awaytime").text(minutes+" : "+seconds);
    awaypercent = (time_away / (main_full_time + lastMainTime) * 100).toFixed(2);
    homepercent = (100 - awaypercent).toFixed(2);
    $("#awaypercent").text(" "+awaypercent+" %");
    $("#homepercent").text(" "+homepercent+" %");
    $(".grass").css('background-color', 'rgb(12, 184, 184)');
    home_c = 0;
}
function phpTabla() {
    $.get('http://127.0.0.1/sql.php?tableHOME', function(data) {
        tablazat = data;
        $('.homeTable').html(tablazat);       
    });
    $.get('http://127.0.0.1/sql.php?tableAWAY', function(data) {
        tablazat = data;
        $('.awayStats').html(tablazat);       
    });
    phpCsapatHome();
    phpCsapatAway();
    // for (let index = 1; index < 100; index++) {
    //     if(index%2 == 0){$("."+index).css('background-color','rgb(177, 137, 7)')
    //     }
    // }
    return false;
    
}
function phpOlvasas() {
    $.get('http://127.0.0.1/sql.php?load&&szam='+tesztMez+'&&oszlop='+tesztOszlop, function(data) {
        adatbazisProba = data;
        recordUpdate();        
    });
    return false;
}
function phpIras() {

    $.get('http://127.0.0.1/sql.php?update&&uzenet='+tesztUzenet+'&&id=1', function(data) {
    });
    setTimeout(function() {phpTabla()}, 20);
    return false;
}

function phpNovelesHome() {
    $.get('http://127.0.0.1/sql.php?noveles&&home&&mezszam='+tesztUzenet[1]+'&&akcio='+tesztUzenet[0], function(data) {
    });
    setTimeout(function() {phpTabla()}, 20);
    return false;
}
function phpNovelesAway() {
    $.get('http://127.0.0.1/sql.php?noveles&&away&&mezszam='+tesztUzenet[1]+'&&akcio='+tesztUzenet[0], function(data) {
    });
    setTimeout(function() {phpTabla()}, 20);
    return false;
}

function phpCsapatHome() {
    $.get('http://127.0.0.1/sql.php?homeCsapat', function(data) {
        let resCsapatHome = data.split("/");
        $('#hg').text(resCsapatHome[0]);
        $('#hsog').text(resCsapatHome[1]);
        $('#hfc').text(resCsapatHome[2]);
        $('#hyc').text(resCsapatHome[3]);
        $('#hrc').text(resCsapatHome[4]);
        $('#hsw').text(resCsapatHome[5]);
        $('#hc').text(resCsapatHome[11]);
        $('#hpk').text(resCsapatHome[12]);
        $('#ho').text(resCsapatHome[13]);
    });
    return false;
}

function phpCsapatAway() {
    $.get('http://127.0.0.1/sql.php?awayCsapat', function(data) {
        let resCsapatAway = data.split("/");
        $('#ag').text(resCsapatAway[0]);
        $('#asog').text(resCsapatAway[1]);
        $('#afc').text(resCsapatAway[2]);
        $('#ayc').text(resCsapatAway[3]);
        $('#arc').text(resCsapatAway[4]);
        $('#asw').text(resCsapatAway[5]);
        $('#ac').text(resCsapatAway[11]);
        $('#apk').text(resCsapatAway[12]);
        $('#ao').text(resCsapatAway[13]);
    });
    return false;
}


function phpFeltoltes() {
    $.get('http://127.0.0.1/sql.php?mezszamokHome', function(data) {
        resHome = data.split("/");
        for (let index = 0; resHome[index] != "x"; index++) {
            console.log(resHome[index]);
            $("#th"+(index+1)).val(resHome[index]);
            $("#th"+(index+1)).attr("data-source", "h"+resHome[index]);
            $("#kh"+(index+1)).val(resHome[index]);
            $("#kh"+(index+1)).attr("data-source", "h"+resHome[index]);
        }    
        console.log($(resHome));
    });
    $.get('http://127.0.0.1/sql.php?mezszamokAway', function(data) {
        resAway = data.split("/");
        for (let index = 0; resAway[index] != "x"; index++) {
        
            console.log(resAway[index]);

            $("#ta"+(index+1)).val(resAway[index]);
            $("#ta"+(index+1)).attr("data-source", "a"+resAway[index]);
            $("#ka"+(index+1)).val(resAway[index]);
            $("#ka"+(index+1)).attr("data-source", "a"+resAway[index]);

            // $("input[data-source=a"+(index+1)+"]").val(resAway[index]);
            // $("input[data-source=a"+(index+1)+"]").attr("data-source", "a"+resAway[index]);
        }    
        console.log($(resAway));
    });

    return false;
}

/* ***********************************   GOMBOK   ************************************ */
 
//  $(".gomb").click(function (e) {
//      if(timerStop == 0){
//     //  if (main_full_time != 0) {
//         //  alert(eval($(this).data('source')));
//         eval($(this).data('source')+"++");
//         $('#'+$(this).data('source')).text(eval($(this).data('source')));
//     //  }
//     }
//  });
// $(".gomb").click(function (e) {

// });

$('#homeGoal').click(function() {
    
    WebSocketUzenet = "2/17";
    Webmez = WebSocketUzenet.split("/");
    console.log(Webmez[1]);
    $.get('http://127.0.0.1/sql.php?WebSocketHome&&Webmezszam='+Webmez[1]+'&&Webakcio=Goal', function(data) {
        });
        setTimeout(function() {phpTabla()}, 20);
        return false;
});



$('#phpiras').click(function() {
    phpIras();
});

$('#phpolvasas').click(function() {
    phpOlvasas();
});

$('#phptabla').click(function() {
    phpTabla();
});

$('#felt').click(function() {
    phpTabla();
    phpFeltoltes();
});


$('#Setup').click(function() {
    if(!setup){
        $($(this)).css('background-color','rgb(177, 137, 7)');
        setup = 1;
    }else{
        $($(this)).css('background-color','rgb(49, 49, 49)');
        setup = 0;
    }
});



/* ***********************************   TIMER   ************************************ */

function getdate()
{
    if (timerStop == 0){
        var now = new Date();
        main_full_time = now - main_start_time;
        var totalSeconds = parseInt((main_full_time + lastMainTime) / 1000);
        var m = parseInt(totalSeconds / 60);
        var s = totalSeconds % 60;
        if(s<10){s = "0"+s;}
        if(m<10){m = "0"+m;}
        $("#time").text(m+" : "+s);
        setTimeout(function(){getdate()}, 500);
    }
}

/* ***********************************   START   ************************************ */
 
$('#start').click(function(){
    if (timerStop == 1){
        timerStop = 0;
        if(half == 0){
            kezdo = home_c;
        }
        half++;
        switch (half) {
            case 3:
                $("#half").text("Ex1");
                break;
            case 4:
                $("#half").text("Ex2");
                break;
            default:
                $("#half").text(half);
                break;
        }
        //$("#half").text(half);
        //if(main_start_time == 0){
        $('.choose').fadeOut(70);
        $(".blur").css("filter","blur(0px)");
        if (!Boolean(home_c)) {
            main_start_time = new Date();
            temp_home_time = main_start_time;
        } else {
            main_start_time = new Date();
            temp_away_time = main_start_time;
        }
    // }else{

        // }
        getdate();
    }
});

/* ***********************************   STOP   ************************************ */
 
$('#stop').click(function(){
    if(!Boolean(home_c)){
        temp_away_time = new Date();
        var now = new Date();
        main_full_time = now - main_start_time;
        time_home = time_home + (temp_away_time - temp_home_time);
        var totalSeconds = parseInt(time_home / 1000);
        var minutes = parseInt(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        if(seconds<10){seconds = "0"+seconds;}
        if(minutes<10){minutes = "0"+minutes;}
        $("#hometime").text(minutes+" : "+seconds);
        homepercent = (time_home / (main_full_time + lastMainTime) * 100).toFixed(2);
        awaypercent = (100 - homepercent).toFixed(2);
        $("#homepercent").text(" "+homepercent+" %");     
        $("#awaypercent").text(" "+awaypercent+" %");
        if((kezdo+half)%2 == 1){
            $(".grass").css('background-color', 'rgb(184, 75, 12)'); //piros
            home_c = 1;
        }else{
            $(".grass").css('background-color', 'rgb(12, 184, 184)'); //kek
            home_c = 0;
        } 
    }
    else
    {
        temp_home_time = new Date();
        var now = new Date();
        main_full_time = now - main_start_time;
        time_away = time_away + (temp_home_time - temp_away_time);
        var totalSeconds = parseInt(time_away / 1000);
        var minutes = parseInt(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        if(seconds<10){seconds = "0"+seconds;}
        if(minutes<10){minutes = "0"+minutes;}
        $("#awaytime").text(minutes+" : "+seconds);
        awaypercent = (time_away / (main_full_time + lastMainTime) * 100).toFixed(2);
        homepercent = (100 - awaypercent).toFixed(2);
        $("#awaypercent").text(" "+awaypercent+" %");
        $("#homepercent").text(" "+homepercent+" %");
        if((kezdo+half)%2 == 1){
            $(".grass").css('background-color', 'rgb(184, 75, 12)'); //piros
            home_c = 1;
        }else{
            $(".grass").css('background-color', 'rgb(12, 184, 184)'); //kek
            home_c = 0;
        }
    }
   
    // if((kezdo+half)%2 == 1){
    //     home_c = 1;
    // }else{
    //     home_c = 0;
    // }
    
    timerStop = 1;
    lastMainTime = lastMainTime + main_full_time;
    lastHomeTime = lastHomeTime + time_home;
    lastAwayTime = lastAwayTime + time_away;
});

/* ***********************************   TERFELVALSZTO   ************************************ */

$('#awaygrass').click(function(){
    if(main_start_time == 0){
        if(!Boolean(home_c)){
            $(".grass").css('background-color', 'rgb(184, 75, 12)'); //piros
            home_c = 1;
        }
        else
        {
            $(".grass").css('background-color', 'rgb(12, 184, 184)'); //kek
            home_c = 0;
        }
    }
 });

/* ***********************************   LABDABIRTOKLÁS   ************************************ */

$('#awaygrass').click(function(event){
    if(timerStop == 0 && main_start_time != 0){
        if(!Boolean(home_c))
        {
            homeTime();         
        }
        else
        {
            awayTime();
        }
    }
});

/* ***********************************   JATEKOSCSERELO   ************************************ */

$('.jatekos').click(function(event){
    if(setup){
        mirol = $(this).attr('data-source');
        mirolVal = $(this).val();
        $($(this)).css('background-color','rgb(177, 137, 7)');
    }
});

$('.kozep').click(function(event){
    mire = $(this).attr('data-source');
    mireVal = $(this).val();
    if(mire[0] == mirol[0] && setup){
        $("input[data-source="+mirol+"].kozep").val(mireVal);    
        $("input[data-source="+mirol+"].kozep").attr("data-source", mire);
        $(this).val(mirolVal);
        $(this).attr("data-source", mirol);
        $('.home').css({"background":"rgb(12, 184, 184)"});
        $('.away').css({"background":"rgb(184, 75, 12)"});
    }
});






/* ***********************************   TERULETEK   ************************************ */

$(".shot").click(function () {
    $(".middle").css("filter","blur(3px)");
    $(".overlay").fadeIn(100);
});

$(".shot.al").click(function () {
    $(".overlay").fadeOut(100);
    $(".middle").css("filter","blur(0px)");
});

$(".middle").click(function (e) {
    $(".overlay").fadeOut(100);
    $(".middle").css("filter","blur(0px)");
});

$(".middle").click(function (e) {
    // $('.choose').css('display','none');
    $('.choose').fadeOut(70);
    $(".blur").css("filter","blur(0px)");
});



/* ***********************************   AKCIO   ************************************ */

$('.akcioJatekos').click(function(event){
    if (!setup) {
        $('.home').css({"background":"rgb(12, 184, 184)"});
        $('.away').css({"background":"rgb(184, 75, 12)"});
        $(this).css({"background":"rgb(177, 137, 7)"});
        if ($(this).attr("data-source")[0] == 'h') {
            phpUzenet[1]=eval($(this).val());
            homeAway = 'h';
        }else{
            phpUzenet[1]=eval($(this).val());
            homeAway = 'a';
        }
        // console.log(phpUzenet);
        if (phpUzenet[0] != 0 && phpUzenet[1] != 0) {
            tesztUzenet = phpUzenet;
            if (homeAway == 'h') {
                phpNovelesHome();
            }else{
                phpNovelesAway();
            }
            console.log(tesztUzenet);
            phpUzenet[0] = 0;
            phpUzenet[1] = 0;
            homeAway = 0;
            $('.home').css({"background":"rgb(12, 184, 184)"});
            $('.away').css({"background":"rgb(184, 75, 12)"});
            $('.bottomButton').css({"background":"rgb(11, 111, 111)"});
        }
    }
});
$('.bottomButton').click(function(event){
    phpUzenet[0] = $(this).attr("data-source");
    $('.bottomButton').css({"background":"rgb(11, 111, 111)"});
    $(this).css({"background":"rgb(177, 137, 7)"});
    
    if (phpUzenet[0] != 0 && phpUzenet[1] != 0) {
        tesztUzenet = phpUzenet;
        console.log(tesztUzenet);
        if (homeAway == 'h') {
            phpNovelesHome();
        }else{
            phpNovelesAway();
        }
        
        phpUzenet[0] = 0;
        phpUzenet[1] = 0;
        homeAway = 0;
        $('.home').css({"background":"rgb(12, 184, 184)"});
        $('.away').css({"background":"rgb(184, 75, 12)"});
        $('.bottomButton').css({"background":"rgb(11, 111, 111)"});
    }
});