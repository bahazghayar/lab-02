'use strict';

$.ajax('./data/page-1.json')
    .then(data => {
        data.forEach(element => {
            let newImage = new TemplateImages(element);
            let render = newImage.render();
            $('main').append(render);
            if (!allKeyword.includes(element.keyword)) {
                allKeyword.push(element.keyword);
            }

        });
        select();

    });

let allImg2 = [];
$.ajax('./data/page-2.json')
    .then(data => {
        data.forEach(element => {
            let newImage = new TemplateImages(element);
            allImg2.push(newImage)
            if (allImg.includes(newImage)) {
                allImg.pop(newImage);
            }
            if (!allKeyword2.includes(element.keyword)) {
                allKeyword2.push(element.keyword);
            }
        });

    });



let allKeyword2 = [];
let allImg = [];
let allKeyword = [];
function TemplateImages(value) {
    this.title = value.title;
    this.image_url = value.image_url;
    this.description = value.description;
    this.keyword = value.keyword;
    this.horns = value.horns;
    allImg.push(this);
}

TemplateImages.prototype.render = function () {
    let template = $('#imagesTem').html();
    let newObj = Mustache.render(template, this);
    return newObj;
};

function select() {
    $('#select').children().not(':first-child').remove();
    allKeyword.forEach(each => {

        $('#select').append(`<option> ${each}</option>`);
    });
}

function select2() {
    $('#select').children().not(':first-child').remove();
    allKeyword2.forEach(each => {

        $('#select').append(`<option> ${each}</option>`);

    });
}


function sort() {
    $('#sort').append('<option> title </option>');
    $('#sort').append('<option> horns </option>');

}
sort();

$('#select').on('change', function () {
    $('main').html('');
    allImg.forEach(item => {
        if (item.keyword == $('#select').val()) {

            let newImage = new TemplateImages(item);
            let render = newImage.render();
            if (allImg.includes(newImage)) {
                allImg.pop(newImage);
            }

            $('main').append(render);

        }
    })

})



$('#page1').on('click', function () {
    $('main').html('');
    allImg2 = [];
    allImg.forEach(item => {
        let newImage = new TemplateImages(item);
        let render = newImage.render();
        $('main').append(render);
        if (allImg.includes(newImage)) {
            allImg.pop(newImage);
        }

    })

    $('#select').on('change', function () {
        $('main').html('');
        allImg.forEach(item => {
            if (item.keyword == $('#select').val()) {

                let newImage = new TemplateImages(item);
                let render = newImage.render();
                if (allImg.includes(newImage)) {
                    allImg.pop(newImage);
                }
                if (allImg2.includes(newImage)) {
                    allImg2.pop(newImage);
                }

                $('main').append(render);

            }
        })

    })
    select();
})

$('#page2').on('click', function () {

    $('main').html('');
    allImg2.forEach(item => {
        let newImage = new TemplateImages(item);
        let render = newImage.render();
        $('main').append(render);
        if (allImg.includes(newImage)) {
            allImg.pop(newImage);
        }

    })
    $('#select').on('change', function () {
        $('main').html('');
        allImg2.forEach(item => {
            if (item.keyword == $('#select').val()) {

                let newImage = new TemplateImages(item);
                let render = newImage.render();
                if (allImg2.includes(newImage)) {
                    allImg2.pop(newImage);
                }

                $('main').append(render);

            }
        })
    })
    select2();
    $('#sort').on('change', function () {
        if ($('#sort').val() == 'title') {
            allImg2.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
            $('main').html('');
            allImg2.forEach((item) => {
                console.log(item);
                let render = item.render();

                $('main').append(render);
            });
        } else if ($('#sort').val() == 'horns') {
            allImg2.sort((a, b) => {
                return a.horns - b.horns;
            });

            $('main').html('');
            allImg2.forEach((e) => {
                let render = e.render();
                $('main').append(render);
            });
        }
    })
})

$('#sort').on('change', function () {
    if ($('#sort').val() == 'title') {
        allImg.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        $('main').html('');
        allImg.forEach((item) => {
            let render = item.render();
            $('main').append(render);
        });
    } else if ($('#sort').val() == 'horns') {
        allImg.sort((a, b) => {
            return a.horns - b.horns;
        });

        $('main').html('');
        allImg.forEach((e) => {
            let render = e.render();
            $('main').append(render);
        });
    }
})