var dogObject = {

    // petfinder user info
    user: {
        'apiKey': '4f01f039570c23dcada9bb6dc86bda5b',
        'shaOne': '40e0a964a8d4d5d5e1faf45c85c36a92c283d0f8',
        'mdFive': '69c82dba5c426946f2f827d9197ddb97',
        'token': null


    },

    createSession: function() {
        // request access token
        $.ajax({
            'method': 'GET',
            'url': 'https://api.petfinder.com/auth.getToken?key=' + this.user.apiKey + '&sig=' + this.user.shaOne,
            'data': {},
            'crossDomain': true,
            'datatype': 'jsonp',
            'headers': {
              'content-type': 'application/json'
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
