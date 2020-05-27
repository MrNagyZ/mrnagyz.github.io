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
$('.homewhistle').click(() => {
    hfc++;
    $("#hfc").text(hfc);
})
$('.awaywhistle').click(() => {
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