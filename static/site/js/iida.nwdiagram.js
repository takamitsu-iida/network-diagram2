/* global cytoscape, iida */

(function () {

    iida.nwdiagram = function () {

        var cy_container = document.getElementById('cy');
        if (cy_container) {
            var cy = window.cy = cytoscape({
                container: cy_container,
                minZoom: 0.1,
                maxZoom: 5,
                hideEdgesOnViewport: false,
                textureOnViewport: false,
                boxSelectionEnabled: true,
                autounselectify: false,  // true if all nodes are unselectable
                selectionType: "single",  // "single" or "additive",
                style: iida.styles.physical,
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
            });

            cy.on('select', '.router', function (evt) {
                var tip_div = document.getElementById('cy_tip');
                show_node_tooltip(tip_div, evt.target);
            });

            cy.on('unselect', '.router', function (evt) {
                var tip_div = document.getElementById('cy_tip');
                clear_node_tooltip(tip_div);
                /*
                if (cy.$('.router:selected').length === 0) {
                    cy.batch(function () {
                        cy.nodes().show();
                    });
                }
                */
            });

            cy.on('mouseover', 'node', function (evt) {
                evt.target.addClass("mouseover");
            });

            cy.on('mouseout', 'node', function (evt) {
                evt.target.removeClass("mouseover");
            });

            cy.on('pan zoom resize', function (evt) {
                cy.elements().forEach(element => {
                    if (element.update_popper) {
                        element.update_popper();
                    }
                });
            });

            // set elements and run "grid" layout
            cy.batch(function () {
                set_elements(cy, "physical", iida.appdata.elements);
                set_layout(cy, "grid");
            });
        }


        function set_style(cy, stylesheet) {
            cy.style(stylesheet);
        }


        function set_elements(cy, name, eles) {
            // save element name
            cy.iida_data_name = name;

            // first remove popper
            remove_popper(cy);

            // and then remove elements
            cy.elements().remove();

            // reset zoom etc
            cy.reset();

            // add elements
            cy.add(eles);

            // create new popper if physical diagram
            if (name === "physical") {
                cy.elements().forEach(element => {
                    if (element.data('popper') && element.data('popper') !== "") {
                        create_popper(cy, element);
                    }
                });
            }
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


        function create_popper(cy, node) {
            var popper_div = document.createElement('div');
            popper_div.classList.add('popper-div');

            // document.body.appendChild(popper_div);
            cy.container().appendChild(popper_div);

            // create popper object
            var popper = node.popper({
                content: () => {
                    popper_div.innerHTML = node.data('popper');
                    return popper_div;
                },
                popper: {
                    placement: "top",
                    modifiers: [
                        {
                            'name': "offset",
                            'options': {
                                'offset': [0, 5],
                            },
                        },
                    ]
                }
            });

            function update_popper() {
                popper_div.style.display = "none";
                do_later(function () {
                    var zoom = cy.zoom();
                    var fontSize = Math.round(12 * zoom);
                    fontSize = Math.max(3, fontSize);
                    fontSize = Math.min(20, fontSize);
                    popper_div.style.fontSize = fontSize + "pt";

                    // fontSize 3 is too small to read
                    if (fontSize === 3) {
                        if (popper_div.style.display === '') {
                            popper_div.style.display = 'none';
                        }
                    } else {
                        if (popper_div.style.display !== '') {
                            popper_div.style.display = '';
                        }
                    }
                    popper.update();
                }, 200);
            };

            function do_later(job, tmo) {
                if (job in do_later.TID) {
                    window.clearTimeout(do_later.TID[job]);
                }
                do_later.TID[job] = window.setTimeout(
                    function () {
                        delete do_later.TID[job];
                        try {
                            job.call();
                        } catch (e) {
                            alert("EXCEPTION CAUGHT : " + job);
                        }
                    }, tmo);
            }
            do_later.TID = {};

            // save these objects in node for later accessibility (ex. remove popper)
            node.popper_div = popper_div;
            node.update_popper = update_popper;
            node.popper_obj = popper;

            // register event handler
            node.on('position', update_popper);
        }


        function remove_popper(cy) {
            cy.elements().forEach(element => {
                if (element.popper_div) {
                    element.popper_div.remove();
                }
                if (element.update_popper) {
                    cy.removeListener('pan zoom resize', element.update_popper);
                    element.removeListener('position', element.update_popper);
                }
                if (element.popper_obj) {
                    element.popper_obj.destroy();
                }
            });
        }


        // on click data_change link
        ["idPhysical", "idTopology", "idPath"].forEach(id => {
            var a = document.getElementById(id);
            if (!a) { return; }
            a.addEventListener('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                document.getElementsByName("data_change").forEach(element => { element.classList.remove("active"); });
                evt.target.classList.add("active");
                if (id === "idTopology") {
                    set_style(cy, iida.styles.topology);
                    cy.batch(function () {
                        set_elements(cy, "topology", iida.appdata.topology_elements);
                        set_layout(cy, "grid");
                    });
                } else if (id === "idPath") {
                    console.log(id);
                } else {
                    set_style(cy, iida.styles.physical);
                    cy.batch(function () {
                        set_elements(cy, "physical", iida.appdata.elements);
                        set_layout(cy, "grid");
                    });
                }
            });
        });


        function clear_node_tooltip(tip_div) {
            // remove children
            while (tip_div.lastChild) {
                tip_div.removeChild(tip_div.lastChild);
            }
        }


        function show_node_tooltip(tip_div, node) {
            clear_node_tooltip(tip_div);

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
                cy.elements().forEach(element => {
                    if (element.popper_div && element.popper_div.style.visibility !== "") {
                        element.popper_div.style.visibility = "";
                    }
                });
                return;
            }

            if (cy.iida_data_name === "topology") {
                cy.batch(function () {
                    cy.nodes().hide();
                    roots.neighborhood().nodes().show();
                    roots.show();
                });
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
                cy.elements().forEach(element => {
                    if (element.popper_div && element.popper_div.style.visibility !== "hidden") {
                        element.popper_div.style.visibility = "hidden";
                    }
                });
                subgraph.show();
                cy.elements(subgraph).forEach(element => {
                    if (element.popper_div && element.popper_div.style.visibility !== "") {
                        element.popper_div.style.visibility = "";
                    }
                });
            });
        }


        // filter by redundant system number #1 or #2 or #1-#2
        [12, 1, 2].forEach(redundant_number => {
            var a = document.getElementById('idRedundant' + redundant_number);
            if (!a) {
                return;
            }
            a.addEventListener('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                document.getElementsByName("redundant_filter").forEach(element => {
                    element.classList.remove("active");
                });
                evt.target.classList.add("active");
                if (redundant_number === 1) {
                    show_redundant(cy, 1, true);
                    show_redundant(cy, 2, false);
                } else if (redundant_number === 2) {
                    show_redundant(cy, 2, true);
                    show_redundant(cy, 1, false);
                } else {
                    show_redundant(cy, 1, true);
                    show_redundant(cy, 2, true);
                }
            });
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
                        show_hide_element(port, show);
                        port.connectedEdges().forEach(edge => { show_hide_element(edge, show); });
                    }
                });
                router.connectedEdges().forEach(edge => { show_hide_element(edge, show); })
                show_hide_element(router, show);
            });
        }


        function show_hide_element(element, show) {
            if (show) {
                element.removeClass("hidden");
                if (element.popper_div) {
                    element.popper_div.classList.remove("hidden");
                }
            } else {
                element.addClass("hidden");
                if (element.popper_div) {
                    element.popper_div.classList.add("hidden");
                }
            }
        }

        var CyShortestPath = (function () {
            var _dijkstra = function (cy, start_node_id, end_node_id) {

                // get start node by id
                var start_node = cy.filter('node[id="' + start_node_id + '"]');
                if (!start_node) {
                    return;
                }
                // get end node by id
                var end_node = cy.filter('node[id="' + end_node_id + '"]');
                if (!end_node) {
                    return;
                }

                // eles.dijkstra( options )
                // options
                //    root: The root node (selector or collection) where the algorithm starts.
                //    weight: function(edge) [optional] A function that returns the positive numeric weight for the edge. The weight indicates the cost of going from one node to another node.
                //    directed: [optional] A boolean indicating whether the algorithm should only go along edges from source to target (default false).
                var dijkstra = cy.elements().not('.disabled').dijkstra(start_node, function (edge) {
                    return edge.data('weight');
                }, false);

                var results = dijkstra.pathTo(end_node);
                // results.forEach(r => { console.log(r.id()); });

                // set cy2 elements
                /*
                if (cy2) {
                    cy2.batch(function () {
                        cy2.elements().remove();
                        cy2.add(results);
                        cy2.layout({ 'name': "grid" }).run();
                    });
                }
                */

                var step = 0;
                var highlight_next = function () {
                    var el = results[step];
                    if (el/* && el.isEdge()*/) {
                        // console.log(el.id());
                        el.addClass("highlighted");
                    }
                    if (step < results.length) {
                        step++;
                        // setTimeout(highlight_next, 500);
                        highlight_next();
                    }
                };

                highlight_next();
            }

            var _clear = function (cy) {
                cy.elements().removeClass("highlighted");
            }

            return {
                dijkstra: _dijkstra,
                clear: _clear
            }
        })();


        var dijkstra_button = document.getElementById('idDijkstra');
        if (dijkstra_button) {
            dijkstra_button.addEventListener('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                var src = "C棟ユーザ収容ルータ#2";
                var dst = "C棟サービス収容ルータ#2";
                if (cy.iida_data_name === "physical") {
                    src = "_" + src;
                    dst = "_" + dst;
                }

                CyShortestPath.dijkstra(cy, src, dst);
            });
        }

        var disconnect_button = document.getElementById('idDisconnect');
        if (disconnect_button) {
            disconnect_button.addEventListener('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                var src_port_id = "C棟コアルータ#1Hu0/0/0/16";
                var dst_port_id = "C棟サービス収容ルータ#1Hu0/0/0/20";

                var src_port = cy.$id(src_port_id);
                var dst_port = cy.$id(dst_port_id);
                var edges = src_port.edgesWith(dst_port);
                edges.addClass("disabled");
                cy.elements().removeClass("highlighted");

                var src = "C棟ユーザ収容ルータ#2";
                var dst = "C棟サービス収容ルータ#2";
                if (cy.iida_data_name === "physical") {
                    src = "_" + src;
                    dst = "_" + dst;
                }
                CyShortestPath.dijkstra(cy, src, dst);
            });
        }

    };
    //
})();
