/* global iida */

(function () {
  iida.models.ncs55a1 = function () {

    var IMG_PATH = 'static/site/img/NCS-55A1-36H.png'
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 171;

    var IMG_X = IMG_WIDTH/2;
    var IMG_Y = IMG_HEIGHT/2;

    var nodeWidth = 78;
    var nodeHeight = 34;

    // (x, y) by paint application
    var positionMap = {
      'Hu0/0/0/0': [275, 50],
      'Hu0/0/0/1': [275, 115],

      'Hu0/0/0/2': [360, 50],
      'Hu0/0/0/3': [360, 115],

      'Hu0/0/0/4': [460, 50],
      'Hu0/0/0/5': [460, 115],

      'Hu0/0/0/6': [555, 50],
      'Hu0/0/0/7': [555, 115],

      'Hu0/0/0/8': [645, 50],
      'Hu0/0/0/9': [645, 115],

      'Hu0/0/0/10': [730, 50],
      'Hu0/0/0/11': [730, 115],

      'Hu0/0/0/12': [830, 50],
      'Hu0/0/0/13': [830, 115],

      'Hu0/0/0/14': [910, 50],
      'Hu0/0/0/15': [910, 115],

      'Hu0/0/0/16': [1010, 50],
      'Hu0/0/0/17': [1010, 115],

      'Hu0/0/0/18': [1095, 50],
      'Hu0/0/0/19': [1095, 115],

      'Hu0/0/0/20': [1195, 50],
      'Hu0/0/0/21': [1195, 115],

      'Hu0/0/0/22': [1275, 50],
      'Hu0/0/0/23': [1275, 115],

      'Hu0/0/0/24': [1380, 50],
      'Hu0/0/0/25': [1380, 115],

      'Hu0/0/0/26': [1460, 50],
      'Hu0/0/0/27': [1460, 115],

      'Hu0/0/0/28': [1560, 50],
      'Hu0/0/0/29': [1560, 115],

      'Hu0/0/0/30': [1645, 50],
      'Hu0/0/0/31': [1645, 115],

      'Hu0/0/0/32': [1745, 50],
      'Hu0/0/0/33': [1745, 115],

      'Hu0/0/0/34': [1830, 50],
      'Hu0/0/0/35': [1830, 115],
    };

    var offsetMap = {};
    for (let k in positionMap) {
      offsetX = positionMap[k][0] - IMG_X;
      offsetY = positionMap[k][1] - IMG_Y;
      offsetMap[k] = [offsetX, offsetY];
    }

    function exports (minicy) {
      const data = minicy.datum();
      const cy = minicy.cy;
      const container = minicy.container();

      container.style.height = IMG_HEIGHT + 'px';
      cy.resize();

      cy.add({
        data: {id: 'MASTER'},
        selectable: false,
        locked: false,
        grabbable: true,
      });

      var masterNode = cy.$id('MASTER');
      masterNode.style('shape', 'rectangle');
      masterNode.style('width', IMG_WIDTH);
      masterNode.style('height', IMG_HEIGHT);
      masterNode.style('background-image', IMG_PATH);

      cy.on('position', '#MASTER', function (evt) {
        var routerPosition = evt.target.position();

        cy.nodes().forEach(node => {
          var offset = offsetMap[node.id()];
          if (!offset) {
            return;
          }
          var offsetX = offset[0];
          var offsetY = offset[1];

          node.position({ x: routerPosition.x + offsetX, y: routerPosition.y + offsetY});
        });
      });

      cy.add(data);

      cy.nodes().not(masterNode).forEach(node => {
        node.style('width', nodeWidth);
        node.style('height', nodeHeight);
      });

      cy.fit();
      masterNode.emit('position');
    }

    return exports;
  };
  //
})();
