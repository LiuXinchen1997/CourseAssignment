'use strict';

var myAxios = (function() {
    var originalAxios = axios;
    
    // 定义新的axios
    return function(options) {
      if ( options.params ) {
        const paramKeys = Object.keys(options.params);
        paramKeys.forEach(function(paramKey) {
          const placeholder = ':' + paramKey;
          options.url = options.url.split(placeholder).join(options.params[paramKey]);
        });

        delete options.params;
      }

      if ( options.query ) {
        options.params = options.query;
        delete options.query;
      }

      return originalAxios(options);
    }
})();

axios = myAxios;

// axios({
//    method: 'get',
//    url: '/user/:userId',
//    params: {
//        userId: '593362768e7ed9900ddec04a'
//    },
//    query: {
//        test: 'abc'
//    }
// })
// .then(function (response) {
//    console.log(response);
// })
// .catch(function (error) {
//    console.log(error);
// });
