/* global cytoscape, iida */

(function () {
  iida.cySlide = function (dom) {
    var container = dom;

    var onContainerDiv = document.createElement('div');
    onContainerDiv.style['position'] = 'absolute';
    onContainerDiv.style['top'] = 0;
    onContainerDiv.style['right'] = 0;
    onContainerDiv.style['z-index'] = 20;
    container.appendChild(onContainerDiv);

    var closeButton = document.createElement('input');
    closeButton.type = 'button';
    closeButton.value = 'Close';
    closeButton.addEventListener('click', function () {
      container.style.visibility = 'hidden';
    });
    onContainerDiv.appendChild(closeButton);

    var radioDiv = document.createElement('div');
    radioDiv.id = 'idRadioDiv';
    onContainerDiv.appendChild(radioDiv);

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

    function showFiltered(filterId) {
      showElements();
      cy.batch(function () {
        for (let index = 0; index <= filterId; index++) {
          console.log('filter: ' + index);
          var f = filters[index];
          if (f) {
            f(cy);
          }
        }
      });
      cy.layout(layoutOption).run();
    }

    function createRadioButton() {
      while (radioDiv.lastChild) {
        radioDiv.removeChild(radioDiv.lastChild);
      }

      filters.forEach((filter, index) => {
        var inputTag = document.createElement('input');
        inputTag.id = filter.name;
        inputTag.type = 'radio';
        inputTag.name = 'filters';
        inputTag.value = index;
        inputTag.addEventListener('change', function (evt) {
          evt.preventDefault();
          evt.stopPropagation();
          var index = evt.target.value;
          showFiltered(index);
        });

        var labelTag = document.createElement('label');
        labelTag.appendChild(document.createTextNode(filter.filterName || filter.name));
        labelTag.htmlFor = filter.name;

        radioDiv.appendChild(labelTag);
        radioDiv.appendChild(inputTag);
      });
    }

    exports.show = function (_) {
      createRadioButton();
      container.style.visibility = '';

      var step = 0;
      if (arguments.length) {
        step = _;
      }

      function _show() {
        console.log('step: ' + step);

        let f = filters[step];
        if (f) {
          f(cy);
          cy.layout(layoutOption).run();
        }

        step++;
        if (step < filters.length) {
          setTimeout(_show, 1000);
        }
      }

      showElements();
      setTimeout(_show, 1000);
    };

    exports.hide = function () {
      container.removeChild(document.getElementById('idRadio'));
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
