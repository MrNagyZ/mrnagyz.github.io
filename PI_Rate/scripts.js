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

let home = 2;
let home_c;

let main_start_time = 0;
let main_end_time = 0;
let main_full_time = 0;
let temp_home_time = 0;
let temp_away_time = 0;
let time_home = 0;
let time_away = 0;
let homepercent = 0;
let awaypercent = 0;


// $(function () {
//     $("input").click(function (e) {
//         // $(this).attr("id") = 1;
//         $("#hg").text(hg);
//         alert($(this).attr("id"));
//     });
// });

    function getdate()
    {
        var now = new Date();
        main_full_time = now - main_start_time;
        var totalSeconds = parseInt(main_full_time / 1000);
        var m = parseInt(totalSeconds / 60);
        var s = totalSeconds % 60;
        if(s<10){s = "0"+s;}
        if(m<10){m = "0"+m;}
        $("#time").text(m+" : "+s);

        setTimeout(function(){getdate()}, 500);
    }
     
 
    $('#start').click(function(){
        if (home != 2) {
            main_start_time = new Date();
            if (Boolean(home)) {
                temp_home_time = main_start_time;
            } else {
                temp_away_time = main_start_time;
            }
            getdate();
        }
    });
 
    $('#homegrass').click(function(){
        $('#homegrass').css({
            "border":"2px solid rgb(20, 20, 19)"
        });
        $('#awaygrass').css({
            "border":"0px solid rgb(20, 20, 19)"
        });
        home = 1;
    });
    $('#awaygrass').click(function(){
        $('#awaygrass').css({
            "border":"2px solid rgb(20, 20, 19)"
        });
        $('#homegrass').css({
            "border":"0px solid rgb(20, 20, 19)"
        });
        home = 0;
    });

$('#homegrass').click(function(){
    if(Boolean(home) && Boolean (home_c))
    {
        if(main_full_time != 0)
        {
            temp_home_time = new Date();
            getdate();
            time_away = time_away + (temp_home_time - temp_away_time);
            var totalSeconds = parseInt(time_away / 1000);
            var minutes = parseInt(totalSeconds / 60);
            var seconds = totalSeconds % 60;
            if(seconds<10){seconds = "0"+seconds;}
            if(minutes<10){minutes = "0"+minutes;}
            $("#awaytime").text(minutes+" : "+seconds);
            awaypercent = (time_away / main_full_time * 100).toFixed(2);
            homepercent = (100 - awaypercent).toFixed(2);
            $("#awaypercent").text(" "+awaypercent+" %");
            $("#homepercent").text(" "+homepercent+" %");   
            home_c = 0;
        }
    }
});
$('#awaygrass').click(function(event){
    // event.preventDefault();
    if(!Boolean(home) && !Boolean(home_c))
    {
        if(main_start_time != 0)
        {
            temp_away_time = new Date();
            getdate();
            time_home = time_home + (temp_away_time - temp_home_time);
            var totalSeconds = parseInt(time_home / 1000);
            var minutes = parseInt(totalSeconds / 60);
            var seconds = totalSeconds % 60;
            if(seconds<10){seconds = "0"+seconds;}
            if(minutes<10){minutes = "0"+minutes;}
            $("#hometime").text(minutes+" : "+seconds);
            homepercent = (time_home / main_full_time * 100).toFixed(2);
            awaypercent = (100 - homepercent).toFixed(2);
            $("#homepercent").text(" "+homepercent+" %");     
            $("#awaypercent").text(" "+awaypercent+" %");       
            home_c = 1;           
        }
    }
});



$('.home.sog').click(() => {
    hsog++;
    $("#hsog").text(hsog);
})
$('.away.sog').click(() => {
    asog++;
    $("#asog").text(asog);
})
$('.home.post').click(() => {
    hsw++;
    $("#hsw").text(hsw);
})
$('.away.post').click(() => {
    asw++;
    $("#asw").text(asw);
})
$('.home.corner').click(() => {
    hc++;
    $("#hc").text(hc);
})
$('.away.corner').click(() => {
    ac++;
    $("#ac").text(ac);
})
$('.homeyellow').click(() => {
    hyc++;
    $("#hyc").text(hyc);
})
$('.awayyellow').click(() => {
    ayc++;
    $("#ayc").text(ayc);
})
$('.homered').click(() => {
    hrc++;
    $("#hrc").text(hrc);
})
$('.awayred').click(() => {
    arc++;
    $("#arc").text(arc);
})
$('.home.whistle').click(() => {
    hfc++;
    $("#hfc").text(hfc);
})
$('.away.whistle').click(() => {
    afc++;
    $("#afc").text(afc);
})
$('.homegoal').click(() => {
    hg++;
    $("#hg").text(hg);
})
$('.awaygoal').click(() => {
    ag++;
    $("#ag").text(ag);
})