/* global iida */

(function () {
  iida.layouts.grid = {
    name: 'grid',

    fit: true, // whether to fit the viewport to the graph
    padding: 50, // padding used on fit
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    avoidOverlapPadding: 120, // extra spacing around nodes when avoidOverlap: true
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
    condense: false, // uses all available space on false, uses minimal space on true
    rows: undefined, // force num of rows in the grid
    cols: undefined, // force num of columns in the grid
    position: function (node) {
      // returns { row, col } for element
      return node.data('grid') || { row: 1, col: 1 };
    },
    sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: 'ease', // easing of animation if enabled
    animateFilter: function (node, i) {
      return true;
    }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
    stop: function (evt) {
      // save initial position
      evt.cy.nodes('.router').forEach((node) => {
        node.data('initialPosition', Object.assign({}, node.position()));
      });
    },
  };

  iida.layouts.circle = {
    name: 'circle',

    fit: true, // whether to fit the viewport to the graph
    padding: 30, // the padding on fit
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
    radius: undefined, // the radius of the circle
    startAngle: (3 / 2) * Math.PI, // where nodes start in radians
    sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
    clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
    sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
    animate: true, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: 'ease', // easing of animation if enabled
    animateFilter: function (node, i) {
      return true;
    }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
  };

  iida.layouts.concentric = {
    name: 'concentric',

    fit: true, // whether to fit the viewport to the graph
    padding: 30, // the padding on fit
    startAngle: (3 / 2) * Math.PI, // where nodes start in radians
    sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
    clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
    equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
    minNodeSpacing: 10, // min spacing between outside of nodes (used for radius adjustment)
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    height: undefined, // height of layout area (overrides container height)
    width: undefined, // width of layout area (overrides container width)
    spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
    concentric: function (node) {
      // returns numeric value for each node, placing higher nodes in levels towards the centre
      return node.degree();
    },
    levelWidth: function (nodes) {
      // the variation of concentric values in each level
      return nodes.maxDegree() / 4;
    },
    animate: true, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: 'ease', // easing of animation if enabled
    animateFilter: function (node, i) {
      return true;
    }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
  };

  iida.layouts.breadthfirst = {
    name: 'breadthfirst',

    fit: true, // whether to fit the viewport to the graph
    directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
    padding: 30, // padding on fit
    circle: false, // put depths in concentric circles if true, put depths top down if false
    grid: false, // whether to create an even grid into which the DAG is placed (circle:false only)
    spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    roots: undefined, // the roots of the trees
    maximal: false, // whether to shift nodes down their natural BFS depths in order to avoid upwards edges (DAGS only)
    animate: true, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: 'ease', // easing of animation if enabled,
    animateFilter: function (node, i) {
      return true;
    }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
  };

  // fcose
  // https://github.com/iVis-at-Bilkent/cytoscape.js-fcose
  iida.layouts.fcose = {
    name: 'fcose',

    // quality: "default",  // default,
    // randomize: true,

    quality: 'proof',
    randomize: false, // if quality is "proof"

    animate: true,
    animationDuration: 1000,
    animationEasing: 'ease',
    fit: true, // default is true
    padding: 20,

    // Separation amount between nodes
    nodeSeparation: 300,

    // Ideal edge (non nested) length
    idealEdgeLength: (edge) => 300,

    // Fix desired nodes to predefined positions
    // [{nodeId: 'n1', position: {x: 100, y: 200}}, {...}]
    fixedNodeConstraint: undefined,

    // Align desired nodes in vertical/horizontal direction
    // {vertical: [['n1', 'n2'], [...]], horizontal: [['n2', 'n4'], [...]]}
    alignmentConstraint: {
      vertical: [
        ['C棟コアルータ#1', 'C棟コアルータ#2'],
        ['B棟コアルータ#1', 'B棟コアルータ#2'],
        ['C棟ユーザ収容ルータ#1', 'C棟ユーザ収容ルータ#2'],
        ['C棟ユーザ収容ルータ#3', 'C棟ユーザ収容ルータ#4'],
        ['B棟ユーザ収容ルータ#1', 'B棟ユーザ収容ルータ#2'],
        ['B棟ユーザ収容ルータ#3', 'B棟ユーザ収容ルータ#4'],
        ['B棟サービス収容ルータ#1', 'B棟サービス収容ルータ#2'],
        ['C棟サービス収容ルータ#1', 'C棟サービス収容ルータ#2'],
      ],
    },

    // Place two nodes relatively in vertical/horizontal direction
    // [{top: 'n1', bottom: 'n2', gap: 100}, {left: 'n3', right: 'n4', gap: 75}, {...}]
    relativePlacementConstraint: [{ left: 'C棟コアルータ#1', right: 'B棟コアルータ#1', gap: 1200 }],
  };
})();
