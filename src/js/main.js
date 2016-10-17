var dogObject = (function() {
    // call petfinder API
    function getPetfinder() {
        // petfinder user info
        var apiKey = '0832500a5ec7269caa8dc84a045e3995';
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
                var newData = data.petfinder.pets.pet;
                for (var index = 0; index < 12; index++) {
                    console.log(newData);
                    new adoptionCards(newData[index]);
                }
            },
            'error': handleError
        });
    }
    // call etsy API
    function getEtsy(searchTerms) {
        var api_key = "qkz6z22t3gggikbdmjsx4x4k";
        var terms = searchTerms;
        var etsyURL = 'https://openapi.etsy.com/v2/listings/active.js?category=pets&tags=dog&keywords=dog  ' + searchTerms + '&limit=12&includes=Images:1&api_key=' + api_key;
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
            'error': handleError
        });
    }
    // search result card constructor and category-template creation
    function etsyCards(searchObject) {
        this.info = {
            image: searchObject.Images[0].url_570xN,
            title: searchObject.title,
            url: searchObject.url,
            price: searchObject.price,
        };
        this.createCards = function() {
            var source = $('#category-template').html();
            var template = Handlebars.compile(source);
            var context = this.info;
            var html = template(context);
            $('.handlebar').prepend(html).fadeIn();
            var category = $('.menu').attr('id');
            $('.hero').addClass(category);
            $('.handlebar').addClass('active');
        };
        this.createCards();
    }
    // search result card constructor and category-template creation
    function adoptionCards(searchObject) {
        this.info = {
            image: searchObject.media.photos.photo[3].$t,
            name: searchObject.name.$t,
            age: searchObject.age.$t,
            breed: searchObject.breeds.breed.$t,
            url: 'https://www.petfinder.com/petdetail/' + searchObject.id.$t
        };
        this.createCards = function() {
            var source = $('#adopt-template').html();
            var template = Handlebars.compile(source);
            var context = this.info;
            var html = template(context);
            $('.handlebar').prepend(html).fadeIn();
            $('.hero').addClass('adopt');
            $('.handlebar').addClass('active');
        };
        this.createCards();
    }
    // populate handlebars
    function populateHandlebars(sourceId) {
        $('.center-container').remove();
        var source = $('#' + sourceId).html();
        var template = Handlebars.compile(source);
        var context = this.info;
        var html = template(context);
        $(html).insertBefore('.handlebar');
    }
    // populate error handlebars template
    function populateErrors(errorObject) {
        console.log('hi');
        var source = $('#error-template').html();
        var template = Handlebars.compile(source);
        var context = {
            errorType: errorObject,
        };
        var html = template(context);
        $(html).insertBefore('.handlebar');
    }
    // update url hash
    function updateHash(hash) {
        window.location.hash = hash;
    }
    // handle errors
    function handleError(errorObject, textStatus, error) {
        $('.handlebar').empty();
        $('a').removeClass('active');
        $('.center-container, .hero').remove();
        populateErrors(errorObject.status);
    }
    // initiate page and fill homepage with home-template
    function init() {
        populateHandlebars('home-template');

        // if (window.location.hash.length > 0) {
        //   switch (hash) {
        //     case '#home':
        //     $('#top').empty();
        //     updateHash('home');
        //   }
        // }
        $('main').on('click', '.menu', function(event) {
            event.preventDefault();
            $('a').removeClass('active');
            $('main').removeClass('home');
            var searchTerms = $(this).attr('id');
            $('<section>').attr('class', 'hero ' + searchTerms).prependTo('main');
            $('.handlebar').empty();
            $('.center-container').remove();
            $('.navbar, a.' + searchTerms).addClass('active');
            updateHash(searchTerms);
            getEtsy(searchTerms);
        });
        $('nav').on('click', '.nav-item', function(event) {
            event.preventDefault();
            $('a').removeClass('active');
            $('main').removeClass('home');
            $(this).children().addClass('active');
            var searchTerms = $(this).text();
            var page = searchTerms.toLowerCase();
            $('.hero').remove();
            $('.handlebar').empty();
            $('.center-container').remove();
            $('<section>').attr('class', 'hero ' + page).prependTo('main');
            updateHash(page);
            getEtsy(page);
        });
        $('main').on('click', '#adopt, .nav-item-adopt', function(event) {
            event.preventDefault();
            $('a').removeClass('active');
            $('main').removeClass('home');
            $('<section>').attr('class', 'hero adopt').prependTo('main');
            $('.handlebar').empty();
            $('.center-container').remove();
            $('.navbar, a.adopt').addClass('active');
            updateHash('adopt');
            getPetfinder();
        });
        $('.icon').click(function(event) {
            event.preventDefault();
            $('main').addClass('home');
            $('.hero').remove();
            $('.handlebar').empty().removeClass('active');
            $('.navbar').removeClass('active');
            populateHandlebars('home-template');
        });
    }
    init();
})();

// loading handlebars
