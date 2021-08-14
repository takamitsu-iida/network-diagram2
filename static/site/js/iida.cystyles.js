/* global iida */

(function () {

  var commons = [

    {
      // class to control show or hide
      'selector': ".hidden",
      'style': {
        'visibility': "hidden"
      }
    },

    {
      // internal designated router port
      'selector': "node.rootPort",
      'style': {
        'visibility': "hidden"
      }
    },

    {
      // internal edge from router to port
      'selector': "edge.RouterToPort",
      'style': {
        'visibility': "hidden"
      }
    },

    {
      // control to disabled or not, disabled node is excluded from dijkstra search
      'selector': ".disabled",
      'style': {
        // edge
        'line-color': "#ff0000",  // red
        'line-style': "dashed",
        // node
        'border-color': "#ff0000",  // red
        'border-style': "dashed",
      }
    },

    {
      // selected node
      'selector': "node:selected",
      'style': {
        'background-color': "#ffd700",  // gold
      }
    },

    {
      // selected edge
      'selector': "edge:selected",
      'style': {
        'overlay-color': "black",
        'overlay-padding': 8,
        'overlay-opacity': "0.1"
      }
    },

    {
      // size of loop
      selector: ".loop",
      style: {
        'control-point-step-size': 90
      }
    },

    {
      // on mouseover
      'selector': ".router.mouseover",
      'style': {
        'border-width': 3
      }
    },

    {
      // highlight dijkstra path
      'selector': ".router.dijkstraPath",
      'style': {
        'border-color': "#0000ff",  // blue
        'border-width': 3,
      }
    },

    {
      // highlight dijkstra path
      'selector': "edge.dijkstraPath",
      'style': {
        'width': 3,
        'line-color': "#0000ff",  // blue
        'target-arrow-color': "#0000ff",  // blue
        'source-arrow-color': "#0000ff",  // blue
        // 'background-color': "#a9a9a9",  // darkgray
        // 'transition-property': "background-color, line-color",
        // 'transition-duration': "0.5s"
      }
    },

    {
      // highlight dijkstra source node
      'selector': ".router.dijkstraSource",
      'style': {
        'border-color': "#800080",  // purple
        'border-width': 8,
      }
    },

    {
      // highlight dijkstra target node
      'selector': ".router.dijkstraTarget",
      'style': {
        'border-color': "#800080",  // purple
        'border-width': 8,
      }
    },

    {
      // un-highlight not dijkstra path
      selector: '.dijkstraSemitransp',
      style: { 'opacity': '0.5' }
    },

    {
      // ']' shape edge
      'selector': "edge.segmentsRight",
      'style': {
        "curve-style": "segments",
        'segment-weights': "0 1",
        'edge-distances': "node-position",  // "intersection" or "node-position"
        'segment-distances': function (edge) {
          // return "-55 -55";
          var s = -1 * (edge.source().data('width') / 2 + 25);
          var t = -1 * (edge.target().data('width') / 2 + 25);
          return s.toString() + " " + t.toString();
        },
      }
    },

    {
      // ']' shape edge with bigger distance
      'selector': "edge.segmentsRight2",
      'style': {
        "curve-style": "segments",
        'segment-weights': "0 1",
        'edge-distances': "node-position",  // "intersection" or "node-position"
        'segment-distances': function (edge) {
          // return "-80 -80";
          var s = -1 * (edge.source().data('width') / 2 + 25 + 25);
          var t = -1 * (edge.target().data('width') / 2 + 25 + 25);
          return s.toString() + " " + t.toString();
        },
      }
    },

    {
      // '[' shape edge
      'selector': "edge.segmentsLeft",
      'style': {
        "curve-style": "segments",
        'segment-weights': "0 1",
        'edge-distances': "node-position",  // "intersection" or "node-position"
        'segment-distances': function (edge) {
          // return "55 55";
          var s = edge.source().data('width') / 2 + 25;
          var t = edge.target().data('width') / 2 + 25;
          return s.toString() + " " + t.toString();
        },
      }
    },

    {
      // '[' shape edge with bigger distance
      'selector': "edge.segmentsLeft2",
      'style': {
        "curve-style": "segments",
        'segment-weights': "0 1",
        'edge-distances': "node-position",  // "intersection" or "node-position"
        'segment-distances': function (edge) {
          // return "80 80";
          var s = edge.source().data('width') / 2 + 25 + 25;
          var t = edge.target().data('width') / 2 + 25 + 25;
          return s.toString() + " " + t.toString();
        },
      }
    },

    {
      // thick overlay line
      'selector': "edge.overlay10",
      'style': {
        'overlay-color': "black",
        'overlay-padding': 10,
        'overlay-opacity': "0.2"
      }
    },

    {
      'selector': ".imgRouter",
      'style': {
        'background-image': "https://takamitsu-iida.github.io/network-diagram2/static/site/img/router.jpg"
      }
    },

    {
      'selector': ".imgFirewall",
      'style': {
        'background-image': "https://takamitsu-iida.github.io/network-diagram2/static/site/img/firewall.jpg"
      }
    },

  ];


  iida.styles.physical = [

    {
      'selector': "edge",
      'style': {
        'width': 2,
        'curve-style': "straight",  // "bezier", "taxi" "bezier" "segments",
        'target-arrow-shape': "circle",
        'source-arrow-shape': "circle",
        'line-color': "#a9a9a9",  // darkgray
        'target-arrow-color': "#a9a9a9",  // darkgray
        'source-arrow-color': "#a9a9a9",  // darkgray
        'text-wrap': "wrap",  // wrap is needed to work \n
        'edge-text-rotation': "autorotate",
        'label': function (edge) { return edge.data('label') ? `\u2060${edge.data('label')}\n\n\u2060` : ''; },
        'font-size': 12,
        'min-zoomed-font-size': 6
      }
    },

    {
      'selector': ".router",
      'style': {
        'border-color': "#000",
        'border-width': 1,
        'shape': "rectangle",
        'background-color': "#ffffff",
        'label': "data(label)",
        'width': "data(width)",
        'height': "data(height)",
        'font-size': 12,
        'text-wrap': "wrap",
        'text-valign': "center",
        'text-halign': "center",
        'opacity': 0.8,
        'border-opacity': 1.0
      }
    },

    {
      'selector': ".router.P",
      'style': {
        'background-color': "#20b2aa",  // lightseagreen
      }
    },

    {
      'selector': ".router.PE",
      'style': {
        'background-color': "#40e0d0",  // turquoise
      }
    },

    {
      'selector': ".port",
      'style': {
        'border-color': "#000",
        'border-width': 1,
        'shape': "rectangle",
        'background-color': "#87ceeb",  // skyblue
        'label': "data(label)",
        'width': "data(width)",
        'height': "data(height)",
        'font-size': 10,
        'text-wrap': "wrap",
        'text-valign': "center",
        'text-halign': "center",
        'opacity': 0.8,
        'border-opacity': 1.0
      }
    },

    {
      'selector': ".bundleEther",
      'style': {
        'shape': "rectangle",
        'label': "data(label)",  // function(node) { return node.data('label') ? node.data('label') : ''},
        'text-wrap': "wrap",
        'text-valign': "center",
        'text-halign': "center",
        'font-size': 9,
        'background-color': "#f0e68c",  // khaki
        'border-width': 0,
        'opacity': 1
      }
    },

    {
      'selector': ".bundleEtherPort",
      'style': {
        'border-width': 3
      }
    },

  ];
  Array.prototype.push.apply(iida.styles.physical, commons);


  iida.styles.topology = [

    {
      'selector': "edge",
      'style': {
        'width': 2,
        'curve-style': "bezier",  // in case of multiple edges between same nodes
        'target-arrow-shape': "circle",
        'source-arrow-shape': "circle",
        'line-color': "#a9a9a9",  // darkgray
        'target-arrow-color': "#a9a9a9",  // darkgray
        'source-arrow-color': "#a9a9a9",  // darkgray
        'text-wrap': "wrap",
        'edge-text-rotation': "autorotate",
        'label': function (edge) { return edge.data('weight') ? `\u2060${edge.data('weight')}\n\n\u2060` : ''; },
        'font-size': 20
      }
    },

    {
      'selector': ".router",
      'style': {
        'border-color': "#000",
        'border-width': 1,
        'shape': "round-rectangle",
        'label': "data(id)",
        // 'label': "data(label)",  // function(node) { return node.data('label') ? node.data('label') : ''; },
        'width': "data(width)",
        'height': "data(height)",
        'font-size': 16,
        'text-wrap': "wrap",
        'text-valign': "center",
        'text-halign': "center"
      }
    },

    {
      'selector': ".router.P",
      'style': {
        'background-color': "#20b2aa",  // lightseagreen
      }
    },

    {
      'selector': ".router.PE",
      'style': {
        'background-color': "#40e0d0",  // turquoise
      }
    },

  ];
  Array.prototype.push.apply(iida.styles.topology, commons);

})();
