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
let loadPhoto = (ID) => {
$('#nagykep').attr('src', photodata[ID].photo);
$('#cim').text(photodata[ID].title);
$('#leiras').text(photodata[ID].leiras);
  }

  loadPhoto(ID);

  $('#jobb').click(() => {
    ID++;
    if (ID === 3) {
        ID = 0;
    }

    loadPhoto(ID);
  })
  $('#bal').click(() => {
    ID--;
    if (ID === -1) {
        ID = 2;
    }
    loadPhoto(ID);
  })

 