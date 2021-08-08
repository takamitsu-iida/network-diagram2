/* global cytoscape, iida */

(function () {

    iida.nwdiagram = function () {

        var cy_container = document.getElementById('cy');
        if (cy_container) {
            var cy = window.cy = cytoscape({
                container: cy_container,
                minZoom: 0.1,
                maxZoom: 3,
                boxSelectionEnabled: true,
                autounselectify: false,  // true if all nodes are unselectable
                selectionType: "single",  // "single" or "additive",
                style: iida.styles.cy,
                layout: { 'name': "preset" },
                elements: []
            });

            // add the panzoom control with default parameter
            // https://github.com/cytoscape/cytoscape.js-panzoom
            cy.panzoom({});

            // on grab, all router node save own position
            cy.on('grab', '.router', function (evt) {
                evt.target.data('grab_x', evt.target.position().x);
                evt.target.data('grab_y', evt.target.position().y);

                cy.$('.router').forEach(router => {
                    var position = router.position();
                    router.data('old_x', position.x);
                    router.data('old_y', position.y);
                });
            });

            // on drag, find drag_with nodes and set new position
            cy.on('drag', '.router', function (evt) {
                var delta_x = evt.target.position().x - evt.target.data('grab_x');
                var delta_y = evt.target.position().y - evt.target.data('grab_y');

                var targets = evt.target.data('drag_with') || [];
                targets.forEach(target => {
                    var router = cy.$id(target);
                    if (router && !router.grabbed()) {
                        var old_x = router.data('old_x');
                        var old_y = router.data('old_y');
                        router.position({ x: old_x + delta_x, y: old_y + delta_y });
                    }
                });
            });

            // on position, fix port position
            cy.on('position', '.router', function (evt) {
                var router = evt.target;
                var router_position = router.position();
                var ports = router.data('ports') || [];
                ports.forEach(p => {
                    var port_id = router.id() + p.id;
                    var port = cy.$id(port_id);
                    if (port) {
                        var offset_x = port.data('offset_x');
                        var offset_y = port.data('offset_y');
                        port.position({ x: router_position.x + offset_x, y: router_position.y + offset_y })
                    }
                });
                /*
                var ports = cy.nodes().filter(n => {
                    return n.data('router_id') === router.id();
                });

                ports.forEach(port => {
                    var offset_x = port.data('offset_x');
                    var offset_y = port.data('offset_y');
                    port.position({ x: router_position.x + offset_x, y: router_position.y + offset_y })
                });
                */
            });

            /*
            cy.on('select', '.router', function (evt) {
                var ports = evt.target.data('ports') || [];
                ports.forEach(p => {
                    console.log(p.id);
                });
            });
            cy.on('unselect', '.router', function (evt) {
                if (cy.$('.router:selected').length === 0) {
                    cy.batch(function () {
                        cy.nodes().show();
                    });
                }
            });
            */

            cy.on('mouseover', 'node', function (evt) {
                evt.target.addClass('mouseover');

                var tip_div = document.getElementById('cy_tip');
                show_node_tooltip(tip_div, evt.target);
            });

            cy.on('mouseout', 'node', function (evt) {
                evt.target.removeClass('mouseover');
            });

            // add elements
            set_elements(cy, iida.appdata.elements);

            // run "grid" layout
            set_layout(cy, "grid");
        }


        var cy2_container = document.getElementById('cy2');
        if (cy2_container) {
            var cy2 = window.cy2 = cytoscape({
                container: cy2_container,
                minZoom: 0.1,
                maxZoom: 3,
                boxSelectionEnabled: true,
                autounselectify: false,
                selectionType: "single",  // "single" or "additive",
                style: iida.styles.cy2,
                layout: { 'name': "preset" },
                elements: []
            });

            cy2.on('mouseover', 'node', function (evt) {
                evt.target.addClass('mouseover');
                // cy.elements().difference(evt.target.outgoers()).not(evt.target).addClass('semitransp');
                // evt.target.addClass('highlight').outgoers().addClass('highlight');

                var tip_div = document.getElementById('cy2_tip');
                show_node_tooltip(tip_div, evt.target);
            });

            cy2.on('mouseout', 'node', function (evt) {
                evt.target.removeClass('mouseover');
                // cy.elements().removeClass('semitransp');
                // evt.target.removeClass('highlight').outgoers().removeClass('highlight');
            });

            // add elements
            set_elements(cy2, iida.appdata.topology_elements);

            // run "grid" layout
            set_layout(cy2, "grid");
        }


        function set_elements(cy, eles) {
            cy.batch(function () {
                cy.elements().remove();
                cy.reset();
                cy.add(eles);
            })
        }


        function set_layout(cy, layout_name) {
            if (layout_name === 'preset') {
                animate_to_initial_position(cy);
                return;
            }
            var option = iida.layouts[layout_name] || {
                name: layout_name,
                fit: true,
                animate: true
            }
            cy.$('.router').layout(option).run();
            // cy.layout(option).run();
        }


        function show_node_tooltip(tip_div, node) {
            // remove child
            while (tip_div.lastChild) {
                tip_div.removeChild(tip_div.lastChild);
            }

            // create table
            var table = document.createElement('table');

            var tr = table.insertRow();
            var td_title = tr.insertCell();
            var td_value = tr.insertCell();
            td_title.innerText = 'id';
            td_value.innerText = node.data('id');

            var ports = node.data('ports') || [];
            ports.forEach(port => {
                var tr = table.insertRow();
                var td_title = tr.insertCell();
                var td_value = tr.insertCell();
                td_title.innerText = '';
                td_value.innerText = port.id || "";
            });

            tip_div.append(table);
        }


        // the button to revert to initial position
        var initial_position = document.getElementById('idInitialPosition');
        if (initial_position) {
            initial_position.addEventListener('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                animate_to_initial_position(cy);
            });
        }


        function get_initial_position(node) { return node.data('initial_position') || { x: 0, y: 0 }; }


        function animate_to_initial_position(cy) {
            Promise.all(cy.nodes('.router').map(node => {
                return node.animation({
                    position: get_initial_position(node),
                    duration: 500,
                    easing: "ease"
                }).play().promise();
            }));
        }


        // the dropdown list to change layout
        var layout_change = document.getElementById('idLayout');
        if (layout_change) {
            layout_change.addEventListener('change', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                set_layout(cy2, evt.target.value);
            });
        }


        function create_tag(tag, attrs, children) {
            var el = document.createElement(tag);
            Object.keys(attrs).forEach(function (key) {
                var val = attrs[key];
                el.setAttribute(key, val);
            });
            children.forEach(function (child) {
                el.appendChild(child);
            });
            return el;
        }


        function create_a(link) {
            return create_tag('a', { 'target': '_blank', 'href': link.url, 'class': 'tip-link' }, [document.createTextNode(link.name)]);
        }


        var bundleEtherDiv = document.getElementById('idBundleEther');
        if (bundleEtherDiv) {
            iida.appdata.bundle_ethers.forEach(be => {
                var input = document.createElement('input');
                input.setAttribute('type', 'checkbox');
                input.setAttribute('id', be.id);
                input.setAttribute('value', be.id);
                input.setAttribute('name', be.id);

                var label = document.createElement('label');
                label.htmlFor = be.id;
                label.appendChild(document.createTextNode(be.id));

                var div = document.createElement('div');
                div.appendChild(input);
                div.appendChild(label);
                bundleEtherDiv.appendChild(div);

                input.addEventListener('change', function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();

                    var id = evt.target.value;

                    if (evt.target.checked) {
                        var parent = cy.add({
                            'group': 'nodes',
                            'data': { 'id': id, 'label': id },
                            'grabbable': false,
                            'classes': ["bundle_ether"]
                        });
                        be.ports.forEach(p => {
                            var port = cy.$id(p);
                            if (port) {
                                port.move({ 'parent': id });
                                port.addClass("bundle_ether_port");
                            }
                        });

                    } else {
                        be.ports.forEach(p => {
                            var port = cy.$id(p);
                            if (port) {
                                port.move({ parent: null });
                                port.removeClass("bundle_ether_port");
                            }
                        });
                        var parent = cy.$id(id);
                        if (parent) {
                            cy.remove(parent);
                        }
                    }

                });

            });
        }


        var neighborButton = document.getElementById("idNeighbor");
        if (neighborButton) {
            neighborButton.addEventListener('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                var roots = cy2.$('node:selected');
                show_neighbors(cy2, roots);
            });
        }


        function show_neighbors(cy, roots) {
            if (!roots || roots.length === 0) {
                cy.nodes().show();
                return;
            }
            cy.batch(function () {
                cy.nodes().hide();
                roots.neighborhood().nodes().show();
                roots.show();
            });
        }


        var connectedButton = document.getElementById("idConnected");
        if (connectedButton) {
            connectedButton.addEventListener('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                var roots = cy.$('.router:selected');
                show_connected(cy, roots);
            });
        }


        function show_connected(cy, roots) {
            if (!roots || roots.length === 0) {
                cy.nodes().show();
                return;
            }

            var eles = [];
            roots.forEach(root => {
                eles.push(root);
                var router_id = root.id();
                var ports = root.data('ports') || [];
                ports.forEach(p => {
                    var port = cy.$id(router_id + p.id);
                    if (port) {
                        if (!eles.includes(port)) {
                            eles.push(port);
                        }
                        var edges = port.connectedEdges();
                        if (edges) {
                            edges.forEach(edge => {
                                if (eles.includes(edge)) {
                                    eles.push(edge);
                                }
                                var peer_port = (edge.source() === port) ? edge.target() : edge.source();
                                if (!eles.includes(peer_port)) {
                                    eles.push(peer_port);
                                }
                                var peer_router_id = peer_port.data('router_id');
                                var peer_router = cy.$id(peer_router_id);
                                if (peer_router) {
                                    if (!eles.includes(peer_router)) {
                                        eles.push(peer_router);
                                    }
                                }
                            });
                        }
                    }
                });
            });

            var subgraph = cy.collection(eles);

            cy.batch(function () {
                cy.nodes().hide();
                subgraph.show();
            });

        }


        // the checkbox to show or hide redundant system
        [1, 2].forEach(redundant_number => {
            var checkbox = document.getElementById('idRedundant' + redundant_number);
            if (checkbox) {
                checkbox.addEventListener('change', function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    show_redundant(cy, redundant_number, evt.target.checked);
                });
            }
        });


        function show_redundant(cy, redundant_number, show) {
            var routers = cy.nodes('.router').filter(r => {
                var redundant = r.data('redundant');
                return redundant_number === redundant;
            });
            routers.forEach(router => {
                var router_id = router.id();
                var ports = router.data('ports') || [];
                ports.forEach(p => {
                    var port_id = router_id + p.id;
                    var port = cy.$id(port_id);
                    if (port) {
                        show_hide_element(port, show)
                        var edges = port.connectedEdges();
                        edges.forEach(edge => {
                            show_hide_element(edge, show);
                        });
                    }
                });
                show_hide_element(router, show);
            });
        }


        function show_hide_element(element, show) {
            if (show) {
                element.removeClass('hidden');
            } else {
                element.addClass('hidden');
            }
        }



    };
    //
})();
