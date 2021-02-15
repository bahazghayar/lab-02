'use strict';

$.ajax('./data/page-1.json')
.then(data => {
        data.forEach((item) => {

            let image = new Images(item);   
            
            image.render();

            if (!allKeywords.includes(item.keyword)){
                allKeywords.push(item.keyword) ;
            }
             
        });
        select();
        imageClone.removeAttr('id');

       
});

let allKeywords = [] ; 
let allImages = [] ; 

function Images(value) {
    this.title = value.title;
    this.image_url = value.image_url;
    this.description = value.description;
    this.keyword = value.keyword;
    this.horns = value.horns;

    allImages.push(this) ;
}

Images.prototype.render = function () {

    let imageClone = $('#photo-template').clone();
    imageClone.removeAttr('id') ; 
    imageClone.find('h2').text(this.title);
    imageClone.find('img').attr('src', this.image_url);
    imageClone.find('p').text(this.description);

    $('main').append(imageClone);

} 


function select() {
    allKeywords.forEach(k =>{

        $('select').append(`<option>${k}</option>`) ; 
    }) 
      
}

$('select').on('change',function(){
    
    $('main').html('<div id="photo-template"> <h2></h2> <img src="" alt=""> <p></p></div>') ;

  let choice =  $('select').val() ; 
   
  allImages.forEach(object =>{
      
    if (object.keyword === choice){
       
        let newObject = new Images(object) ; 
        newObject.render() ; 
          
    }


  })
})