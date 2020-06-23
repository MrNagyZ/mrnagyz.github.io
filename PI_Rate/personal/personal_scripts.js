let hg = 0;
let hsog = 0;
let hsw = 0;
let hfc = 0;
let hyc = 0;
let hrc = 0;
let hc = 0;
let ag = 0;
let asog = 0;
let asw = 0;
let afc = 0;
let ayc = 0;
let arc = 0;
let ac = 0;

let jv = 0;
let jatekosClick = 0;
let jatekosClickVal = 0;
let ujjatekosClick = 0;
let ujjatekosClickVal = 0;
let nyomott = ["0", "0"];
let kezdo = 2;

let half = 0;
let lastMainTime = 0;
let lastHomeTime = 0;
let lastAwayTime = 0;

let timerStop = 1;

let serverIP = "2.0.0.198";

let home_c = 0;

let main_start_time = 0;
let main_end_time = 0;
let main_full_time = 0;
let temp_home_time = 0;
let temp_away_time = 0;
let time_home = 0;
let time_away = 0;
let homepercent = 0;
let awaypercent = 0;

var uzenet = 0;

function uzenetFigyelo() {
    switch(uzenet[0]) {
        case '0':
            $('#start').trigger("click");
            break;
        case '1':
            $('#stop').trigger("click");
            break;
        case '2':
            $('#homeGoal').trigger("click");
            break;
        case '3':
            $('#awayGoal').trigger("click");
            break;
        case '4':
            $('#homeYC').trigger("click");
            break;
        case '5':
            $('#awayYC').trigger("click");
            break;
        case '6':
            $('#homeRC').trigger("click");
            break;
        case '7':
            $('#awayRC').trigger("click");
            break;
    }
}

function socketExample() {
	var socket;
	if (window.hasOwnProperty("WebSocket")) { // webkit-browser
        socket = new WebSocket("ws://"+serverIP+":5665/");
	}
	//console.log("Socket is ready.");
	socket.onopen = function() { // the socket is ready, send something
	   socket.send("Wow, HTML5-WebSocket is nice!");
	   console.log("Sent data.");
	};

	socket.onmessage = function(msg) { // the server send something
	 //   alert("The server said: " + msg.data);
		uzenet = msg.data;
		uzenetFigyelo();
	 console.log(msg.data);
	};

	socket.onclose = function() { // the server closed the connection
	   //console.log("The server closed the connection.");
	   
       setTimeout(socketExample, 1000);
       //socketExample();
	};
}
$( document ).ready(function() {
    socketExample();
});

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
/* ***********************************   GOMBOK   ************************************ */
 
 $(".gomb").click(function (e) {
     if(timerStop == 0){
    //  if (main_full_time != 0) {
        //  alert(eval($(this).data('source')));
        eval($(this).data('source')+"++");
        $('#'+$(this).data('source')).text(eval($(this).data('source')));
    //  }
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
        $("#half").text(half);
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

// /* ***********************************   JATEKOSCSERELO   ************************************ */

$('.jatekos').click(function(event){
    jv = 100;
    jatekosClick = $(this).data('source');
    jatekosClickVal = $(this).val();
    $($(this)).css('background-color','rgb(177, 137, 7)');
    nyomott = $(this).data('source');
    //alert(nyomott);
    //alert($(this).data("source"));
});
$('.kozep').click(function(event){
    
    ujjatekosClick = $(this).data('source');
    ujjatekosClickVal = $(this).val();
    if(ujjatekosClick[0] == jatekosClick[0]){
        if(jv == 100){ 
            $(this).val(jatekosClickVal);
            $(this).data("source", jatekosClick);
            jv = 0;
            $("#k"+ujjatekosClick).data("source", jatekosClick);
            $("#k"+jatekosClick).data("source", ujjatekosClick);
            $("#k"+jatekosClick).val(ujjatekosClickVal);
            if(nyomott[0] == "h"){
                $("input[data-source="+nyomott+"]").css({"background":"rgb(12, 184, 184)"});
            }
            else{
                $("input[data-source="+nyomott+"]").css({"background":"rgb(184, 75, 12)"});
            }
        }
        else{
            alert($(this).data("source"));
            alert( $(this).val());
        }
    }
});


// /* ***********************************   TERULETEK   ************************************ */

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

$(document).ready(function(){
    $(".blur").css("filter","blur(3px)");
    $(".choose").fadeIn(100);
});


