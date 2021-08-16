/* global iida */

(function () {
  iida.models.ncs5501 = function () {

    var IMG_PATH = 'static/site/img/NCS-5501.png'
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 168;

    var IMG_X = IMG_WIDTH/2;
    var IMG_Y = IMG_HEIGHT/2;

    var nodeWidth = 78;
    var nodeHeight = 34;

    // (x, y) by paint application
    var positionMap = {
      'Te0/0/0/0': [410, 45],
      'Te0/0/0/1': [410, 110],

      'Te0/0/0/2': [475, 45],
      'Te0/0/0/3': [475, 110],

      'Te0/0/0/4': [540, 45],
      'Te0/0/0/5': [540, 110],

      'Te0/0/0/6': [600, 45],
      'Te0/0/0/7': [600, 110],

      'Te0/0/0/8': [660, 45],
      'Te0/0/0/9': [660, 110],

      'Te0/0/0/10': [720, 45],
      'Te0/0/0/11': [720, 110],

      'Te0/0/0/12': [780, 45],
      'Te0/0/0/13': [780, 110],

      'Te0/0/0/14': [845, 45],
      'Te0/0/0/15': [845, 110],

      'Te0/0/0/16': [910, 45],
      'Te0/0/0/17': [910, 110],

      'Te0/0/0/18': [970, 45],
      'Te0/0/0/19': [970, 110],

      'Te0/0/0/20': [1065, 45],
      'Te0/0/0/21': [1065, 110],

      'Te0/0/0/22': [1130, 45],
      'Te0/0/0/23': [1130, 110],

      'Te0/0/0/24': [1190, 45],
      'Te0/0/0/25': [1190, 110],

      'Te0/0/0/26': [1250, 45],
      'Te0/0/0/27': [1250, 110],

      'Te0/0/0/28': [1310, 45],
      'Te0/0/0/29': [1310, 110],

      'Te0/0/0/30': [1375, 45],
      'Te0/0/0/31': [1375, 110],

      'Te0/0/0/32': [1435, 45],
      'Te0/0/0/33': [1435, 110],

      'Te0/0/0/34': [1500, 45],
      'Te0/0/0/35': [1500, 110],

      'Te0/0/0/36': [1560, 45],
      'Te0/0/0/37': [1560, 110],

      'Te0/0/0/38': [1625, 45],
      'Te0/0/0/39': [1625, 110],

      'Hu0/0/1/0': [1725, 45],
      'Hu0/0/1/1': [1725, 110],

      'Hu0/0/1/2': [1835, 45],
      'Hu0/0/1/3': [1835, 110],
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
