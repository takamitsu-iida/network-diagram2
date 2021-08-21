/* global cytoscape, iida */

(function () {
  iida.cySlide = function (dom) {
    var container = dom;

    var rightDiv = document.createElement('div');
    rightDiv.style['position'] = 'absolute';
    rightDiv.style['top'] = 0;
    rightDiv.style['right'] = 0;
    rightDiv.style['z-index'] = 20;
    container.appendChild(rightDiv);

    var closeButton = document.createElement('input');
    closeButton.type = 'button';
    closeButton.value = 'Close';
    closeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      container.style.visibility = 'hidden';
    });
    rightDiv.appendChild(closeButton);

    var leftDiv = document.createElement('div');
    leftDiv.style['position'] = 'absolute';
    leftDiv.style['top'] = 0;
    leftDiv.style['left'] = 0;
    leftDiv.style['z-index'] = 20;
    container.appendChild(leftDiv);

    var fieldsetTag = document.createElement('fieldset');
    fieldsetTag.style.margin = '10px';
    leftDiv.appendChild(fieldsetTag);

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
          var f = filters[index];
          if (f) {
            f(cy);
          }
        }
      });
      cy.layout(layoutOption).run();
    }

    function createRadioButton() {
      while (fieldsetTag.lastChild) {
        fieldsetTag.removeChild(fieldsetTag.lastChild);
      }

      const legendTag = document.createElement('legend');
      legendTag.appendChild(document.createTextNode('Filters'));
      fieldsetTag.appendChild(legendTag);

      filters.forEach((filter, index) => {
        let spanTag = document.createElement('span');
        spanTag.style.paddingLeft = '10px';
        spanTag.style.paddingRight = '10px';

        let inputTag = document.createElement('input');
        inputTag.id = filter.name;
        inputTag.type = 'radio';
        inputTag.name = 'filters';
        inputTag.value = index;
        inputTag.addEventListener('change', function (evt) {
          evt.preventDefault();
          evt.stopPropagation();
          inputTag.focus();
          showFiltered(evt.target.value);
        });

        let labelTag = document.createElement('label');
        labelTag.appendChild(document.createTextNode(filter.filterName || filter.name));
        labelTag.htmlFor = filter.name;

        spanTag.appendChild(inputTag);
        spanTag.appendChild(labelTag);
        fieldsetTag.appendChild(spanTag);
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
