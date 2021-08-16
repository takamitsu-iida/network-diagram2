/* global cytoscape, iida */

(function () {
  iida.minicy = function (container) {
    var _container = container;
    var _data;

    var _cy = cytoscape({
      container: _container,
      minZoom: 0.1,
      maxZoom: 3,
      wheelSensitivity: 0.1,
      boxSelectionEnabled: true,
      autounselectify: false, // true if all nodes are unselectable
      selectionType: 'single', // "single" or "additive",
      layout: {name: 'preset'},
      elements: [],
      style: [
        {
          selector: 'node',
          style: {
            'border-color': '#000',
            'border-width': 1,
            shape: 'rectangle',
            'background-color': '#ffffff',
            label: 'data(id)',
            // width: 'data(width)',
            // height: 'data(height)',
            'font-size': 12,
            'text-wrap': 'wrap',
            'text-valign': 'center',
            'text-halign': 'center',
          },
        },
      ],
    });

    function exports() {}

    exports.call = function () {
      _cy.elements().removeAllListeners();
      _cy.elements().remove();
      _cy.reset();

      var callback = arguments[0];
      arguments[0] = this;
      callback.apply(null, arguments);
      return this;
    };

    exports.datum = function (_) {
      if (!arguments.length) {
        return _data;
      }
      _data = _;
      return this;
    };

    exports.container = function (_) {
      if (!arguments.length) {
        return _container;
      }
      _container = _;
      return this;
    };

    exports.cy = function (_) {
      if (!arguments.length) {
        return _cy;
      }
      _cy = _;
      return this;
    };

    return exports;
  };
})();
