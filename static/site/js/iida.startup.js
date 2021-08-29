/* global iida */

// define namespace iida
(function () {
  // the `this` means global
  // the `iida` is a object defined here
  this.iida = this.iida || {};
})();

// define global variables
(function () {
  iida.appdata = iida.appdata || {
    DEFAULT_ROUTER_HEIGHT: 100,
    DEFAULT_ROUTER_WIDTH: 161, // 100*1.61 golden ratio
    DEFAULT_PORT_HEIGHT: 20,
    DEFAULT_PORT_WIDTH: 48, // 25*2.41 silver ratio

    // see iida.appdata.routers_xxx.js
    routers: [],
    edges: [],
    bundleEthers: [],

    // see iida.elements.js
    elements: {},
  };

  // see iida.models.xxx.js
  iida.models = iida.models || {};

  // see iida.cystyles.js
  iida.styles = iida.styles || {};

  // see iida.cylayouts.js
  iida.layouts = iida.layouts || {};

  // see iida.nwdiagram.js
  iida.main = function () {
    /*
    // load data from network
    Promise.all([
      fetch('static/json/elements.json', { mode: 'no-cors' }).then(function (res) {
        return res.json();
      }),
      fetch('static/json/styles.json', { mode: 'no-cors' }).then(function (res) {
        return res.json();
      }),
    ]).then(function (dataArray) {
      iida.appdata.elements = dataArray[0];
      iida.appdata.styles = dataArray[1];
    });
    */
    iida.nwdiagram();
  };
})();
