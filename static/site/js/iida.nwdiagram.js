/* global cytoscape, iida */

(function () {

    iida.nwdiagram = function () {

        var nwdiagram_state = {
            'data_name': "physical",  // or "topology"
            'show_popper': false,
            'shortest_path_duration': 1000,  // msec
        }

        var cy_container = document.getElementById("cy");
        if (cy_container) {
            var cy = window.cy = cytoscape({
                container: cy_container,
                minZoom: 0.3,
                maxZoom: 5,
                wheelSensitivity: 0.4,
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
            cy.on("grab", ".router", function (evt) {
                evt.target.data('grab_x', evt.target.position().x);
                evt.target.data('grab_y', evt.target.position().y);

                cy.$(".router").forEach(router => {
                    var position = router.position();
                    router.data('old_x', position.x);
                    router.data('old_y', position.y);
                });
            });

            // on drag, find drag_with nodes and set new position
            cy.on("drag", ".router", function (evt) {
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
            cy.on("position", ".router", function (evt) {
                var router = evt.target;
                var router_position = router.position();
                var ports = router.data('ports') || [];
                var port_id;

                function fix_port_position(port) {
                    if (port) {
                        var offset_x = port.data('offset_x') || 0;
                        var offset_y = port.data('offset_y') || 0;
                        port.position({ x: router_position.x + offset_x, y: router_position.y + offset_y })
                    }
                }

                // fix port position
                ports.forEach(p => {
                    port_id = router.id() + p.id;
                    fix_port_position(cy.$id(port_id));
                });

                // fix root_port position
                port_id = "_" + router.id();
                fix_port_position(cy.$id(port_id));
            });

            cy.on("select", ".router", function (evt) {
                var tip_div = document.getElementById("idTipDiv");
                show_tooltip_node(tip_div, evt.target);
            });

            cy.on("select", "edge", function (evt) {
                var tip_div = document.getElementById("idTipDiv");
                show_tooltip_edge(tip_div, evt.target);
            });

            cy.on("unselect", function (evt) {
                var tip_div = document.getElementById("idTipDiv");
                hide_tooltip(tip_div);
            });

            cy.on("mouseover", "node", function (evt) {
                evt.target.addClass("mouseover");
            });

            cy.on("mouseout", "node", function (evt) {
                evt.target.removeClass("mouseover");
            });

            cy.on("pan zoom resize", function (evt) {
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


        function set_elements(cy, name, eles) {
            // save element name
            nwdiagram_state.data_name = name;

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
            cy.$(".router").layout(option).run();
            // cy.layout(option).run();
        }


        function create_popper(cy, node) {
            var popper_div = document.createElement("div");
            popper_div.classList.add("popper_div");

            // document.body.appendChild(popper_div);
            cy.container().appendChild(popper_div);

            // create but hide
            if (!nwdiagram_state.show_popper) {
                popper_div.classList.add("hidden");
            }

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
            node.on("position", update_popper);
        }


        function remove_popper(cy) {
            cy.elements().forEach(element => {
                if (element.popper_div) {
                    element.popper_div.remove();
                }
                if (element.update_popper) {
                    cy.removeListener("pan zoom resize", element.update_popper);
                    element.removeListener("position", element.update_popper);
                }
                if (element.popper_obj) {
                    element.popper_obj.destroy();
                }
            });
        }


        var idPopper = document.getElementById("idPopper");
        if (idPopper) {
            idPopper.addEventListener("change", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                nwdiagram_state.show_popper = evt.target.checked;
                cy.elements().forEach(element => {
                    show_hide_popper(element, nwdiagram_state.show_popper);
                });
            });
        }


        // on click link to change eles
        ["idPhysical", "idTopology"].forEach(id => {
            var a = document.getElementById(id);
            if (!a) { return; }
            a.addEventListener("click", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                document.getElementsByName("data_change").forEach(element => { element.classList.remove("active"); });
                evt.target.classList.add("active");

                var menu_p = document.getElementById("idMenuP");
                var menu_l = document.getElementById("idMenuL");
                if (id === "idTopology") {
                    cy.style(iida.styles.topology);
                    cy.batch(function () {
                        set_elements(cy, "topology", iida.appdata.topology_elements);
                        set_layout(cy, "grid");
                    });
                    menu_p.style.display = "none";
                    menu_l.style.display = "block";
                } else if (id === "idPhysical") {
                    cy.style(iida.styles.physical);
                    cy.batch(function () {
                        set_elements(cy, "physical", iida.appdata.elements);
                        set_layout(cy, "grid");
                    });
                    menu_l.style.display = "none";
                    menu_p.style.display = "block";
                }

                var tip_div = document.getElementById("idTipDiv");
                hide_tooltip(tip_div)
            });
        });


        function hide_tooltip(tip_div) {
            // remove all children
            while (tip_div.lastChild) {
                tip_div.removeChild(tip_div.lastChild);
            }
        }


        function show_tooltip_node(tip_div, node) {
            hide_tooltip(tip_div);

            if (nwdiagram_state.data_name === "topology") {
                // create enable/disable checkbox
                var input = document.createElement("input");
                input.setAttribute('type', "checkbox");
                input.setAttribute('id', "tip_div_" + node.id());
                input.setAttribute('value', node.id());
                input.checked = !node.hasClass("disabled");
                input.addEventListener("change", function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    node.connectedEdges().forEach(edge => {
                        if (evt.target.checked) {
                            edge.removeClass("disabled");
                        } else {
                            edge.addClass("disabled");
                        }
                    });
                    CyShortestPath.restart(cy);
                });

                var label = document.createElement("label");
                label.htmlFor = "tip_div_" + node.id();
                label.appendChild(document.createTextNode("enable/disable connected edges"));

                var div = document.createElement("div");
                div.appendChild(input);
                div.appendChild(label);
                tip_div.append(div);

                // create button "Set as source"
                input = create_tag("input", {'type': "button", 'value': "Set as source", 'style': "width: 50%;"}, []);
                input.addEventListener("click", function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    select_dijkstra_source.value = node.id();
                    CyShortestPath.restart(cy);
                });
                var p = create_tag("p", {}, [input]);
                tip_div.append(p);

                // create button "Set as target"
                input = create_tag("input", {'type': "button", 'value': "Set as target", 'style': "width: 50%;"}, []);
                input.addEventListener("click", function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    select_dijkstra_target.value = node.id();
                    CyShortestPath.restart(cy);
                });
                p = create_tag("p", {}, [input]);
                tip_div.append(p);
            }

            // create table
            var table = document.createElement("table");
            var tr, td_title, td_value;

            tr = table.insertRow();
            td_title = tr.insertCell();
            td_value = tr.insertCell();
            td_title.innerText = "id";
            td_value.innerText = node.data("id");

            var ports = node.data('ports') || [];
            ports.forEach(port => {
                tr = table.insertRow();
                td_title = tr.insertCell();
                td_value = tr.insertCell();
                td_title.innerText = "";
                td_value.innerText = port.id || "";
            });

            tip_div.append(table);
        }


        function show_tooltip_edge(tip_div, edge) {
            hide_tooltip(tip_div);

            if (nwdiagram_state.data_name === "topology") {
                // create enable/disable checkbox
                var input = document.createElement("input");
                input.setAttribute('type', "checkbox");
                input.setAttribute('id', "tip_div_" + edge.id());
                input.setAttribute('value', edge.id());
                input.checked = !edge.hasClass("disabled");
                input.addEventListener("change", function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    if (evt.target.checked) {
                        edge.removeClass("disabled");
                    } else {
                        edge.addClass("disabled");
                    }

                    CyShortestPath.restart(cy);
                });

                var label = document.createElement("label");
                label.htmlFor = "tip_div_" + edge.id();
                label.appendChild(document.createTextNode("enable/disable"));

                var div = document.createElement("div");
                div.appendChild(input);
                div.appendChild(label);
                tip_div.append(div);
            }

            // create table
            var table = document.createElement("table");
            var tr, td_title, td_value;

            tr = table.insertRow();
            td_title = tr.insertCell();
            td_value = tr.insertCell();
            td_title.innerText = "source";
            td_value.innerText = edge.source().data("id");

            tr = table.insertRow();
            td_title = tr.insertCell();
            td_value = tr.insertCell();
            td_title.innerText = "target";
            td_value.innerText = edge.target().data("id");

            tip_div.append(table);
        }


        // the button to revert to initial position
        var initial_position = document.getElementById("idInitialPosition");
        if (initial_position) {
            initial_position.addEventListener("click", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                animate_to_initial_position(cy);
            });
        }


        function get_initial_position(node) { return node.data('initial_position') || { x: 0, y: 0 }; }


        function animate_to_initial_position(cy) {
            Promise.all(cy.nodes(".router").map(node => {
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
            return create_tag("a", { 'target': "_blank", 'href': link.url, 'class': "tip-link" }, [document.createTextNode(link.name)]);
        }


        var bundleEtherDiv = document.getElementById("idBundleEther");
        if (bundleEtherDiv) {
            iida.appdata.bundle_ethers.forEach(bundle_ether => {
                var input = create_tag("input",
                    {
                        'type': "checkbox",
                        'id': bundle_ether.id,
                        'value': bundle_ether.id,
                        'name': bundle_ether.id
                    },
                    []
                );

                var label = document.createElement("label");
                label.htmlFor = bundle_ether.id;
                label.appendChild(document.createTextNode(bundle_ether.id));

                var div = create_tag("div", {}, [input, label]);

                bundleEtherDiv.appendChild(div);

                input.addEventListener("change", function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();

                    var id = evt.target.value;

                    if (evt.target.checked) {
                        var parent = cy.add({
                            'group': 'nodes',
                            'data': { 'id': id, 'label': bundle_ether.label || id },
                            'grabbable': false,
                            'classes': ["bundle_ether"]
                        });
                        bundle_ether.ports.forEach(p => {
                            var port = cy.$id(p);
                            if (port) {
                                port.move({ 'parent': id });
                                port.addClass("bundle_ether_port");
                            }
                        });
                    } else {
                        bundle_ether.ports.forEach(p => {
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
            connectedButton.addEventListener("click", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                var roots = cy.$(".router:selected");
                show_connected(cy, roots);
            });
        }


        function show_connected(cy, roots) {
            if (!roots || roots.length === 0) {
                cy.nodes().show();

                // cy.nodes().show() does not affect classes, change dom style visibility directly
                cy.elements().forEach(element => {
                    if (element.popper_div) {
                        element.popper_div.style.visibility = "";
                    }
                });

                return;
            }

            // in case of topology data, just show neighborhood()
            if (nwdiagram_state.data_name === "topology") {
                cy.batch(function () {
                    cy.nodes().hide();
                    roots.neighborhood().nodes().show();
                    roots.show();
                });
                return;
            }

            // in case of physical data, create subgraph and show it
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
                // hide all nodes
                cy.nodes().hide();

                // hide all poppers
                cy.elements().forEach(element => {
                    if (element.popper_div) {
                        element.popper_div.style.visibility = "hidden";
                    }
                });

                // show subgraph
                subgraph.show();

                // show poppers
                cy.elements(subgraph).forEach(element => {
                    if (element.popper_div) {
                        element.popper_div.style.visibility = "";
                    }
                });
            });
        }


        // filter by redundant system number #1 or #2 or #1-#2
        [12, 1, 2].forEach(redundant_number => {
            var a = document.getElementById("idRedundant" + redundant_number);
            if (!a) {
                return;
            }
            a.addEventListener("click", function (evt) {
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
            var routers = cy.nodes(".router").filter(r => {
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
            } else {
                element.addClass("hidden");
            }
            show_hide_popper(element, show);
        }


        function show_hide_popper(element, show) {
            var popper_div = element.popper_div;
            if (!popper_div) {
                return;
            }
            if (show) {
                if (nwdiagram_state.show_popper && !element.hasClass("hidden")) {
                    popper_div.classList.remove("hidden");
                }
            } else {
                popper_div.classList.add("hidden");
            }
        }


        var CyShortestPath = (function () {
            var _dijkstra = function (cy, start_node_id) {
                if (!CyShortestPath.dijkstra_result && !CyShortestPath.parameter_changed) {
                    return;
                }

                // get start node by id
                var start_node = cy.filter('node[id="' + start_node_id + '"]');
                if (!start_node) {
                    return;
                }

                // eles.dijkstra( options )
                // options
                //    root: The root node (selector or collection) where the algorithm starts.
                //    weight: function(edge) [optional] A function that returns the positive numeric weight for the edge. The weight indicates the cost of going from one node to another node.
                //    directed: [optional] A boolean indicating whether the algorithm should only go along edges from source to target (default false).
                CyShortestPath.dijkstra_result = cy.elements().not(".disabled").dijkstra(start_node, function (edge) {
                    return edge.data('weight');
                }, false);

                CyShortestPath.parameter_changed = false;
            }

            var _show_path_to = function (cy, target_node_id) {
                // get end node by id
                var target_node = cy.filter('node[id="' + target_node_id + '"]');
                if (!target_node) {
                    return;
                }

                if (!CyShortestPath.dijkstra_result) {
                    // first calc
                    CyShortestPath.dijkstra(cy, select_dijkstra_source.value);
                }

                // get cached dijkstra result
                var dijkstra = CyShortestPath.dijkstra_result;

                // calculate path_to
                var path_to = dijkstra.pathTo(target_node);

                /*
                // set cy2 elements
                if (cy2) {
                    cy2.batch(function () {
                        cy2.elements().remove();
                        cy2.add(path_to);
                        cy2.layout({ 'name': "grid" }).run();
                    });
                }
                */

                var step = 0;
                var highlight_next = function () {
                    var el = path_to[step];
                    if (el  /* && el.isEdge()*/) {
                        el.addClass("dijkstra_path");
                    }
                    if (step < path_to.length) {
                        step++;
                        // setTimeout(highlight_next, 500);
                        highlight_next();
                    }
                };
                highlight_next();

                path_to[0].addClass("dijkstra_source");
                path_to[path_to.length - 1].addClass("dijkstra_target");
                cy.elements().difference(path_to).not(target_node).addClass("dijkstra_semitransp");
            }

            var _hide_path_to = function (cy) {
                cy.elements().removeClass("dijkstra_path");
                cy.elements().removeClass("dijkstra_source");
                cy.elements().removeClass("dijkstra_target");
                cy.elements().removeClass("dijkstra_semitransp");
            }

            var _restart = function (cy) {
                CyShortestPath.parameter_changed = true;
                CyShortestPath.dijkstra(cy, select_dijkstra_source.value);  // calc dijkstra
                select_dijkstra_target.dispatchEvent(new Event('change'));  // and show path to this target
            }

            return {
                'dijkstra': _dijkstra,
                'dijkstra_result': null,
                'show_path_to': _show_path_to,
                'hide_path_to': _hide_path_to,
                'is_running': false,
                'parameter_changed': true,  // true if weight changed, disabled state changed, etc
                'restart': _restart,
            }
        })();


        // slider for edge #1-#1
        var cost_1_1 = document.getElementById("cost_1_1");
        if (cost_1_1) {
            cost_1_1.addEventListener('input', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                document.getElementById("cost_1_1_value").innerText = evt.target.value;
                set_edge_weight(cy);
            });
        }


        // slider for edge #1-#2
        var cost_1_2 = document.getElementById("cost_1_2");
        if (cost_1_2) {
            cost_1_2.addEventListener("input", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                document.getElementById("cost_1_2_value").innerText = evt.target.value;
                set_edge_weight(cy);
            });
        }


        // slider for edge #2-#2
        var cost_2_2 = document.getElementById("cost_2_2");
        if (cost_2_2) {
            cost_2_2.addEventListener("input", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                document.getElementById("cost_2_2_value").innerText = evt.target.value;
                set_edge_weight(cy);
            });
        }


        var set_edge_weight = function (cy) {
            cy.edges().forEach(edge => {
                var source_redundant_system = edge.source().data("redundant") || 1;
                var target_redundant_system = edge.target().data("redundant") || 1;

                switch (source_redundant_system + target_redundant_system) {
                    case 2:  // #1-#1 main-main
                        edge.data('weight', parseInt(cost_1_1.value));
                        break;
                    case 3:  // #1-#2 main-back
                        edge.data('weight', parseInt(cost_1_2.value));
                        break;
                    case 4:  // #2-#2 back-back
                        edge.data('weight', parseInt(cost_2_2.value));
                        break;
                }
            });

            CyShortestPath.restart(cy);
        };


        var select_dijkstra_source = document.getElementById("idDijkstraSource");
        if (select_dijkstra_source) {
            iida.appdata.router_ids.forEach(router_id => {
                var option = document.createElement("option");
                option.text = router_id;
                option.value = router_id;
                select_dijkstra_source.appendChild(option);
            });
            select_dijkstra_source.addEventListener("change", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                CyShortestPath.restart(cy);
            });
        }


        var select_dijkstra_target = document.getElementById("idDijkstraTarget");
        if (select_dijkstra_target) {
            iida.appdata.router_ids.forEach(router_id => {
                var option = document.createElement("option");
                option.text = router_id;
                option.value = router_id;
                select_dijkstra_target.appendChild(option);
            });
            select_dijkstra_target.addEventListener("change", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                var target_id = evt.target.value;
                CyShortestPath.hide_path_to(cy);
                CyShortestPath.show_path_to(cy, target_id);
            });
        }


        var dijkstra_start_stop = document.getElementById("idDijkstraStartStop");
        if (dijkstra_start_stop) {
            dijkstra_start_stop.addEventListener('change', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                // disable or enable select and button
                CyShortestPath.is_running = select_dijkstra_source.disabled = select_dijkstra_target.disabled = dijkstra_start_stop.checked;

                // start or stop dijkstra calculation
                dijkstra_start_stop_func();
            });
        }


        function dijkstra_start_stop_func() {
            var router_ids = iida.appdata.router_ids;
            var source_index = 0;
            var target_index = 0;

            // move to current dropdown value
            router_ids.forEach(function (router_id, index) {
                if (select_dijkstra_source.value === router_id) {
                    source_index = index;
                }
                if (select_dijkstra_target.value === router_id) {
                    target_index = index;
                }
            });

            // trigger to calculate shortest path
            select_dijkstra_source.dispatchEvent(new Event('change'));

            // trigger to show path_to target
            select_dijkstra_target.dispatchEvent(new Event('change'));

            // select next source-target
            function move_next() {
                if (!CyShortestPath.is_running) {
                    return;
                }

                target_index++;
                if (target_index < router_ids.length) {
                    select_dijkstra_target.options[target_index].selected = true;
                    if (source_index === target_index) {
                        // source and target are same, just skip and move to next
                        move_next();
                    } else {
                        select_dijkstra_target.dispatchEvent(new Event('change'));
                        setTimeout(move_next, nwdiagram_state.shortest_path_duration);
                    }
                } else {
                    source_index++;
                    target_index = source_index;
                    if (source_index < router_ids.length) {
                        select_dijkstra_source.options[source_index].selected = true;
                        select_dijkstra_source.dispatchEvent(new Event('change'));
                        move_next();
                    } else {
                        // reach to end
                        console.log("done");
                        dijkstra_start_stop.checked = false;
                        CyShortestPath.is_running = select_dijkstra_source.disabled = select_dijkstra_target.disabled = dijkstra_start_stop.checked;
                    }
                }
            }
            move_next();
        }


        var dijkstra_clear_button = document.getElementById("idDijkstraClear");
        if (dijkstra_clear_button) {
            dijkstra_clear_button.addEventListener("click", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                CyShortestPath.hide_path_to(cy);
            });
        }


        var clear_disabled_edge_button = document.getElementById("idResetDisabledEdge");
        if (clear_disabled_edge_button) {
            clear_disabled_edge_button.addEventListener("click", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                cy.elements().removeClass("disabled");
                CyShortestPath.restart(cy);
                cy.elements().unselect();
            });
        }


        // DEBUG PURPOSE
        var debug_button = document.getElementById("idDebugButton");
        if (debug_button) {
            debug_button.addEventListener("click", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                cy.elements().forEach(element => {
                    console.log(element.id() + " " + element.position().x);

                });
            });
        }


    };
    //
})();
