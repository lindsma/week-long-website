var dogObject = (function() {
    // call petfinder API
    // function getPetfinder() {
    //     // petfinder user info
    //     var apiKey = '0832500a5ec7269caa8dc84a045e3995';
    //     var mdFive = '8bd6fd56b5645e676457ab9d8c952f4c'; // for pet.find
    //     var searchTerms = 'durham';
    //     // pet search request to petfinder
    //
    //     $.ajax({
    //         'method': 'GET',
    //         'url': 'http://api.petfinder.com/pet.find?key=0832500a5ec7269caa8dc84a045e3995&sig=' + 'd23a1300a284873c32f5149abf1e4d67',
    //         'data': {},
    //         'dataType': 'jsonp',
    //         'contentType': 'application/json; charset=utf-8',
    //         'headers': {
    //             'content-type': 'application/json'
    //         },
    //         'success': function(data) {
    //
    //           // console.log(data);
    //             for (var index = 0; index < 12; index++) {
    //                 new etsyCards(data.results[index]);
    //             }
    //         },
    //         'error': this.handleError
    //     });
    // }
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
        var etsyURL = 'https://openapi.etsy.com/v2/listings/active.js?keywords=dog ' + 'toys' + '&limit=12&includes=Images:1&api_key=' + api_key;
        // var etsyURL = 'https://openapi.etsy.com/v2/listings/active.js?keywords=dog ' + searchTerms + '&limit=12&includes=Images:1&api_key=' + api_key;
        $.ajax({
            'method': 'GET',
            'url': etsyURL,
            'dataType': 'jsonp',
            'success': function(data) {
                var newData = data.results;
                for (var index = 0; index < 12; index++) {
                    new etsyCards(newData[0]);
                }
                // populateHandlebars(searchTerms);
            },
            'error': this.handleError
        });
    }
    // search result card constructor
    function etsyCards(searchObject) {
        this.info = {
            image: searchObject.Images[0].url_570xN,
            title: searchObject.title,
            etsyUrl: searchObject.url,
            price: searchObject.price,
            description: searchObject.description
        };
        console.log(this.info.image);
    }

    // set background image
    function setBackground(page) {
        if (page === 'home') {
            $('main').css({
                'background-image': 'url(../../images/' + page + '.jpg)',
                'background-size': 'cover'
            });
        } else {
            $('.hero').css({
                'background-image': 'url(../../images/' + page + '.jpg)',
                'background-size': 'cover'
            });
        }
    }
    // populate handlebars
    function populateHandlebars(sourceId) {
        var source = $('#' + sourceId).html();
        var template = Handlebars.compile(source);
        var context = this.info;
        var html = template(context);
        $(html).prependTo('main');
    }
    // initiate page and fill homepage with home-template
    function init() {
        $('main').on('click', '.menu', function(event) {
            var searchTerms = $(this).attr('id');
            $('.content').empty();
            // this.getEtsy(searchTerms);
            populateHandlebars('category-template', searchTerms);
        });
        $('.icon').click(function(event) {
            $('.content').empty();
            populateHandlebars('home-template', 'home');
        });
        populateHandlebars('home-template', 'home');
    }

    populateHandlebars('category-template', 'toys');
    // init();
    getEtsy();
    // getPetfinder();
})();
