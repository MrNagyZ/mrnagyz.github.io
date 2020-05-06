let photodata = [
    {
    photo: './img/1.jpg',
    title: 'FINAL 4',
    leiras: 'Ez egy rendezvéyfotó 1'
},
{
    photo: './img/2.jpg',
    title: 'FINAL 4',
    leiras: 'Ez egy rendezvéyfotó 2'
},
{
    photo: './img/3.jpg',
    title: 'FINAL 4',
    leiras: 'Ez egy rendezvéyfotó 3'
}];
let ID = 0;
$('#nagykep').attr('src', photodata[ID].photo);
$('#cim').text(photodata[ID].title);
$('#leiras').text(photodata[ID].leiras);