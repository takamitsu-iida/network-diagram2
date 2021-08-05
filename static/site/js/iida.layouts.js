/* global iida */

(function () {

    iida.layouts.grid = {
        name: "grid",
        fit: true,
        animate: true
    }

    iida.layouts.circle = {
        name: "circle",
        fit: true,
        animate: true
    }

    iida.layouts.concentric = {
        name: "concentric",
        fit: true,
        animate: true
    }

    iida.layouts.breadthfirst = {
        name: "breadthfirst",
        fit: true,
        animate: true
    }

    // fcose
    // https://github.com/iVis-at-Bilkent/cytoscape.js-fcose
    iida.layouts.fcose = {
        name: "fcose",

        // quality: "default",  // default,
        // randomize: true,

        quality: "proof",
        randomize: false,  // if quality is "proof"

        animate: true,
        animationDuration: 1000,
        animationEasing: "ease",
        fit: true,  // default is true
        padding: 20,

        // Separation amount between nodes
        nodeSeparation: 300,

        // Ideal edge (non nested) length
        idealEdgeLength: edge => 300,

        // Fix desired nodes to predefined positions
        // [{nodeId: 'n1', position: {x: 100, y: 200}}, {...}]
        fixedNodeConstraint: undefined,

        // Align desired nodes in vertical/horizontal direction
        // {vertical: [['n1', 'n2'], [...]], horizontal: [['n2', 'n4'], [...]]}
        alignmentConstraint: {
            'vertical': [
                ["C棟コアルータ#1", "C棟コアルータ#2"],
                ["B棟コアルータ#1", "B棟コアルータ#2"],
                ["C棟ユーザ収容ルータ#1", "C棟ユーザ収容ルータ#2"],
                ["C棟ユーザ収容ルータ#3", "C棟ユーザ収容ルータ#4"],
                ["B棟ユーザ収容ルータ#1", "B棟ユーザ収容ルータ#2"],
                ["B棟ユーザ収容ルータ#3", "B棟ユーザ収容ルータ#4"],
                ["B棟サービス収容ルータ#1", "B棟サービス収容ルータ#2"],
                ["C棟サービス収容ルータ#1", "C棟サービス収容ルータ#2"]],
        },

        // Place two nodes relatively in vertical/horizontal direction
        // [{top: 'n1', bottom: 'n2', gap: 100}, {left: 'n3', right: 'n4', gap: 75}, {...}]
        relativePlacementConstraint: [
            { left: "C棟コアルータ#1", right: "B棟コアルータ#1", gap: 1200 }
        ],
    };

})();
