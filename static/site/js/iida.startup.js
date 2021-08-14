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
    DEFAULT_ROUTER_HEIGHT: 130,
    DEFAULT_ROUTER_WIDTH: 210, // 130*1.61 golden ratio
    DEFAULT_PORT_HEIGHT: 25,
    DEFAULT_PORT_WIDTH: 60, // 25*2.41 silver ratio

    // see iida.appdata.routers_xxx.js
    routers: [], // data of routers and ports
    edges: [], // data of edges
    bundleEthers: [], // data of bundleEther

    // see iida.elements.js
    routerIds: [], // list of router id
    elements: {}, // cytoscape.js eles
    topologyElements: {}, // cytoscape.js eles
  };

  // see iida.cystyles.js
  iida.styles = iida.styles || {};

  // see iida.cylayouts.js
  iida.layouts = iida.layouts || {};

  // see iida.nwdiagram.js
  iida.main = function () {
    // load data from network
    /*
    Promise.all([
      fetch("static/json/elements.json", { mode: "no-cors" }).then(function (
        res
      ) {
        return res.json();
      }),
      fetch("static/json/styles.json", { mode: "no-cors" }).then(function (
        res
      ) {
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
