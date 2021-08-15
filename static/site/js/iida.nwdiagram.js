/* global cytoscape, iida */

(function () {
  iida.nwdiagram = function () {
    var nwdiagramState = {
      dataName: 'physical', // or "topology"
      showPopper: false,
      shortestPathDuration: 1000, // msec
    };

    var cyContainer = document.getElementById('cy');
    if (cyContainer) {
      var cy = (window.cy = cytoscape({
        container: cyContainer,
        minZoom: 0.3,
        maxZoom: 5,
        wheelSensitivity: 0.2,
        hideEdgesOnViewport: false,
        textureOnViewport: false,
        boxSelectionEnabled: true,
        autounselectify: false, // true if all nodes are unselectable
        selectionType: 'single', // "single" or "additive",
        style: iida.styles.physical,
        layout: { name: 'preset' },
        elements: [],
      }));

      // add the panzoom control with default parameter
      // https://github.com/cytoscape/cytoscape.js-panzoom
      cy.panzoom({});

      // on grab, all router node save own position
      cy.on('grab', '.router', function (evt) {
        evt.target.data('grabX', evt.target.position().x);
        evt.target.data('grabY', evt.target.position().y);

        cy.$('.router').forEach((router) => {
          var position = router.position();
          router.data('oldX', position.x);
          router.data('oldY', position.y);
        });
      });

      // on drag, find dragWith nodes and set new position
      cy.on('drag', '.router', function (evt) {
        var deltaX = evt.target.position().x - evt.target.data('grabX');
        var deltaY = evt.target.position().y - evt.target.data('grabY');

        var targets = evt.target.data('dragWith') || [];
        targets.forEach((target) => {
          var router = cy.$id(target);
          if (router && !router.grabbed()) {
            var oldX = router.data('oldX');
            var oldY = router.data('oldY');
            router.position({ x: oldX + deltaX, y: oldY + deltaY });
          }
        });
      });

      // on position, fix port position
      cy.on('position', '.router', function (evt) {
        var router = evt.target;
        var routerPosition = router.position();
        var ports = router.data('ports') || [];
        var portId;

        function fixPortPosition(port) {
          if (port) {
            var offsetX = port.data('offsetX') || 0;
            var offsetY = port.data('offsetY') || 0;
            port.position({ x: routerPosition.x + offsetX, y: routerPosition.y + offsetY });
          }
        }

        // fix port position
        ports.forEach((p) => {
          portId = router.id() + p.id;
          fixPortPosition(cy.$id(portId));
        });

        // fix rootPort position, rootPort's id is "_" + routerId
        portId = '_' + router.id();
        fixPortPosition(cy.$id(portId));
      });

      cy.on('select', 'node', function (evt) {
        var tipDiv = document.getElementById('idTipDiv');
        showTooltipNode(tipDiv, evt.target);
      });

      cy.on('select', 'edge', function (evt) {
        var tipDiv = document.getElementById('idTipDiv');
        showTooltipEdge(tipDiv, evt.target);
      });

      cy.on('unselect', function (evt) {
        var tipDiv = document.getElementById('idTipDiv');
        hideTooltip(tipDiv);
      });

      cy.on('mouseover', 'node', function (evt) {
        evt.target.addClass('mouseover');
      });

      cy.on('mouseout', 'node', function (evt) {
        evt.target.removeClass('mouseover');
      });

      cy.on('pan zoom resize', function (evt) {
        cy.elements().forEach((element) => {
          if (element.updatePopper) {
            element.updatePopper();
          }
        });
      });

      // set elements and run "grid" layout
      cy.batch(function () {
        setCyElements(cy, 'physical', iida.appdata.elements);
        setCyLayout(cy, 'grid');
      });
    }

    function setCyElements(cy, name, eles) {
      // save element name
      nwdiagramState.dataName = name;

      // first remove popper
      removePopper(cy);

      // and then remove elements
      cy.elements().remove();

      // reset zoom etc
      cy.reset();

      // add elements
      cy.add(eles);

      // create new popper if physical diagram
      if (name === 'physical') {
        cy.elements().forEach((element) => {
          if (element.data('popper') && element.data('popper') !== '') {
            createPopper(cy, element);
          }
        });
      }
    }

    function setCyLayout(cy, layoutName) {
      if (layoutName === 'preset') {
        animateToInitialPosition(cy);
        return;
      }
      var option = iida.layouts[layoutName] || {
        name: layoutName,
        fit: true,
        animate: true,
      };
      cy.$('.router').layout(option).run();
      // cy.layout(option).run();
    }

    function createPopper(cy, node) {
      var popperDiv = document.createElement('div');
      popperDiv.classList.add('popperDiv');

      // document.body.appendChild(popperDiv);
      cy.container().appendChild(popperDiv);

      // hide the popperDiv
      if (!nwdiagramState.showPopper) {
        popperDiv.classList.add('hidden');
      }

      // create popper object
      var popper = node.popper({
        content: () => {
          popperDiv.innerHTML = node.data('popper');
          return popperDiv;
        },
        popper: {
          placement: 'top',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 5],
              },
            },
          ],
        },
      });

      function updatePopper() {
        popperDiv.style.display = 'none';
        doLater(function () {
          var zoom = cy.zoom();
          var fontSize = Math.round(12 * zoom);
          fontSize = Math.max(3, fontSize);
          fontSize = Math.min(20, fontSize);
          popperDiv.style.fontSize = fontSize + 'pt';

          // fontSize 3 is too small to read
          if (fontSize === 3) {
            if (popperDiv.style.display === '') {
              popperDiv.style.display = 'none';
            }
          } else {
            if (popperDiv.style.display !== '') {
              popperDiv.style.display = '';
            }
          }
          popper.update();
        }, 200);
      }

      function doLater(job, tmo) {
        if (job in doLater.TID) {
          window.clearTimeout(doLater.TID[job]);
        }
        doLater.TID[job] = window.setTimeout(function () {
          delete doLater.TID[job];
          try {
            job.call();
          } catch (e) {
            alert('EXCEPTION CAUGHT : ' + job);
          }
        }, tmo);
      }
      doLater.TID = {};

      // save these objects in node for later accessibility (ex. remove popper)
      node.popperDiv = popperDiv;
      node.updatePopper = updatePopper;
      node.popperObj = popper;

      // register event handler
      node.on('position', updatePopper);
    }

    function removePopper(cy) {
      cy.elements().forEach((element) => {
        if (element.popperDiv) {
          element.popperDiv.remove();
        }
        if (element.updatePopper) {
          cy.removeListener('pan zoom resize', element.updatePopper);
          element.removeListener('position', element.updatePopper);
        }
        if (element.popperObj) {
          element.popperObj.destroy();
        }
      });
    }

    var idPopper = document.getElementById('idPopper');
    if (idPopper) {
      idPopper.addEventListener('change', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        nwdiagramState.showPopper = evt.target.checked;
        cy.elements().forEach((element) => {
          showHidePopper(element, nwdiagramState.showPopper);
        });
      });
    }

    // on click link to change eles
    ['idPhysical', 'idTopology'].forEach((id) => {
      var a = document.getElementById(id);
      if (!a) {
        return;
      }
      a.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        document.getElementsByName('dataChange').forEach((element) => {
          element.classList.remove('active');
        });
        evt.target.classList.add('active');

        var menuP = document.getElementById('idMenuP');
        var menuL = document.getElementById('idMenuL');
        if (id === 'idTopology') {
          cy.style(iida.styles.topology);
          cy.batch(function () {
            setCyElements(cy, 'topology', iida.appdata.topologyElements);
            setCyLayout(cy, 'grid');
          });
          menuP.style.display = 'none';
          menuL.style.display = 'block';
        } else if (id === 'idPhysical') {
          cy.style(iida.styles.physical);
          cy.batch(function () {
            setCyElements(cy, 'physical', iida.appdata.elements);
            setCyLayout(cy, 'grid');
          });
          menuL.style.display = 'none';
          menuP.style.display = 'block';
        }

        var tipDiv = document.getElementById('idTipDiv');
        hideTooltip(tipDiv);
      });
    });

    function hideTooltip(tipDiv) {
      // remove all children
      while (tipDiv.lastChild) {
        tipDiv.removeChild(tipDiv.lastChild);
      }
    }

    function showTooltipNode(tipDiv, node) {
      hideTooltip(tipDiv);

      var nodeType = node.data('nodeType');
      if (!nodeType) {
        // maybe unknown data is used
        return;
      }

      if (nwdiagramState.dataName === 'topology') {
        tooltipTopologyRouter(tipDiv, node);
        return;
      }

      if (nodeType === 'router') {
        tooltipPhysicalRouter(tipDiv, node);
        return;
      }

      if (nodeType === 'port') {
        tooltipPhysicalPort(tipDiv, node);
      }
    }

    function tooltipPhysicalRouter(tipDiv, node) {
      // add <h4>router_id</h4>
      tipDiv.appendChild(createTag('h4', {}, [document.createTextNode(node.id())]));

      // add <h4>Ports</h4>
      tipDiv.appendChild(createTag('h4', {}, [document.createTextNode('Ports')]));

      // add link to own ports
      const ulPorts = createTag('ul', {}, []);
      tipDiv.appendChild(ulPorts);

      const ports = node.data('ports') || [];
      ports.forEach((p) => {
        const port_id = node.id() + p.id;
        const port = cy.$id(port_id);
        if (port) {
          const li = createTag('li', {}, []);
          ulPorts.appendChild(li);
          const a = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode(p.label)]);
          li.appendChild(a);
          a.addEventListener('click', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            cy.elements().unselect();
            port.select();
          });
        }
      });

      // JUST TEST PURPOSE
      // show router image
      const model = node.data('model');
      if (model) {
        let path, thumb;
        if (model === 'NCS-55A1-36H') {
          thumb = 'static/site/img/sNCS-55A1-36H.png';
          path = 'static/site/img/NCS-55A1-36H.png';
        }
        if (model === 'NCS-5501') {
          thumb = 'static/site/img/sNCS-5501-SE.png';
          path = 'static/site/img/NCS-5501-SE.png';
        }
        if (model === 'ASR9901') {
          thumb = 'static/site/img/sASR9901.jpg';
          path = 'static/site/img/ASR9901.jpg';
        }

        if (path) {
          const img = document.createElement('img');
          img.src = thumb;
          img.width = tipDiv.clientWidth - 10;
          const a = createTag('a', { href: path, 'data-lightbox': 'models' }, [img]);
          tipDiv.appendChild(a);
        }
      }
    }

    function tooltipPhysicalPort(tipDiv, node) {
      // add <h4>Name of port</h4>
      tipDiv.appendChild(createTag('h4', {}, [document.createTextNode(node.data('label'))]));

      const routerId = node.data('routerId');
      const router = cy.$id(routerId);
      if (router) {
        // add <h4>Router</h4>
        tipDiv.appendChild(createTag('h4', {}, [document.createTextNode('Router')]));
        const a = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode(routerId)]);
        a.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();
          cy.elements().unselect();
          router.select();
        });
        tipDiv.appendChild(createTag('p', {}, [a]));
      }

      const connectedEdges = node.connectedEdges('.portToPort');
      if (connectedEdges && connectedEdges.length > 0) {
        // add <h4>Edges</h4>
        tipDiv.appendChild(createTag('h4', {}, [document.createTextNode('Edges')]));
        connectedEdges.forEach((edge) => {
          const a = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode(edge.id())]);
          a.addEventListener('click', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            cy.elements().unselect();
            edge.select();
          });
          tipDiv.appendChild(createTag('p', {}, [a]));
        });
      }
    }

    function tooltipTopologyRouter(tipDiv, node) {
      // add checkbox to enable/disable connected edges
      let input = createTag('input', { type: 'checkbox', id: 'tipDiv_' + node.id(), value: node.id() }, []);
      input.checked = !node.hasClass('disabled');
      input.addEventListener('change', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        node.connectedEdges().forEach((edge) => {
          if (evt.target.checked) {
            edge.removeClass('disabled');
          } else {
            edge.addClass('disabled');
          }
        });
        CyShortestPath.restart(cy);
      });

      let label = createTag('label', {}, [document.createTextNode('enable/disable connected edges')]);
      label.htmlFor = 'tipDiv_' + node.id();
      tipDiv.append(createTag('div', {}, [input, label]));

      // add button "Set as source"
      input = createTag('input', { type: 'button', value: 'Set as source', style: 'width: 50%;' }, []);
      input.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        selectDijkstraSource.value = node.id();
        CyShortestPath.restart(cy);
      });
      tipDiv.append(createTag('p', {}, [input]));

      // add button "Set as target"
      input = createTag('input', { type: 'button', value: 'Set as target', style: 'width: 50%;' }, []);
      input.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        selectDijkstraTarget.value = node.id();
        CyShortestPath.restart(cy);
      });
      tipDiv.append(createTag('p', {}, [input]));

      // add <h4>Neighbor routers</h4>
      tipDiv.appendChild(createTag('h4', {}, [document.createTextNode('Neighbor routers')]));

      // add link to neighbor routers
      const ulRouters = createTag('ul', {}, []);
      tipDiv.appendChild(ulRouters);
      node.neighborhood('node').forEach((neighbor) => {
        const li = createTag('li', {}, []);
        ulRouters.appendChild(li);
        const a = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode(neighbor.id())]);
        li.appendChild(a);
        a.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();
          cy.elements().unselect();
          neighbor.select();
        });

        // add link to edge
        const ulEdges = createTag('ul', {}, []);
        li.appendChild(ulEdges);
        node.edgesWith(neighbor).forEach((edge) => {
          const li = createTag('li', {}, []);
          const a = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode('edge')]);
          a.addEventListener('click', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            cy.elements().unselect();
            edge.select();
          });
          li.appendChild(a);
          ulEdges.appendChild(li);
        });
      });
    }

    function showTooltipEdge(tipDiv, edge) {
      hideTooltip(tipDiv);

      // create enable/disable checkbox
      if (nwdiagramState.dataName === 'topology') {
        tooltipTopologyEdge(tipDiv, edge);
        return;
      }

      // add <h4>Source port</h4>
      tipDiv.appendChild(createTag('h4', {}, [document.createTextNode('Source port')]));
      const sourcePort = cy.$id(edge.source().id());
      let a = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode(edge.source().id())]);
      a.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        cy.elements().unselect();
        sourcePort.select();
      });
      tipDiv.appendChild(createTag('p', {}, [a]));

      // add <h4>Target port</h4>
      tipDiv.appendChild(createTag('h4', {}, [document.createTextNode('Target port')]));
      const targetPort = cy.$id(edge.target().id());
      a = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode(edge.target().id())]);
      a.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        cy.elements().unselect();
        targetPort.select();
      });
      tipDiv.appendChild(createTag('p', {}, [a]));
    }

    function tooltipTopologyEdge(tipDiv, edge) {
      const input = createTag('input', { type: 'checkbox', id: 'tipDiv_' + edge.id(), value: edge.id() }, []);
      input.checked = !edge.hasClass('disabled');
      input.addEventListener('change', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if (evt.target.checked) {
          edge.removeClass('disabled');
        } else {
          edge.addClass('disabled');
        }
        CyShortestPath.restart(cy);
      });

      const label = createTag('label', {}, [document.createTextNode('enable/disable edge')]);
      label.htmlFor = 'tipDiv_' + edge.id();
      tipDiv.append(createTag('div', {}, [input, label]));

      // add <h4>Connected routers</h4>
      tipDiv.appendChild(createTag('h4', {}, [document.createTextNode('Connected routers')]));

      // add link to connected routers
      const ulRouters = createTag('ul', {}, []);
      tipDiv.appendChild(ulRouters);
      edge.connectedNodes().forEach((neighbor) => {
        const li = createTag('li', {}, []);
        ulRouters.appendChild(li);
        const a = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode(neighbor.id())]);
        li.appendChild(a);
        a.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();
          cy.elements().unselect();
          neighbor.select();
        });
      });
    }

    function createTag(tag, attrs, children) {
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

    // the button to revert to initial position
    var initialPositionButton = document.getElementById('idInitialPosition');
    if (initialPositionButton) {
      initialPositionButton.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        animateToInitialPosition(cy);
      });
    }

    function getInitialPosition(node) {
      return node.data('initialPosition') || { x: 0, y: 0 };
    }

    function animateToInitialPosition(cy) {
      Promise.all(
        cy.nodes('.router').map((node) => {
          return node
            .animation({
              position: getInitialPosition(node),
              duration: 500,
              easing: 'ease',
            })
            .play()
            .promise();
        })
      );
    }

    var bundleEtherDiv = document.getElementById('idBundleEther');
    if (bundleEtherDiv) {
      iida.appdata.bundleEthers.forEach((bundleEther) => {
        var input = createTag(
          'input',
          {
            type: 'checkbox',
            id: bundleEther.id,
            value: bundleEther.id,
            name: bundleEther.id,
          },
          []
        );

        var label = document.createElement('label');
        label.htmlFor = bundleEther.id;
        label.appendChild(document.createTextNode(bundleEther.id));

        var div = createTag('div', {}, [input, label]);

        bundleEtherDiv.appendChild(div);

        input.addEventListener('change', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          var id = evt.target.value;

          if (evt.target.checked) {
            var parent = cy.add({
              group: 'nodes',
              data: { id: id, label: bundleEther.label || id },
              grabbable: false,
              classes: ['bundleEther'],
            });
            bundleEther.ports.forEach((p) => {
              var port = cy.$id(p);
              if (port) {
                port.move({ parent: id });
                port.addClass('bundleEtherPort');
              }
            });
          } else {
            bundleEther.ports.forEach((p) => {
              var port = cy.$id(p);
              if (port) {
                port.move({ parent: null });
                port.removeClass('bundleEtherPort');
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

    var connectedButton = document.getElementById('idConnected');
    if (connectedButton) {
      connectedButton.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var roots = cy.$('.router:selected');
        showConnected(cy, roots);
      });
    }

    function showConnected(cy, roots) {
      if (!roots || roots.length === 0) {
        cy.nodes().show();

        // cy.nodes().show() does not affect classes, change dom style visibility directly
        cy.elements().forEach((element) => {
          if (element.popperDiv) {
            element.popperDiv.style.visibility = '';
          }
        });

        return;
      }

      // in case of topology data, just show neighborhood()
      if (nwdiagramState.dataName === 'topology') {
        cy.batch(function () {
          cy.nodes().hide();
          roots.neighborhood().nodes().show();
          roots.show();
        });
        return;
      }

      // in case of physical data, create subgraph and show it
      var eles = [];
      roots.forEach((root) => {
        eles.push(root);
        var routerId = root.id();
        var ports = root.data('ports') || [];
        ports.forEach((p) => {
          var port = cy.$id(routerId + p.id);
          if (port) {
            if (!eles.includes(port)) {
              eles.push(port);
            }
            var edges = port.connectedEdges();
            if (edges) {
              edges.forEach((edge) => {
                if (eles.includes(edge)) {
                  eles.push(edge);
                }
                var peerPort = edge.source() === port ? edge.target() : edge.source();
                if (!eles.includes(peerPort)) {
                  eles.push(peerPort);
                }
                var peerRouterId = peerPort.data('routerId');
                var peerRouter = cy.$id(peerRouterId);
                if (peerRouter) {
                  if (!eles.includes(peerRouter)) {
                    eles.push(peerRouter);
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
        cy.elements().forEach((element) => {
          if (element.popperDiv) {
            element.popperDiv.style.visibility = 'hidden';
          }
        });

        // show subgraph
        subgraph.show();

        // show poppers
        cy.elements(subgraph).forEach((element) => {
          if (element.popperDiv) {
            element.popperDiv.style.visibility = '';
          }
        });
      });
    }

    // filter by redundant system number #1 or #2 or #1-#2
    [12, 1, 2].forEach((redundantNumber) => {
      var a = document.getElementById('idRedundant' + redundantNumber);
      if (!a) {
        return;
      }
      a.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        document.getElementsByName('redundantFilter').forEach((element) => {
          element.classList.remove('active');
        });
        evt.target.classList.add('active');
        if (redundantNumber === 1) {
          showRedundant(cy, 1, true);
          showRedundant(cy, 2, false);
        } else if (redundantNumber === 2) {
          showRedundant(cy, 2, true);
          showRedundant(cy, 1, false);
        } else {
          showRedundant(cy, 1, true);
          showRedundant(cy, 2, true);
        }
      });
    });

    function showRedundant(cy, redundantNumber, show) {
      var routers = cy.nodes('.router').filter((r) => {
        var redundant = r.data('redundant');
        return redundantNumber === redundant;
      });
      routers.forEach((router) => {
        var routerId = router.id();
        var ports = router.data('ports') || [];
        ports.forEach((p) => {
          var portId = routerId + p.id;
          var port = cy.$id(portId);
          if (port) {
            showHideElement(port, show);
            port.connectedEdges().forEach((edge) => {
              showHideElement(edge, show);
            });
          }
        });
        router.connectedEdges().forEach((edge) => {
          showHideElement(edge, show);
        });
        showHideElement(router, show);
      });
    }

    function showHideElement(element, show) {
      if (show) {
        element.removeClass('hidden');
      } else {
        element.addClass('hidden');
      }
      showHidePopper(element, show);
    }

    function showHidePopper(element, show) {
      var popperDiv = element.popperDiv;
      if (!popperDiv) {
        return;
      }
      if (show) {
        if (nwdiagramState.showPopper && !element.hasClass('hidden')) {
          popperDiv.classList.remove('hidden');
        }
      } else {
        popperDiv.classList.add('hidden');
      }
    }

    var CyShortestPath = (function () {
      var _dijkstra = function (cy, startNodeId) {
        if (!CyShortestPath.dijkstraResult && !CyShortestPath.parameterChanged) {
          return;
        }

        // get start node by id
        var startNode = cy.filter('node[id="' + startNodeId + '"]');
        if (!startNode) {
          return;
        }

        // eles.dijkstra( options )
        // options
        //    root: The root node (selector or collection) where the algorithm starts.
        //    weight: function(edge) [optional] A function that returns the positive numeric weight for the edge. The weight indicates the cost of going from one node to another node.
        //    directed: [optional] A boolean indicating whether the algorithm should only go along edges from source to target (default false).
        CyShortestPath.dijkstraResult = cy
          .elements()
          .not('.disabled')
          .dijkstra(
            startNode,
            function (edge) {
              return edge.data('weight');
            },
            false
          );

        CyShortestPath.parameterChanged = false;
      };

      var _showPathTo = function (cy, targetNodeId) {
        // get end node by id
        var targetNode = cy.filter('node[id="' + targetNodeId + '"]');
        if (!targetNode) {
          return;
        }

        if (!CyShortestPath.dijkstraResult) {
          // first calc
          CyShortestPath.dijkstra(cy, selectDijkstraSource.value);
        }

        // get cached dijkstra result
        var dijkstra = CyShortestPath.dijkstraResult;

        // calculate pathTo
        var pathTo = dijkstra.pathTo(targetNode);

        /*
        // set cy2 elements
        if (cy2) {
            cy2.batch(function () {
                cy2.elements().remove();
                cy2.add(pathTo);
                cy2.layout({ 'name': "grid" }).run();
            });
        }
        */

        var step = 0;
        var highlightNext = function () {
          var el = pathTo[step];
          if (el /* && el.isEdge()*/) {
            el.addClass('dijkstraPath');
          }
          if (step < pathTo.length) {
            step++;
            // setTimeout(highlightNext, 500);
            highlightNext();
          }
        };
        highlightNext();

        pathTo[0].addClass('dijkstraSource');
        pathTo[pathTo.length - 1].addClass('dijkstraTarget');
        cy.elements().difference(pathTo).not(targetNode).addClass('dijkstraSemitransp');
      };

      var _hidePathTo = function (cy) {
        cy.elements().removeClass('dijkstraPath');
        cy.elements().removeClass('dijkstraSource');
        cy.elements().removeClass('dijkstraTarget');
        cy.elements().removeClass('dijkstraSemitransp');
      };

      var _restart = function (cy) {
        CyShortestPath.parameterChanged = true;
        CyShortestPath.dijkstra(cy, selectDijkstraSource.value); // calc dijkstra
        selectDijkstraTarget.dispatchEvent(new Event('change')); // and show path to this target
      };

      return {
        dijkstra: _dijkstra,
        dijkstraResult: null,
        showPathTo: _showPathTo,
        hidePathTo: _hidePathTo,
        isRunning: false,
        parameterChanged: true, // true if weight changed, disabled state changed, etc
        restart: _restart,
      };
    })();

    // slider for edge #1-#1
    var cost1_1 = document.getElementById('cost1_1');
    if (cost1_1) {
      cost1_1.addEventListener('input', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        document.getElementById('cost1_1Value').innerText = evt.target.value;
        setEdgeWeight(cy);
      });
    }

    // slider for edge #1-#2
    var cost1_2 = document.getElementById('cost1_2');
    if (cost1_2) {
      cost1_2.addEventListener('input', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        document.getElementById('cost1_2Value').innerText = evt.target.value;
        setEdgeWeight(cy);
      });
    }

    // slider for edge #2-#2
    var cost2_2 = document.getElementById('cost2_2');
    if (cost2_2) {
      cost2_2.addEventListener('input', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        document.getElementById('cost2_2Value').innerText = evt.target.value;
        setEdgeWeight(cy);
      });
    }

    var setEdgeWeight = function (cy) {
      cy.edges().forEach((edge) => {
        var sourceRedundantSystem = edge.source().data('redundant') || 1;
        var targetRedundantSystem = edge.target().data('redundant') || 1;

        switch (sourceRedundantSystem + targetRedundantSystem) {
          case 2: // #1-#1 main-main
            edge.data('weight', parseInt(cost1_1.value));
            break;
          case 3: // #1-#2 main-back
            edge.data('weight', parseInt(cost1_2.value));
            break;
          case 4: // #2-#2 back-back
            edge.data('weight', parseInt(cost2_2.value));
            break;
        }
      });

      CyShortestPath.restart(cy);
    };

    var selectDijkstraSource = document.getElementById('idDijkstraSource');
    if (selectDijkstraSource) {
      iida.appdata.routerIds.forEach((routerId) => {
        var option = document.createElement('option');
        option.text = routerId;
        option.value = routerId;
        selectDijkstraSource.appendChild(option);
      });
      selectDijkstraSource.addEventListener('change', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        CyShortestPath.restart(cy);
      });
    }

    var selectDijkstraTarget = document.getElementById('idDijkstraTarget');
    if (selectDijkstraTarget) {
      iida.appdata.routerIds.forEach((routerId) => {
        var option = document.createElement('option');
        option.text = routerId;
        option.value = routerId;
        selectDijkstraTarget.appendChild(option);
      });
      selectDijkstraTarget.addEventListener('change', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var targetId = evt.target.value;
        CyShortestPath.hidePathTo(cy);
        CyShortestPath.showPathTo(cy, targetId);
      });
    }

    var dijkstraStartStop = document.getElementById('idDijkstraStartStop');
    if (dijkstraStartStop) {
      dijkstraStartStop.addEventListener('change', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        // disable or enable select and button
        CyShortestPath.isRunning = selectDijkstraSource.disabled = selectDijkstraTarget.disabled = dijkstraStartStop.checked;

        // start or stop dijkstra calculation
        dijkstraStartStopFunc();
      });
    }

    function dijkstraStartStopFunc() {
      var routerIds = iida.appdata.routerIds;
      var originalSourceIndex = (sourceIndex = 0);
      var originalTargetIndex = (targetIndex = 0);

      // move to current dropdown value
      routerIds.forEach(function (routerId, index) {
        if (selectDijkstraSource.value === routerId) {
          originalSourceIndex = sourceIndex = index;
        }
        if (selectDijkstraTarget.value === routerId) {
          originalTargetIndex = targetIndex = index;
        }
      });

      // trigger to calculate shortest path at current source
      selectDijkstraSource.dispatchEvent(new Event('change'));

      var calculatedPairs = [];

      function moveNext3() {
        if (!CyShortestPath.isRunning) {
          return;
        }

        targetIndex++;
        if (targetIndex === routerIds.length) {
          targetIndex = 0;
          sourceIndex++;
          if (sourceIndex === routerIds.length) {
            sourceIndex = 0;
          }
        }
        selectDijkstraSource.options[sourceIndex].selected = true;
        selectDijkstraTarget.options[targetIndex].selected = true;

        if (targetIndex === 0) {
          calculatedPairs.push(sourceIndex.toString() + '-' + targetIndex.toString());
          selectDijkstraSource.dispatchEvent(new Event('change'));
        }

        // check if reached to original position
        if (sourceIndex === originalSourceIndex && targetIndex === originalTargetIndex) {
          console.log('done');
          // show final path
          selectDijkstraTarget.dispatchEvent(new Event('change'));
          // then finish
          dijkstraStartStop.checked = false;
          CyShortestPath.isRunning = selectDijkstraSource.disabled = selectDijkstraTarget.disabled = dijkstraStartStop.checked;
          return;
        }

        if (calculatedPairs.includes(targetIndex.toString() + '-' + sourceIndex.toString())) {
          // console.log("already displayed reverse path, just skip it");
          moveNext3();
        } else if (sourceIndex === targetIndex) {
          moveNext3();
        } else {
          calculatedPairs.push(sourceIndex.toString() + '-' + targetIndex.toString());
          selectDijkstraTarget.dispatchEvent(new Event('change'));
          setTimeout(moveNext3, nwdiagramState.shortestPathDuration);
        }
      }
      moveNext3();

      /*
      // select next (source, target) pair
      function moveNext2() {
        if (!CyShortestPath.isRunning) {
          return;
        }

        if (targetIndex === routerIds.length) {
          // rewind to top of target list
          targetIndex = 0;
          selectDijkstraTarget.options[targetIndex].selected = true;

          // then increment source
          sourceIndex++;
          if (sourceIndex === routerIds.length) {
            sourceIndex = 0;
          }

          selectDijkstraSource.options[sourceIndex].selected = true;
          selectDijkstraSource.dispatchEvent(new Event('change'));
          calculatedPairs.push(sourceIndex.toString() + '-' + targetIndex.toString());
        } else {
          selectDijkstraTarget.options[targetIndex].selected = true;
        }

        // check if reach to original position
        if (sourceIndex === originalSourceIndex && targetIndex === originalTargetIndex) {
          console.log('done');

          // show final path
          selectDijkstraTarget.dispatchEvent(new Event('change'));

          // then finish
          dijkstraStartStop.checked = false;
          CyShortestPath.isRunning = selectDijkstraSource.disabled = selectDijkstraTarget.disabled = dijkstraStartStop.checked;
          return;
        }

        if (calculatedPairs.includes(targetIndex.toString() + '-' + sourceIndex.toString())) {
          // console.log("already displayed reverse path, just skip it");
          moveNext2();
        } else {
          calculatedPairs.push(sourceIndex.toString() + '-' + targetIndex.toString());
          selectDijkstraTarget.dispatchEvent(new Event('change'));
          setTimeout(moveNext2, nwdiagramState.shortestPathDuration);
        }
      }
      moveNext2();
      */

      /*
      // select next (source, target) pair
      function moveNext() {
        if (!CyShortestPath.isRunning) {
          return;
        }

        targetIndex++;
        if (targetIndex < routerIds.length) {
          selectDijkstraTarget.options[targetIndex].selected = true;
          selectDijkstraTarget.dispatchEvent(new Event('change'));
          setTimeout(moveNext, nwdiagramState.shortestPathDuration);
        } else {
          sourceIndex++;
          targetIndex = sourceIndex;
          if (sourceIndex < routerIds.length) {
            selectDijkstraSource.options[sourceIndex].selected = true;
            selectDijkstraSource.dispatchEvent(new Event('change'));
            moveNext();
          } else {
            // reach to end
            console.log('done');
            dijkstraStartStop.checked = false;
            CyShortestPath.isRunning = selectDijkstraSource.disabled = selectDijkstraTarget.disabled = dijkstraStartStop.checked;
          }
        }
      }
      moveNext();
      */
    }

    var dijkstraClearButton = document.getElementById('idDijkstraClear');
    if (dijkstraClearButton) {
      dijkstraClearButton.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        CyShortestPath.hidePathTo(cy);
      });
    }

    var clearDisabledEdgeButton = document.getElementById('idResetDisabledEdge');
    if (clearDisabledEdgeButton) {
      clearDisabledEdgeButton.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        cy.elements().removeClass('disabled');
        CyShortestPath.restart(cy);
        cy.elements().unselect();
      });
    }

    // DEBUG PURPOSE
    var cdebugButton = document.getElementById('idDebugButton');
    if (cdebugButton) {
      cdebugButton.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        cy.elements().forEach((element) => {
          console.log(element.id() + ' ' + element.position().x);
        });
      });
    }
  };
  //
})();
