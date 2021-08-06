/* global iida */

// define namespace iida
(function () {
    // the `this` means global
    // the `iida` is a object defined here
    this.iida = this.iida || (function () {
        return {};
    })();
})();


// define global variables

(function () {

    // see iida.appda.routers_xxx.js
    iida.appdata = iida.appdata || {
        'routers': [],  // data of routers and ports
        'edges': [],  // data of edges
        'bundle_ethers': [],  // data of bundleEther

        'elements': {},  // cytoscape.js eles
        'topology_elements': {},  // cytoscape.js eles
    };

    // see iida.styles.js
    iida.styles = iida.styles || {}

    // see iida.layouts.js
    iida.layouts = iida.layouts || {}

    // see iida.nwdiagram.js
    iida.main = function () {

        // HTMLの<script>タグで読まずにネットワーク経由でデータを取得する場合
        /*
        Promise.all([
          fetch('static/json/topology.json', { mode: 'no-cors' })
            .then(function (res) {
              return res.json()
            }),
          fetch('static/json/styles.json', { mode: 'no-cors' })
            .then(function (res) {
              return res.json()
            })
        ]).then(function (dataArray) {
          iida.appdata.topology = dataArray[0];
          iida.appdata.styles = dataArray[1];
        });
        */

        iida.nwdiagram();
    };
    //
})();
