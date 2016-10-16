var dogObject = (function() {
    // call petfinder API
    function getPetfinder() {
        // petfinder user info
        var apiKey = '0832500a5ec7269caa8dc84a045e3995';
        var mdFive = '8bd6fd56b5645e676457ab9d8c952f4c'; // for pet.find
        // var searchTerms = 'durham';
        // pet search request to petfinder
        $.ajax({
            'method': 'GET',
            'url': 'http://api.petfinder.com/pet.find?key=' + apiKey + '&format=json&location=durham%2C+nc&animal=dog&breed=boxer',
            'data': {},
            'dataType': 'jsonp',
            'contentType': 'application/json; charset=utf-8',
            'headers': {
                'content-type': 'application/json'
            },
            'success': function(data) {
                for (var index = 0; index < 12; index++) {
                    new etsyCards(data.results[index]);
                }
            },
            'error': this.handleError
        });
    }
    // update url hash
    function updateHash(hash) {
        window.location.hash = hash;
    }
    // handle errors
    function handleError(errorObject, textStatus, error) {
        $('#content').empty();
        console.log(errorObject);
        // populateErrors(errorObject.status);
    }
    // call etsy API
    function getEtsy(searchTerms) {
        var api_key = "qkz6z22t3gggikbdmjsx4x4k";
        var terms = 'toys';
        var etsyURL = 'https://openapi.etsy.com/v2/listings/active.js?keywords=dog ' + 'toys' + '&limit=12&includes=Images:1&api_key=' + api_key;
        // var etsyURL = 'https://openapi.etsy.com/v2/listings/active.js?keywords=dog ' + searchTerms + '&limit=12&includes=Images:1&api_key=' + api_key;
        $.ajax({
            'method': 'GET',
            'url': etsyURL,
            'dataType': 'jsonp',
            'success': function(data) {
                var newData = data.results;
                for (var index = 0; index < 12; index++) {
                    new etsyCards(newData[index]);
                }
            },
            'error': this.handleError
        });
    }
    // search result card constructor and category-template creation
    function etsyCards(searchObject) {
        this.info = {
            image: searchObject.Images[0].url_570xN,
            title: searchObject.title,
            url: searchObject.url,
            price: searchObject.price,
            descriptionSplit: searchObject.description.split('.')[0],
            // description: this.info.descriptionSplit[0]
        };
        this.createCards = function() {
            var source = $('#category-template').html();
            var template = Handlebars.compile(source);
            var context = this.info;
            var html = template(context);
            $(html).prependTo('.handlebar');
            var category = $('.menu').attr('id');
            $('.hero').addClass(category);
        };
        this.createCards();
    }
    // set background image
    // function setBackground(page) {
    //     console.log(page);
    //     if (page === 'home') {
    //         $('main').css({
    //             'background-image': 'url(../../images/' + page + '.jpg)',
    //             'background-size': 'cover'
    //         });
    //     } else {
    //         $('.content').empty();
    //         $('.hero').css({
    //             'background-image': 'url(../../images/' + page + '.jpg)',
    //             'background-size': 'cover'
    //         });
    //     }
    // }
    // populate handlebars
    function populateHandlebars(sourceId) {
        $('.center-container').remove();
        var source = $('#' + sourceId).html();
        var template = Handlebars.compile(source);
        var context = this.info;
        var html = template(context);
        $(html).insertBefore('.handlebar');
    }
    // initiate page and fill homepage with home-template
    function init() {
        $('main').on('click', '.menu', function(event) {
            $('main').removeClass('home');
            var searchTerms = $(this).attr('id');
            $('<section>').attr('class', 'hero ' + searchTerms).prependTo('main');
            $('.handlebar').empty();
            $('.center-container').remove();
            $('.navbar').addClass('active');
            getEtsy(searchTerms);
        });
        $('.icon').click(function(event) {
            $('main').addClass('home');
            $('.hero').remove();
            $('.handlebar').empty();
            $('.navbar').removeClass('active');
            populateHandlebars('home-template');
        });
        populateHandlebars('home-template');
    }

    // populateHandlebars('category-template');
    init();
    // getEtsy();
    // getPetfinder();
})();


// fix handlebars swapping in correct background-color

// adoption handlebars

// error handlebars

// loading handlebars
