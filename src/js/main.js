var dogObject = {

    // petfinder user info
    user: {
        'apiKey': '0832500a5ec7269caa8dc84a045e3995',
        'mdFive': '34400da3787610ce6197b06beaab3909',
        'token': null
    },

    createSession: function() {
        // request access token
        $.ajax({
            'method': 'GET',
            'url': 'https://api.petfinder.com/auth.getToken?key=' + this.user.apiKey + '&sig=' + this.user.mdFive,
            'data': {},
            'crossDomain': true,
            'datatype': 'jsonp',
            'headers': {
              'content-type': 'application/json',
              'Access-Control-Allow-Credentials': true,
            },
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

    // search dog in petfinder API

    getDogInfo: function() {
        $.ajax({
            'method': 'GET',
            'url': 'http://api.petfinder.com/my.method?key=' + user.apiKey + '&arg1=pet.find&token=' + 'token,sig',
            'data': {},
            'crossDomain': true,
            'datatype': 'jsonp',
            'success': function(data) {
                console.log(data);
            },
            'error': handleError
        });
    },

    // handle errors

    handleError: function(errorObject, textStatus, error) {
        $('#content').empty();
        console.log(errorObject);
        // populateErrors(errorObject.status);
    },

};

dogObject.createSession();
