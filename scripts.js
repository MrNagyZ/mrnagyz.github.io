let photodata = [
  {
    photo: './img/1.jpg',
    title: 'FINAL 4_1',
    leiras: 'Ez egy refernciafotó: 1'
  },
  {
    photo: './img/2.jpg',
    title: 'FINAL 4_2',
    leiras: 'Ez egy refernciafotó: 2'
  },
  {
    photo: './img/3.jpg',
    title: 'FINAL 4_3',
    leiras: 'Ez egy refernciafotó: 3'
  },
  {
    photo: './img/4.jpg',
    title: 'FINAL 4_4',
    leiras: 'Ez egy refernciafotó: 4'
  },
  {
    photo: './img/5.jpg',
    title: 'FINAL 4_5',
    leiras: 'Ez egy refernciafotó: 5'
}];
let kepekSzama = 5;
let ID = 0;
let kiskepID = [
  '#0', '#1', '#2', '#3', '#4'
]

for (let i = 0; i < kepekSzama; i++){
  $('#' + i).attr('src', photodata[i].photo);
}

let loadPhoto = (ID) => {
  $('#nagykep').attr('src', photodata[ID].photo);
  $('#cim').text(photodata[ID].title);
  $('#leiras').text(photodata[ID].leiras);
  for (let i = 0; i < kepekSzama; i++) {
    $('#' + i).css({
     "max-width":"80px" , "max-height" : "45px"
    }); 
  }

  $('#' + ID).css({
    "max-width":"100px" , "max-height" : "60px"
  });
}

loadPhoto(ID);

$('#jobb').click(() => {
  ID++;
  if (ID === kepekSzama) {
    ID = 0;
  }
  loadPhoto(ID);
});

$('#bal').click(() => {
  ID--;
  if (ID === -1) {
    ID = kepekSzama-1;
  }
  loadPhoto(ID);
})

$('.kiskep').mouseenter(function(){
  $(this).css({
   "box-shadow":"0 0 2px 1px rgba(0, 140, 186, 0.5)"
  }); 
  $('#h'+$(this).attr("id")).text(photodata[$(this).attr("id")].title)
  $('#h'+$(this).attr("id")).css({
    "display":"block"
  });
})
$('.kiskep').mouseleave(function() {
  $( this ).css({
    "box-shadow":"0px 13px 10px -10px"
  });
  $('#h'+$(this).attr("id")).css({
    "display":"none"
  })
});
$(".kiskep").click(function (e) {
    loadPhoto(e.target.id);
    ID = $(this).attr("id");
});
