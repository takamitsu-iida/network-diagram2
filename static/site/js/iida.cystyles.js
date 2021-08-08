/* global iida */

(function () {

    var commons = [

        {
            'selector': ".hidden",
            'style': {
                'visibility': "hidden"
            }
        },

        {
            'selector': "edge.internal",
            'style': {
                'visibility': "hidden"
            }
        },

        {
            'selector': ".disabled",
            'style': {
                'line-color': "#ff0000",  // red
                'line-style': "dashed"
            }

        },

        {
            'selector': ".router:selected",
            'style': {
                'background-color': "yellow"
            }
        },

        {
            selector: ".loop",
            style: {
                'control-point-step-size': 90
            }
        },

        {
            'selector': ".router.mouseover",
            'style': {
                'border-width': 3
            }
        },

        {
            'selector': ".router.highlighted",
            'style': {
                'border-color': "#0000ff",  // blue
                'border-width': 4
            }
        },

        {
            'selector': "edge.highlighted",
            'style': {
                'width': 4,
                'line-color': "#0000ff",  // blue
                // 'background-color': "#a9a9a9",  // darkgray
                // 'transition-property': "background-color, line-color",
                // 'transition-duration': "0.5s"
            }
        },

        {
            // ']' shape edge
            'selector': "edge.segments_right",
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
            'selector': "edge.segments_right2",
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
            'selector': "edge.segments_left",
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
            'selector': "edge.segments_left2",
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
            'selector': "edge.overlay_10",
            'style': {
                'overlay-color': "black",
                'overlay-padding': 10,
                'overlay-opacity': "0.2"
            }
        },

        {
            'selector': ".img_router",
            'style': {
                'background-image': "https://takamitsu-iida.github.io/network-diagram2/static/site/img/router.jpg"
            }
        },

        {
            'selector': ".img_firewall",
            'style': {
                'background-image': "https://takamitsu-iida.github.io/network-diagram2/static/site/img/firewall.jpg"
            }
        },

    ];


    iida.styles.cy = [
        {
            'selector': "edge",
            'style': {
                'width': 2,
                'curve-style': "bezier",  // "taxi" "bezier" "segments",
                'line-color': "#a9a9a9",  // darkgray
                'text-wrap': "wrap",  // wrap is needed to work \n
                // 'label': "data(label)",
                'label': edge => edge.data('label') ? `\u2060${edge.data('label')}\n\n\u2060` : '',
                'font-size': "8px",
                'edge-text-rotation': "autorotate"
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
                'font-size': "8px",
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
                'border-color': "#000",
                'border-width': 1,
                'shape': "rectangle",
                'background-color': "#20b2aa",  // lightseagreen
                'label': "data(label)",
                'width': "data(width)",
                'height': "data(height)",
                'font-size': "8px",
                'text-wrap': "wrap",
                'text-valign': "center",
                'text-halign': "center",
                'opacity': 0.8,
                'border-opacity': 1.0
            }
        },

        {
            'selector': ".router.PE",
            'style': {
                'border-color': "#000",
                'border-width': 1,
                'shape': "rectangle",
                'background-color': "#40e0d0",  // turquoise
                'label': "data(label)",
                'width': "data(width)",
                'height': "data(height)",
                'font-size': "8px",
                'text-wrap': "wrap",
                'text-valign': "center",
                'text-halign': "center",
                'opacity': 0.8,
                'border-opacity': 1.0
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
                'font-size': "8px",
                'text-wrap': "wrap",
                'text-valign': "center",
                'text-halign': "center",
                'opacity': 0.8,
                'border-opacity': 1.0
            }
        },

        {
            'selector': ".bundle_ether",
            'style': {
                'shape': "rectangle",
                'label': "data(label)",
                'text-wrap': "wrap",
                'text-valign': "center",
                'text-halign': "center",
                'font-size': "8px",
                'background-color': "#f0e68c",  // khaki
                'border-width': 0,
                'opacity': 1
            }
        },

        {
            'selector': ".bundle_ether_port",
            'style': {
                'border-width': 3
            }
        },

    ];
    Array.prototype.push.apply(iida.styles.cy, commons);


    iida.styles.cy2 = [

        {
            'selector': ".router.P",
            'style': {
                'border-color': "#000",
                'border-width': 1,
                'shape': "round-rectangle",
                'background-color': "#20b2aa",  // lightseagreen
                'label': "data(id)",
                'width': "data(width)",
                'height': "data(height)",
                'font-size': "10px",
                'text-valign': "center",
                'text-halign': "center"
            }
        },

        {
            'selector': ".router.PE",
            'style': {
                'border-color': "#000",
                'border-width': 1,
                'shape': "round-rectangle",
                'background-color': "#40e0d0",  // turquoise
                'label': "data(id)",
                'width': "data(width)",
                'height': "data(height)",
                'font-size': "10px",
                'text-valign': "center",
                'text-halign': "center"
            }
        },

        {
            'selector': "edge",
            'style': {
                "curve-style": "straight",
                'line-color': "#0000ff",  // blue
                'target-arrow-color': "#0000ff",  // blue
                'source-arrow-color': "#0000ff",  // blue
                'target-arrow-shape': "circle",
                'source-arrow-shape': "circle",
                'width': 2,
                'text-wrap': "wrap",
                'label': edge => edge.data('weight') ? `\u2060${edge.data('weight')}\n\n\u2060` : '',
                'font-size': "20px"
            }
        },

        {
            'selector': ".semitransp",
            'style': { "opacity": "0.2" }
        },

    ];
    Array.prototype.push.apply(iida.styles.cy2, commons);

    //
})();
