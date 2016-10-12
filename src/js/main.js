var dogObject = {

    // // petfinder user info
    // user: {
    //     'apiKey': '0832500a5ec7269caa8dc84a045e3995',
    //     'mdFive': '8bd6fd56b5645e676457ab9d8c952f4c' // for pet.find
    // },
    //
    // getDogInfo: function() {
    //     // pet search request to petfinder
    //     $.ajax({
    //         'method': 'GET',
    //         'url': 'http://api.petfinder.com/my.method?key=' + this.user.apiKey + '&arg1=pet.find&sig=' + this.user.mdFive,
    //         'data': {},
    //         'datatype': 'json',
    //         'headers': {
    //           'content-type': 'application/json'
    //         },
    //         'success': function(data) {
    //             console.log(data);
    //         },
    //         'error': this.handleError
    //     });
    // },


    //Twitter

    user: {
        'apiKey': 'dq1zLTQysQzSHYIJKHrSa8fQh',
        'encode': 'ZHExekxUUXlzUXpTSFlJSktIclNhOGZRaDpUTzFLcFE0d1ZDRzUxeFVwWEY0cW9yVkxmNFVpMGJKWElIZ255VFQ0VHBXNGJuUjN4aw==', // for Twitter
        'token': null
    },

    getHashtagResults: function() {
        // pet search request to petfinder
        $.ajax({
            'method': 'GET',
            'url': 'https://api.twitter.com/1.1/search/tweets.json?q=%23' + 'dog',
            'data': {},
            'datatype': 'jsonp',
            'success': function(data) {
                console.log(data);
            },
            'error': this.handleError
        });
    },


    // $.get('http://api.petfinder.com/auth.getToken?key=' + this.user.apiKey + '&sig=' + this.user.shaOne).then(function(response){
    //   console.log(response);
    // });
    // },

    // update url hash

    updateHash: function(hash) {
        window.location.hash = hash;
    },

    // handle errors

    handleError: function(errorObject, textStatus, error) {
        $('#content').empty();
        console.log(errorObject);
        // populateErrors(errorObject.status);
    },

};

dogObject.getHashtagResults();
