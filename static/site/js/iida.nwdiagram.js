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

                cy.$('.router').forEach(function (n) {
                    n.data('old_x', n.position().x);
                    n.data('old_y', n.position().y);
                });
            });

            // on drag, find drag_with nodes and set new position
            cy.on('drag', '.router', function (evt) {
                var delta_x = evt.target.position().x - evt.target.data('grab_x');
                var delta_y = evt.target.position().y - evt.target.data('grab_y');

                var targets = evt.target.data('drag_with') || [];
                targets.forEach(function (target) {
                    var n = cy.$id(target);
                    if (n && !n.grabbed()) {
                        var old_x = n.data('old_x');
                        var old_y = n.data('old_y');
                        n.position({ x: old_x + delta_x, y: old_y + delta_y });
                    }
                });
            });

            // on position, fix port position
            cy.on('position', '.router', function (evt) {
                var router = evt.target;
                var router_position = router.position();

                var ports = cy.nodes().filter(function (n) {
                    if (n.data('router_id') === router.id()) {
                        return n;
                    }
                });
                ports.forEach(port => {
                    var offset_x = port.data('offset_x');
                    var offset_y = port.data('offset_y');
                    port.position({ x: router_position.x + offset_x, y: router_position.y + offset_y })
                });
            });

            cy.on('select', '.router', function (evt) {
                var ports = evt.target.data('ports') || [];
                ports.forEach(p => {
                    console.log(p.id);
                });
            });

            cy.on('mouseover', 'node', function (evt) {
                evt.target.addClass('mouseover');
                // cy.elements().difference(evt.target.outgoers()).not(evt.target).addClass('semitransp');
                // evt.target.addClass('highlight').outgoers().addClass('highlight');

                var tip_div = document.getElementById('cy_tip');
                show_node_tooltip(tip_div, evt.target);
            });

            cy.on('mouseout', 'node', function (evt) {
                evt.target.removeClass('mouseover');
                // cy.elements().removeClass('semitransp');
                // evt.target.removeClass('highlight').outgoers().removeClass('highlight');
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


        // get edge between two nodes
        function get_edge_by_nodes(cy, start_node_id, end_node_id) {
            var edges = cy.edges().filter(edge => {
                var source_id = edge.source().data('id');
                var target_id = edge.target().data('id');
                return (start_node_id === source_id || start_node_id === target_id) && (end_node_id === source_id || end_node_id === target_id);
            });
            if (edges && edges.length > 0) {
                return edges[0];
            }
            return undefined;
        }

        // the button to revert to initial position
        var initial_position = document.getElementById('idInitialPosition');
        if (initial_position) {
            initial_position.addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                animate_to_initial_position(cy);
            });
        }

        function get_initial_position(node) { return node.data('initial_position'); }

        function animate_to_initial_position(cy) {
            Promise.all(cy.nodes('.router').map(node => {
                return node.animation({
                    position: get_initial_position(node),
                    duration: 1000,
                    easing: "ease"
                }).play().promise();
            }));
        }

        // the dropdown list to change layout
        var layout_change = document.getElementById('idLayout');
        if (layout_change) {
            layout_change.addEventListener('change', function (evt) {
                set_layout(cy2, evt.target.value);
            });
        }

        // currently not used
        // change data dynamically
        var data_change = document.getElementById('idData');
        if (data_change) {
            data_change.addEventListener('change', function (evt) {
                CyData.set_data(cy, evt.target.value);
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

        function set_elements(cy, eles) {
            cy.elements().remove();
            cy.reset();
            cy.add(eles);
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
                bundleEtherDiv.appendChild(input);
                bundleEtherDiv.appendChild(label);

                bundleEtherDiv.appendChild(document.createElement('br'));

                input.addEventListener('change', function (evt) {
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


    };
    //
})();
