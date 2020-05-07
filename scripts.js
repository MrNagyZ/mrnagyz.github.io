let photodata = [
    {
    photo: './img/1.jpg',
    title: 'FINAL 4',
    leiras: 'Ez egy refernciafotó: 1'
},
{
    photo: './img/2.jpg',
    title: 'FINAL 4',
    leiras: 'Ez egy refernciafotó: 2'
},
{
    photo: './img/3.jpg',
    title: 'FINAL 4',
    leiras: 'Ez egy refernciafotó: 3'
},
{
  photo: './img/4.jpg',
  title: 'FINAL 4',
  leiras: 'Ez egy refernciafotó: 4'
},
{
  photo: './img/5.jpg',
  title: 'FINAL 4',
  leiras: 'Ez egy refernciafotó: 5'
}];
let kepekSzama = 5;
let ID = 0;
let kiskepID = [
  '#0', '#1', '#2', '#3', '#4'
]

for (let i = 0; i < kepekSzama; i++){
  $(kiskepID[i]).attr('src', photodata[i].photo);
}

let loadPhoto = (ID) => {
  $('#nagykep').attr('src', photodata[ID].photo);
  $('#cim').text(photodata[ID].title);
  $('#leiras').text(photodata[ID].leiras);
  for (let i = 0; i < kepekSzama; i++) {
    $(kiskepID[i]).css({
      "max-width":"80px" , "max-height" : "45px"
      }); 
    }

$(kiskepID[ID]).css({
  "max-width":"90px" , "max-height" : "50px"});
  }

  loadPhoto(ID);

  $('#jobb').click(() => {
    ID++;
    if (ID === kepekSzama) {
        ID = 0;
    }

    loadPhoto(ID);
  })
  $('#bal').click(() => {
    ID--;
    if (ID === -1) {
        ID = kepekSzama-1;
    }
    loadPhoto(ID);
  })

//  $('.kiskep').hover(function(){
//    $(this).css({
//     "max-width":"90px" , "max-height":"50px"
//     }); 
//  })