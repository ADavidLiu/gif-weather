'use strict';



;define('weather-gifs/app', ['exports', 'weather-gifs/resolver', 'ember-load-initializers', 'weather-gifs/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
;define("weather-gifs/components/search-input", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        actions: {
            inputHandler() {
                const strLocation = this.get("location");
                this.updateLocation(strLocation);
            },
            enterHandler() {
                this.fetchData();
            }
        }
    });
});
;define("weather-gifs/components/search-result", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        strTranslatedWeather: "",
        arrTranslations: [{ Drizzle: "lloviznando 🌧️" }, { Rain: "lloviendo 🌧️" }, { Sunny: "soleado ☀️" }, { Clouds: "nuboso ☁️" }, { Fog: "con niebla 🌫️" }, { Mist: "con neblina 🌁" }, { Haze: "con neblina ligera 🌁" }, { Clear: "despejado ️️️☀️🌈" }, { Thunderstorm: "lloviendo fuerte con truenos ⛈️" }],
        didUpdateAttrs() {
            this.set("strTranslatedWeather", "");
            const arrTranslated = this.get("arrTranslations").filter(translation => {
                const arrKey = Object.keys(translation);
                return arrKey[0] === this.currentWeather;
            });
            if (arrTranslated[0] != null && arrTranslated[0] != undefined) {
                const strTranslation = Object.values(arrTranslated[0])[0];
                this.set("strTranslatedWeather", strTranslation);
            }
        }
    });
});
;define('weather-gifs/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define("weather-gifs/controllers/application", ["exports", "npm:axios"], function (exports, _npmAxios) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        strLocation: "",
        strWeather: "",
        strKeyWeather: "0b064246645089d67497e504ae480f50",
        strEndpointWeather: "http://api.openweathermap.org/data/2.5/weather?q=",
        strUrlGif: "",
        strKeyGif: "JAO0qgUKKSVSJrdrOHmMifK4Eqv1fV6g",
        strEndpointGif: "http://api.giphy.com/v1/gifs/search?q=",
        strActiveClass: "",
        actions: {
            resetInfo() {
                this.set("strActiveClass", "");
                this.set("strWeather", "");
                const timeout = setTimeout(() => {
                    this.set("strUrlGif", "");
                    clearTimeout(timeout);
                }, 500);
            },
            updateLocation(strNewLocation) {
                this.set("strLocation", strNewLocation);
                this.send("resetInfo");
            },
            fetchData() {
                _npmAxios.default.get(`${this.get("strEndpointWeather")}${this.get("strLocation")}&APPID=${this.get("strKeyWeather")}`).then(res => {
                    const strCurrentWeather = res.data.weather[0].main;
                    this.set("strWeather", strCurrentWeather);
                    console.log(strCurrentWeather);

                    _npmAxios.default.get(`${this.get("strEndpointGif")}${this.get("strWeather")}&api_key=${this.get("strKeyGif")}`).then(res => {
                        const arrImgs = res.data.data;
                        const arrIds = arrImgs.map(img => {
                            return img.id;
                        });
                        const strId = arrIds[Math.floor(Math.random() * arrIds.length)];
                        const strFormattedUrl = `https://media.giphy.com/media/${strId}/giphy.gif`;
                        this.set("strUrlGif", strFormattedUrl);
                        const timeout = setTimeout(() => {
                            this.set("strActiveClass", "search--active");
                            clearTimeout(timeout);
                        }, 1000);
                    }).catch(err => {
                        console.log(err);
                    });
                }).catch(err => {
                    console.log(err);
                    this.set("strActiveClass", "search--error shake");
                });
            }
        }
    });
});
;define('weather-gifs/helpers/app-version', ['exports', 'weather-gifs/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
;define('weather-gifs/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
;define('weather-gifs/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
;define('weather-gifs/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'weather-gifs/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define('weather-gifs/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define('weather-gifs/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
;define('weather-gifs/initializers/export-application-global', ['exports', 'weather-gifs/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
;define('weather-gifs/instance-initializers/ember-data', ['exports', 'ember-data/initialize-store-service'], function (exports, _initializeStoreService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
});
;define('weather-gifs/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
;define('weather-gifs/router', ['exports', 'weather-gifs/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {});

  exports.default = Router;
});
;define('weather-gifs/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("weather-gifs/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GWrfbDov", "block": "{\"symbols\":[],\"statements\":[[7,\"main\"],[9],[0,\"\\n    \"],[7,\"div\"],[12,\"class\",[28,[\"search animated \",[21,\"strActiveClass\"]]]],[9],[0,\"\\n        \"],[1,[27,\"search-input\",null,[[\"fetchData\",\"updateLocation\"],[[27,\"action\",[[22,0,[]],\"fetchData\"],null],[27,\"action\",[[22,0,[]],\"updateLocation\"],null]]]],false],[0,\"\\n        \"],[1,[27,\"search-result\",null,[[\"strUrlGif\",\"currentWeather\",\"currentLocation\"],[[23,[\"strUrlGif\"]],[23,[\"strWeather\"]],[23,[\"strLocation\"]]]]],false],[0,\"\\n    \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"footer\"],[11,\"class\",\"footer\"],[9],[0,\"\\n    \"],[7,\"p\"],[9],[0,\"Desarrollado con ☕ por \"],[7,\"a\"],[11,\"href\",\"http://andresliu.xyz\"],[11,\"target\",\"_blank\"],[9],[0,\"Andrés Liu\"],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[1,[21,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "weather-gifs/templates/application.hbs" } });
});
;define("weather-gifs/templates/components/search-input", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "AJLeTYqL", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"search__input-wrapper\"],[9],[0,\"\\n    \"],[1,[27,\"input\",null,[[\"value\",\"enter\",\"input\",\"placeholder\",\"class\"],[[23,[\"location\"]],[27,\"action\",[[22,0,[]],\"enterHandler\"],null],[27,\"action\",[[22,0,[]],\"inputHandler\"],null],\"Buscar ciudad...\",\"search__input\"]]],false],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "weather-gifs/templates/components/search-input.hbs" } });
});
;define("weather-gifs/templates/components/search-result", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YP397NjF", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[12,\"class\",[28,[\"search__result \",[21,\"strVisibilityClass\"]]]],[9],[0,\"\\n    \"],[7,\"img\"],[12,\"src\",[21,\"strUrlGif\"]],[11,\"alt\",\"Imagen del clima\"],[11,\"class\",\"search__result-img\"],[9],[10],[0,\"\\n    \"],[7,\"h1\"],[11,\"class\",\"search__result-message\"],[9],[0,\"En \"],[7,\"span\"],[11,\"class\",\"search__result-message-location\"],[9],[1,[21,\"currentLocation\"],false],[10],[0,\" está \"],[7,\"div\"],[11,\"class\",\"search__result-message-weather\"],[9],[1,[21,\"strTranslatedWeather\"],false],[10],[10],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "weather-gifs/templates/components/search-result.hbs" } });
});
;

;define('weather-gifs/config/environment', [], function() {
  var prefix = 'weather-gifs';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("weather-gifs/app")["default"].create({"name":"weather-gifs","version":"0.0.0+1cd8964f"});
          }
        
//# sourceMappingURL=weather-gifs.map
