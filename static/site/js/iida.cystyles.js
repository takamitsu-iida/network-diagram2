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
      selector: '.port',
      style: {
        'border-color': '#000',
        'border-width': 1,
        shape: 'rectangle',
        'background-color': '#87ceeb', // skyblue
        label: 'data(label)',
        width: 'data(width)',
        height: 'data(height)',
        'font-size': 10,
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
      selector: '.router.topology',
      style: {
        'border-color': '#000',
        'border-width': 1,
        shape: 'round-rectangle',
        label: 'data(id)',
        width: 'data(width)',
        height: 'data(height)',
        'font-size': 20,
        'text-wrap': 'wrap',
        'text-valign': 'center',
        'text-halign': 'center',
      },
    },

    {
      selector: 'edge.topology',
      style: {
        label: function (edge) {
          return edge.data('weight') ? `\u2060${edge.data('weight')}\n\n\u2060` : '';
        },
        'font-size': 25,
      },
    },

    {
      // highlight dijkstra path
      selector: '.router.dijkstraPath',
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
        'border-color': '#ff8c00', // darkorange
        'border-width': 8,
      },
    },

    {
      // highlight dijkstra target node
      selector: '.router.dijkstraTarget',
      style: {
        'border-color': '#800080', // purple
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
      selector: 'edge.segmentsRight',
      style: {
        'curve-style': 'segments',
        'segment-weights': '0 1',
        'edge-distances': 'node-position', // "intersection" or "node-position"
        'segment-distances': function (edge) {
          // return "- -";
          var s = -1 * (edge.source().data('width') / 2 + 25);
          var t = -1 * (edge.target().data('width') / 2 + 25);
          return s.toString() + ' ' + t.toString();
        },
      },
    },

    {
      // ']' shape edge with bigger distance
      selector: 'edge.segmentsRight2',
      style: {
        'curve-style': 'segments',
        'segment-weights': '0 1',
        'edge-distances': 'node-position', // "intersection" or "node-position"
        'segment-distances': function (edge) {
          // return "- -";
          var s = -1 * (edge.source().data('width') / 2 + 25 + 25);
          var t = -1 * (edge.target().data('width') / 2 + 25 + 25);
          return s.toString() + ' ' + t.toString();
        },
      },
    },

    {
      // ']' shape edge with bigger distance
      selector: 'edge.segmentsRight3',
      style: {
        'curve-style': 'segments',
        'segment-weights': '0 1',
        'edge-distances': 'node-position', // "intersection" or "node-position"
        'segment-distances': function (edge) {
          // return "- -";
          var s = -1 * (edge.source().data('width') / 2 + 25 + 25 + 25);
          var t = -1 * (edge.target().data('width') / 2 + 25 + 25 + 25);
          return s.toString() + ' ' + t.toString();
        },
      },
    },

    {
      // ']' shape edge with bigger distance
      selector: 'edge.segmentsRight4',
      style: {
        'curve-style': 'segments',
        'segment-weights': '0 1',
        'edge-distances': 'node-position', // "intersection" or "node-position"
        'segment-distances': function (edge) {
          // return "- -";
          var s = -1 * (edge.source().data('width') / 2 + 25 + 25 + 25 + 25);
          var t = -1 * (edge.target().data('width') / 2 + 25 + 25 + 25 + 25);
          return s.toString() + ' ' + t.toString();
        },
      },
    },

    {
      // ']' shape edge with bigger distance
      selector: 'edge.segmentsRight5',
      style: {
        'curve-style': 'segments',
        'segment-weights': '0 1',
        'edge-distances': 'node-position', // "intersection" or "node-position"
        'segment-distances': function (edge) {
          // return "- -";
          var s = -1 * (edge.source().data('width') / 2 + 25 + 25 + 25 + 25 + 25);
          var t = -1 * (edge.target().data('width') / 2 + 25 + 25 + 25 + 25 + 25);
          return s.toString() + ' ' + t.toString();
        },
      },
    },

    {
      // ']' shape edge with bigger distance
      selector: 'edge.segmentsRight6',
      style: {
        'curve-style': 'segments',
        'segment-weights': '0 1',
        'edge-distances': 'node-position', // "intersection" or "node-position"
        'segment-distances': function (edge) {
          // return "- -";
          var s = -1 * (edge.source().data('width') / 2 + 25 + 25 + 25 + 25 + 25 + 25);
          var t = -1 * (edge.target().data('width') / 2 + 25 + 25 + 25 + 25 + 25 + 25);
          return s.toString() + ' ' + t.toString();
        },
      },
    },

    {
      // ']' shape edge with bigger distance
      selector: 'edge.segmentsRight7',
      style: {
        'curve-style': 'segments',
        'segment-weights': '0 1',
        'edge-distances': 'node-position', // "intersection" or "node-position"
        'segment-distances': function (edge) {
          // return "- -";
          var s = -1 * (edge.source().data('width') / 2 + 25 + 25 + 25 + 25 + 25 + 25 + 25);
          var t = -1 * (edge.target().data('width') / 2 + 25 + 25 + 25 + 25 + 25 + 25 + 25);
          return s.toString() + ' ' + t.toString();
        },
      },
    },

    {
      // ']' shape edge with bigger distance
      selector: 'edge.segmentsRight8',
      style: {
        'curve-style': 'segments',
        'segment-weights': '0 1',
        'edge-distances': 'node-position', // "intersection" or "node-position"
        'segment-distances': function (edge) {
          // return "- -";
          var s = -1 * (edge.source().data('width') / 2 + 25 + 25 + 25 + 25 + 25 + 25 + 25 + 25);
          var t = -1 * (edge.target().data('width') / 2 + 25 + 25 + 25 + 25 + 25 + 25 + 25 + 25);
          return s.toString() + ' ' + t.toString();
        },
      },
    },

    {
      // '[' shape edge
      selector: 'edge.segmentsLeft',
      style: {
        'curve-style': 'segments',
        'segment-weights': '0 1',
        'edge-distances': 'node-position', // "intersection" or "node-position"
        'segment-distances': function (edge) {
          // return "+ +";
          var s = edge.source().data('width') / 2 + 25;
          var t = edge.target().data('width') / 2 + 25;
          return s.toString() + ' ' + t.toString();
        },
      },
    },

    {
      // '[' shape edge with bigger distance
      selector: 'edge.segmentsLeft2',
      style: {
        'curve-style': 'segments',
        'segment-weights': '0 1',
        'edge-distances': 'node-position', // "intersection" or "node-position"
        'segment-distances': function (edge) {
          // return "+ +";
          var s = edge.source().data('width') / 2 + 25 + 25;
          var t = edge.target().data('width') / 2 + 25 + 25;
          return s.toString() + ' ' + t.toString();
        },
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
      // taxi leftward
      selector: 'edge.taxiL',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'leftward',
        'taxi-turn': function (edge) { return edge.data('taxiTurn'); },
      },
    },

    {
      // taxi leftward 40px
      selector: 'edge.taxiL40',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'leftward',
        'taxi-turn': 40,
      },
    },

    {
      // taxi leftward 60px
      selector: 'edge.taxiL60',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'leftward',
        'taxi-turn': 60,
      },
    },

    {
      // taxi leftward 80px
      selector: 'edge.taxiL80',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'leftward',
        'taxi-turn': 80,
      },
    },

    {
      // taxi leftward 100px
      selector: 'edge.taxiL100',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'leftward',
        'taxi-turn': 100,
      },
    },

    {
      // taxi leftward 120px
      selector: 'edge.taxiL120',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'leftward',
        'taxi-turn': 120,
      },
    },

    {
      // taxi leftward 140px
      selector: 'edge.taxiL140',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'leftward',
        'taxi-turn': 140,
      },
    },

    {
      // taxi leftward 160px
      selector: 'edge.taxiL160',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'leftward',
        'taxi-turn': 160,
      },
    },

    {
      // taxi leftward 180px
      selector: 'edge.taxiL180',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'leftward',
        'taxi-turn': 180,
      },
    },

    {
      // taxi leftward 200px
      selector: 'edge.taxiL200',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'leftward',
        'taxi-turn': 200,
      },
    },

    {
      // taxi rightward 60px
      selector: 'edge.taxiR60',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'rightward',
        'taxi-turn': 60,
      },
    },

    {
      // taxi rightward 80px
      selector: 'edge.taxiR80',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'rightward',
        'taxi-turn': 80,
      },
    },

    {
      // taxi rightward 100px
      selector: 'edge.taxiR100',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'rightward',
        'taxi-turn': 100,
      },
    },

    {
      // taxi rightward 120px
      selector: 'edge.taxiR120',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'rightward',
        'taxi-turn': 120,
      },
    },

    {
      // taxi rightward 140px
      selector: 'edge.taxiR140',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'rightward',
        'taxi-turn': 140,
      },
    },

    {
      // taxi rightward 160px
      selector: 'edge.taxiR160',
      style: {
        'curve-style': 'taxi',
        'taxi-direction': 'rightward',
        'taxi-turn': 160,
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
      selector: '.router.mouseover',
      style: {
        'border-width': 3,
      },
    },

    {
      // selected node
      selector: 'node:selected',
      style: {
        'background-color': '#ffd700', // gold
      },
    },

    {
      // selected edge
      selector: 'edge:selected',
      style: {
        'overlay-color': 'black',
        'overlay-padding': 8,
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
      // control to disabled or not, disabled node is excluded from dijkstra search
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
      selector: '.imgRouter',
      style: {
        'background-image': 'https://takamitsu-iida.github.io/network-diagram2/static/site/img/router.jpg',
      },
    },

    {
      selector: '.imgFirewall',
      style: {
        'background-image': 'https://takamitsu-iida.github.io/network-diagram2/static/site/img/firewall.jpg',
      },
    },
  ];

})();
