/* global iida */

(function () {

  iida.styles.physical = [
    {
      selector: 'edge',
      style: {
        width: 1,
        'curve-style': 'straight', // "bezier", "taxi" "bezier" "segments",
        'target-arrow-shape': 'circle',
        'source-arrow-shape': 'circle',
        'line-color': '#000',
        // 'line-color': '#a9a9a9', // darkgray
        'target-arrow-color': '#a9a9a9', // darkgray
        'source-arrow-color': '#a9a9a9', // darkgray
        'text-wrap': 'wrap', // wrap is needed to work \n
        'edge-text-rotation': 'autorotate',
        label: function (edge) {
          return edge.data('label') ? `\u2060${edge.data('label')}\n\n\u2060` : '';
        },
        'font-size': 12,
        'min-zoomed-font-size': 6,
      },
    },

    {
      selector: 'edge.topology',
      style: {
        label: function (edge) {
          return edge.data('weight') ? `\u2060${edge.data('weight')}\n\n\u2060` : '';
        },
        'font-size': 24,
      },
    },

    {
      selector: '.router',
      style: {
        'border-color': '#000',
        'border-width': 1,
        shape: 'rectangle',
        'background-color': '#ffffff',
        label: 'data(label)',
        width: 'data(width)',
        height: 'data(height)',
        'font-size': 12,
        'text-wrap': 'wrap',
        'text-valign': 'center',
        'text-halign': 'center',
        opacity: 0.8,
      },
    },

    {
      selector: '.router.topology',
      style: {
        shape: 'round-rectangle',
        label: 'data(id)',
        'font-size': 20,
        'text-max-width': 'data(width)',
        'text-overflow-wrap': 'anywhere',
      },
    },

    {
      selector: '.port',
      style: {
        'border-color': '#000',
        'border-width': 1,
        shape: 'rectangle',
        'background-color': '#87ceeb', // skyblue
        label: 'data(label)',
        width: 'data(width)',
        height: 'data(height)',
        'font-size': 9,
        'text-wrap': 'wrap',
        'text-valign': 'center',
        'text-halign': 'center',
        opacity: 0.8,
      },
    },

    {
      selector: '.bundleEther',
      style: {
        shape: 'rectangle',
        label: 'data(label)', // function(node) { return node.data('label') ? node.data('label') : ''},
        'text-wrap': 'wrap',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': 9,
        'background-color': '#f0e68c', // khaki
        'border-width': 0,
      },
    },

    {
      selector: '.bundleEtherPort',
      style: {
        'border-width': 3,
      },
    },

    {
      // size of loop
      selector: 'edge.loop',
      style: {
        'control-point-step-size': 90,
      },
    },

    {
      // internal edge from router to port
      selector: 'edge.routerToPort',
      style: {
        visibility: 'hidden',
      },
    },

    {
      selector: '.router.P',
      style: {
        'background-color': '#20b2aa', // lightseagreen
      },
    },

    {
      selector: '.router.PE',
      style: {
        'background-color': '#00ced1', // darkturquoise
      },
    },

    {
      selector: '.router.L2',
      style: {
        'background-color': '#add8e6', // lightblue
      },
    },

    {
      selector: '.router.searched',
      style: {
        'background-color': '#ffdab9', // peachpuff
      },
    },

    {
      // highlight dijkstra path
      selector: 'node.dijkstraPath',
      style: {
        'border-color': '#0000ff', // blue
        'border-width': 3,
      },
    },

    {
      // highlight dijkstra path
      selector: 'edge.dijkstraPath',
      style: {
        width: 3,
        'line-color': '#0000ff', // blue
        'target-arrow-color': '#0000ff', // blue
        'source-arrow-color': '#0000ff', // blue
        // 'background-color': "#a9a9a9",  // darkgray
        // 'transition-property': "background-color, line-color",
        // 'transition-duration': "0.5s"
      },
    },

    {
      // highlight dijkstra source node
      selector: '.router.dijkstraSource',
      style: {
        'background-color': '#ff8c00', // darkorange
        'border-width': 8,
      },
    },

    {
      // highlight dijkstra target node
      selector: '.router.dijkstraTarget',
      style: {
        'background-color': '#ff8c00', // darkorange
        'border-width': 8,
      },
    },

    {
      // un-highlight not dijkstra path
      selector: '.dijkstraSemitransp',
      style: { opacity: '0.5' },
    },

    {
      // ']' shape edge
      selector: 'edge.segmentsR',
      style: {
        'curve-style': 'segments',
        'segment-weights': '0 1',
        'edge-distances': 'node-position', // "intersection" or "node-position"
        'segment-distances': function (edge) {
          var distances = edge.data('segmentDistances') || 25;
          // return "- -";
          var s = -1 * (edge.source().data('width') / 2 + distances);
          var t = -1 * (edge.target().data('width') / 2 + distances);
          return s.toString() + ' ' + t.toString();
        },
      },
    },

    {
      // '[' shape edge
      selector: 'edge.segmentsL',
      style: {
        'curve-style': 'segments',
        'segment-weights': '0 1',
        'edge-distances': 'node-position', // "intersection" or "node-position"
        'segment-distances': function (edge) {
          var distances = edge.data('segmentDistances') || 25;
          // return "+ +";
          var s = edge.source().data('width') / 2 + distances;
          var t = edge.target().data('width') / 2 + distances;
          return s.toString() + ' ' + t.toString();
        },
      },
    },

    {
      // taxi leftward
      selector: 'edge.taxiL',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'leftward',
        'taxi-turn': 'data(taxiTurn)',
      },
    },

    {
      // taxi rightward
      selector: 'edge.taxiR',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'rightward',
        'taxi-turn': 'data(taxiTurn)',
      },
    },

    {
      // unbundled-bezier
      selector: 'edge.unbundled-bezier',
      style: {
        'curve-style': 'unbundled-bezier',
      },
    },

    {
      // thick overlay line
      selector: 'edge.overlay10',
      style: {
        'overlay-color': 'black',
        'overlay-padding': 10,
        'overlay-opacity': '0.2',
      },
    },

    {
      // on mouseover
      selector: 'node.mouseover',
      style: {
        'border-width': 3,
      },
    },

    {
      // selected node and edge
      selector: ':selected',
      style: {
        'overlay-color': 'black',
        'overlay-padding': 10,
        'overlay-opacity': '0.1',
      },
    },

    {
      // class to control show or hide
      selector: '.hidden',
      style: {
        visibility: 'hidden',
      },
    },

    {
      // class to control disabled or not, disabled node is excluded from dijkstra search
      selector: '.disabled',
      style: {
        // edge
        'line-color': '#ff0000', // red
        'line-style': 'dashed',
        // node
        'border-color': '#ff0000', // red
        'border-style': 'dashed',
      },
    },

    {
      // svg icon
      selector: '.cloud',
      style: {
        'width': 100,
        'height': 100,
        'border-width': 0,
        'background-color': '#e9e9e9',  // same color as #cy
        'background-image': iida.appdata.svgCloud,
      },
    },

  ];


})();
