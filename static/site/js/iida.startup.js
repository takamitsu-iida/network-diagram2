/* global iida */

// define namespace iida
(function () {
  // the `this` means global
  // the `iida` is a object defined here
  this.iida = this.iida || (function () {

    // network diagram data should be here
    var appdata = {};

    appdata.current = "";  // "logical" or "physical", last read data overwrite this
    appdata.physical_routers = [];  // original data
    appdata.physical_elements = [];  // calculated elements for cytoscape.js
    appdata.logical_routers = [];  // original data
    appdata.logical_elements = [];  // calculated elements for cytoscape.js
    appdata.get_elements = function () {
      if (iida.appdata.current === "physical") {
        return iida.appdata.physical_elements;
      }
      if (iida.appdata.current === "logical") {
        return iida.appdata.logical_elements;
      }
    };

    return {
      'appdata': appdata
    };

  })();
})();


// define iida.main function
(function () {
  iida.main = function () {

    // HTMLの<script>タグで読まずにネットワーク経由でデータを取得する場合
    /*
    Promise.all([
      fetch('static/json/topology.json', { mode: 'no-cors' })
        .then(function (res) {
          return res.json()
        }),
      fetch('static/json/style.json', { mode: 'no-cors' })
        .then(function (res) {
          return res.json()
        })
    ]).then(function (dataArray) {
      iida.appdata.topology = dataArray[0];
      iida.appdata.style = dataArray[1];
    });
    */

    // see iida.nwdiagram.js
    iida.nwdiagram();

  };
})();
