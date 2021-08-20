/* global cytoscape, iida */

(function () {
  iida.cySlide = function (dom) {
    var container = dom;

    var onContainerDiv = document.createElement('div');
    onContainerDiv.style['position'] = 'absolute';
    onContainerDiv.style['top'] = 0;
    onContainerDiv.style['right'] = 0;
    onContainerDiv.style['z-index'] = 20;
    var closeButton = document.createElement('input');
    closeButton.type = 'button';
    closeButton.value = 'Close';
    closeButton.addEventListener('click', function () {
      container.style.visibility = 'hidden';
    });
    onContainerDiv.appendChild(closeButton);
    container.appendChild(onContainerDiv);

    var elements = [];
    var filters = [];

    var styleOption = [
      {
        selector: 'node',
        style: {
          shape: 'round-rectangle',
          // label: 'data(label)',
          // width: 'data(width)',
          // height: 'data(height)',
          'border-color': '#fff',
          'border-width': 1,
          'background-color': '#87ceeb', // skyblue
          'font-size': 12,
          'text-wrap': 'wrap',
          'text-valign': 'center',
          'text-halign': 'center',
        },
      },
      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
        },
      },
    ];

    var layoutOption = {
      name: 'grid',
      position: function (node) {
        return node.data('grid') || { row: 1, col: 1 };
      },
    };

    var cy = exports.cy;
    if (!cy) {
      cy = exports.cy = cytoscape({
        container: container,
        maxZoom: 2,
        wheelSensitivity: 0.2,
        elements: elements,
        style: styleOption,
        layout: layoutOption,
      });
    }

    function showElements() {
      if (!elements || elements.length === 0) {
        return;
      }
      cy.batch(function () {
        // clean up existing cy
        cy.removeAllListeners();
        cy.elements().removeAllListeners();
        cy.elements().remove();
        cy.reset();
        cy.add(elements);
        cy.layout(layoutOption).run();
      });
    }

    function exports() {
      return this;
    }

    exports.show = function (_) {
      container.style.visibility = '';

      showElements();

      var step = 0;
      if (arguments.length) {
        step = _;
      }

      function showFiltered() {
        console.log('step: ' + step);

        let f = filters[step];
        if (f) {
          f(cy);
          /*
            cy.elements().remove();
            cy.reset();
            cy.add(filtered);
            */
            cy.layout(layoutOption).run();
        }

        step++;
        if (step < filters.length) {
          setTimeout(showFiltered, 1000);
        }
      }

      setTimeout(showFiltered, 1000);
    };

    exports.hide = function () {
      container.style.visibility = 'hidden';
    };

    exports.elements = function (_) {
      if (!arguments.length) {
        return elements;
      }
      if (_) {
        elements = _;
      }
      return this;
    };

    exports.filters = function (_) {
      if (!arguments.length) {
        return filters;
      }
      if (_) {
        filters = _;
      }
      return this;
    };

    exports.call = function () {
      var callback = arguments[0];
      arguments[0] = this;
      callback.apply(null, arguments);
      return this;
    };

    return exports;
  };
})();
