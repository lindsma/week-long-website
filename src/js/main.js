
var dogObject = (function() {

  function getPetfinder() {
      // petfinder user info
    var apiKey = '0832500a5ec7269caa8dc84a045e3995';
    var mdFive = '8bd6fd56b5645e676457ab9d8c952f4c'; // for pet.find
    var searchTerms = 'durham';
      // pet search request to petfinder
      $.ajax({
          'method': 'GET',
          'url': 'http://api.petfinder.com/pet.find?key=' + apiKey + '&location=' + searchTerms + '&breed=' + 'boxer' + '&sig=' + mdFive,
          'data': {},
          'dataType': 'jsonp',
          'headers': {
            'content-type': 'application/json'
          },
          'success': function(data) {
              console.log(data);
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

    //etsy
    function getEtsy() {
      var api_key = "qkz6z22t3gggikbdmjsx4x4k";
      var terms = 'bed';
      var etsyURL = 'https://openapi.etsy.com/v2/listings/active.js?keywords=dog ' + terms + '&limit=12&includes=Images:1&api_key=' + api_key;
        $.ajax({
            'method': 'GET',
            'url': etsyURL,
            'dataType': 'jsonp',
            'success': function(data) {
                console.log(data);
            },
            'error': this.handleError
        });
    }
  getEtsy();
  // getPetfinder();
})();
