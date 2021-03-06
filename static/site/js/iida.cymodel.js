/* global cytoscape, iida */

(function () {
  iida.cyModel = function (dom) {
    var container = dom;
    var data;
    var model;
    var style = [
      {
        selector: 'node',
        style: {
          shape: 'round-rectangle',
          label: 'data(label)',
          width: 'data(width)',
          height: 'data(height)',
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
        selector: '.__MASTER__',
        style: {
          shape: 'rectangle',
          width: 'data(width)',
          height: 'data(height)',
          'background-image': 'data(url)',
        },
      },
    ];

    var cy = exports.cy;
    if (!cy) {
      cytoscape.warnings(false);
      cy = exports.cy = cytoscape({
        container: dom,
        minZoom: 0.5,
        maxZoom: 2,
        wheelSensitivity: 0.2,
        elements: [],
        layout: { name: 'grid' },
        style: style,
      });
    }
    cytoscape.warnings(true);

    function exports() {
      return this;
    }

    exports.show = function () {
      // clean up existing cy
      cy.removeAllListeners();
      cy.elements().removeAllListeners();
      cy.elements().remove();

      // revert container div height to 100%
      container.style['height'] = '100%';
      cy.resize();

      cy.add({
        data: {
          id: '__MASTER___',
          label: '',
          width: model.IMG_WIDTH,
          height: model.IMG_HEIGHT,
          url: model.IMG_PATH,
        },
        classes: ['__MASTER__'],
        selectable: false,
        grabbable: true,
      });

      cy.fit();

      // fix container height and resize cy
      var masterNode = cy.$id('__MASTER___');
      container.style['height'] = masterNode.renderedHeight() + 'px';
      cy.resize();

      cy.on('position', '.__MASTER__', function (evt) {
        var position = evt.target.position();
        cy.nodes()
          .not(masterNode)
          .forEach((node) => {
            var offset = model.offsetMap[node.id()];
            if (!offset) {
              return;
            }
            var offsetX = offset[0];
            var offsetY = offset[1];
            node.position({ x: position.x + offsetX, y: position.y + offsetY });
          });
      });

      data.forEach((d) => {
        d.data['label'] = d.data['label'] || d.data['id'];
        d.data['width'] = model.PORT_WIDTH;
        d.data['height'] = model.PORT_HEIGHT;
        d['grabbable'] = false;
      });
      cy.add(data);
      cy.fit();

      // fix port position
      masterNode.emit('position');

      // show container div
      container.style.visibility = '';
    };

    exports.hide = function () {
      container.style.visibility = 'hidden';
    };

    exports.datum = function (_) {
      if (!arguments.length) {
        return data;
      }
      data = _;
      return this;
    };

    exports.model = function (_) {
      if (!arguments.length) {
        return model;
      }
      model = _;
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
