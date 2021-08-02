/* global iida */

// define namespace iida
(function () {
    // the `this` means global
    // the `iida` is a object defined here
    this.iida = this.iida || (function () {
        return {};
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


// define iida.appdata global variables
(function () {
    iida.appdata = iida.appdata || {
        'physical_routers': [],  // original data of routers
        'physical_edges': [],  // original data of edges
        'physical_elements': {},  // calculated elements for cytoscape.js

        'logical_routers': [],
        'logical_edges':  [],
        'logical_elements': {},

        'get_elements': function () {
            return iida.appdata.physical_elements;
        }
    };
})();
