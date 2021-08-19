/* global cytoscape, iida */

(function () {
  iida.nwdiagram = function () {
    // state object
    var nwdiagramState = {
      nenuName: 'physical', // or "topology"
      showPopper: false,
      shortestPathDuration: 1000, // msec
    };

    var cyContainer = document.getElementById('cy');
    if (cyContainer) {
      var cy = (window.cy = cytoscape({
        container: cyContainer,
        // minZoom: 0.3,
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
        setCyElements(cy, iida.appdata.elements);
        setCyLayout(cy, 'grid');
      });
    }

    var cyModelContainer = document.getElementById('idCyModel');
    if (cyModelContainer) {
      var cyModel = iida.cyModel(cyModelContainer);
    }

    function setCyElements(cy, eles) {
      // first remove popper
      removePopper(cy);

      // and then remove elements
      cy.elements().remove();

      // reset zoom etc
      cy.reset();

      // add elements
      cy.add(eles);

      // create new popper
      cy.elements().forEach((element) => {
        if (element.data('popper') && element.data('popper') !== '') {
          createPopper(cy, element);
        }
      });
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

    // on click link to change menu
    ['idPhysical', 'idTopology'].forEach((id) => {
      var aTag = document.getElementById(id);
      if (!aTag) {
        return;
      }
      aTag.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        document.getElementsByName('menuChange').forEach((element) => {
          element.classList.remove('active');
        });
        evt.target.classList.add('active');

        var menuP = document.getElementById('idMenuP');
        var menuL = document.getElementById('idMenuL');
        if (id === 'idTopology') {
          menuP.style.display = 'none';
          menuL.style.display = 'block';
          nwdiagramState.menuName = 'topology';
          cy.elements().unselect();
          cy.elements().addClass('topology');
          setSelectOptions(selectDijkstraSource);  // set select options for dijkstra source
          setSelectOptions(selectDijkstraTarget);  // set select options for dijkstra target
          cy.elements().forEach((element) => {  // popper should be hidden during topology view
            if (element.popperDiv) {
              element.popperDiv.style.visibility = 'hidden';
            }
          });
        } else if (id === 'idPhysical') {
          menuL.style.display = 'none';
          menuP.style.display = 'block';
          nwdiagramState.menuName = 'physical';
          cy.elements().removeClass('topology');
          cy.elements().forEach((element) => {  // show popper in accordance with specified class
            if (element.popperDiv) {
              element.popperDiv.style.visibility = '';
            }
          });
        }
        CyShortestPath.hidePathTo(cy);
        cy.elements().unselect();
        var tipDiv = document.getElementById('idTipDiv');
        hideTooltip(tipDiv);
      });
    });

    function hideTooltip(tipDiv) {
      // remove all children
      while (tipDiv.lastChild) {
        tipDiv.removeChild(tipDiv.lastChild);
      }

      // hide cyModel at the same time
      cyModel.hide();
    }

    function showTooltipNode(tipDiv, node) {
      hideTooltip(tipDiv);

      var nodeType = node.data('nodeType');
      if (!nodeType) {
        // maybe unknown data is used
        return;
      }

      if (nodeType === 'router') {
        if (nwdiagramState.menuName === 'topology') {
          tooltipRouterTopology(tipDiv, node);
        } else {
          tooltipRouterPhysical(tipDiv, node);
        }
        return;
      }

      if (nodeType === 'port') {
        tooltipPort(tipDiv, node);
      }
    }

    function tooltipRouterPhysical(tipDiv, node) {
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
          const liTag = createTag('li', {}, []);
          ulPorts.appendChild(liTag);
          const aTag = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode(p.label)]);
          liTag.appendChild(aTag);
          aTag.addEventListener('click', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            cy.elements().unselect();
            port.select();
          });
        }
      });

      // show router image
      const model = node.data('model');
      if (model) {
        let modelData;
        Object.keys(iida.models).forEach((key) => {
          if (iida.models[key].MODEL === model) {
            modelData = iida.models[key];
          }
        });
        if (modelData) {
          const imgTag = document.createElement('img');
          imgTag.src = modelData.THUMBNAIL_PATH;
          imgTag.width = tipDiv.clientWidth - 10;
          const aTag = createTag('a', { href: '#' }, [imgTag]);
          aTag.addEventListener('click', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            var portDatas = [];
            ports.forEach((p) => {
              portDatas.push({ data: { id: p.id } });
            });
            cyModel.datum(portDatas).model(modelData).show();
          });
          tipDiv.appendChild(aTag);
        }
      }
    }


    function tooltipRouterTopology(tipDiv, node) {
      // add checkbox to enable/disable connected edges
      let inputTag = createTag('input', { type: 'checkbox', id: 'tipDiv_' + node.id(), value: node.id() }, []);
      inputTag.checked = !node.hasClass('disabled');
      inputTag.addEventListener('change', function (evt) {
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

      let labelTag = createTag('label', {}, [document.createTextNode('enable/disable connected edges')]);
      labelTag.htmlFor = 'tipDiv_' + node.id();
      tipDiv.append(createTag('div', {}, [inputTag, labelTag]));

      // add button "Set as source"
      inputTag = createTag('input', { type: 'button', value: 'Set as source', style: 'width: 50%;' }, []);
      inputTag.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        selectDijkstraSource.value = node.id();
        CyShortestPath.restart(cy);
      });
      tipDiv.append(createTag('p', {}, [inputTag]));

      // add button "Set as target"
      inputTag = createTag('input', { type: 'button', value: 'Set as target', style: 'width: 50%;' }, []);
      inputTag.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        selectDijkstraTarget.value = node.id();
        CyShortestPath.restart(cy);
      });
      tipDiv.append(createTag('p', {}, [inputTag]));

      // add <h4>Neighbor routers</h4>
      tipDiv.appendChild(createTag('h4', {}, [document.createTextNode('Neighbor routers')]));

      // add link to neighbor routers
      const ulRouters = createTag('ul', {}, []);
      tipDiv.appendChild(ulRouters);
      node.neighborhood('node').forEach((neighbor) => {
        const liTag = createTag('li', {}, []);
        ulRouters.appendChild(liTag);
        const aTag = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode(neighbor.id())]);
        liTag.appendChild(aTag);
        aTag.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();
          cy.elements().unselect();
          neighbor.select();
        });

        // add link to edge
        const ulEdges = createTag('ul', {}, []);
        liTag.appendChild(ulEdges);
        node.edgesWith(neighbor).forEach((edge) => {
          const liTag = createTag('li', {}, []);
          const aTag = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode('edge')]);
          aTag.addEventListener('click', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            cy.elements().unselect();
            edge.select();
          });
          liTag.appendChild(aTag);
          ulEdges.appendChild(liTag);
        });
      });
    }

    function tooltipPort(tipDiv, node) {
      // add <h4>Name of port</h4>
      tipDiv.appendChild(createTag('h4', {}, [document.createTextNode(node.data('label'))]));

      const routerId = node.data('routerId');
      const router = cy.$id(routerId);
      if (router) {
        // add <h4>Router</h4>
        tipDiv.appendChild(createTag('h4', {}, [document.createTextNode('Router')]));
        const aTag = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode(routerId)]);
        aTag.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();
          cy.elements().unselect();
          router.select();
        });
        tipDiv.appendChild(createTag('p', {}, [aTag]));
      }

      const connectedEdges = node.connectedEdges('.portToPort');
      if (connectedEdges && connectedEdges.length > 0) {
        // add <h4>Edges</h4>
        tipDiv.appendChild(createTag('h4', {}, [document.createTextNode('Edges')]));
        connectedEdges.forEach((edge) => {
          const aTag = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode(edge.id())]);
          aTag.addEventListener('click', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            cy.elements().unselect();
            edge.select();
          });
          tipDiv.appendChild(createTag('p', {}, [aTag]));
        });
      }
    }

    function showTooltipEdge(tipDiv, edge) {
      hideTooltip(tipDiv);

      // create enable/disable checkbox
      if (nwdiagramState.menuName === 'topology') {
        tooltipEdgeTopology(tipDiv, edge);
      } else {
        tooltipEdgePhysical(tipDiv, edge);
      }
    }

    function tooltipEdgePhysical(tipDiv, edge) {
      // add <h4>Source port</h4>
      tipDiv.appendChild(createTag('h4', {}, [document.createTextNode('Source port')]));
      const sourcePort = cy.$id(edge.source().id());
      let aTag = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode(edge.source().id())]);
      aTag.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        cy.elements().unselect();
        sourcePort.select();
      });
      tipDiv.appendChild(createTag('p', {}, [aTag]));

      // add <h4>Target port</h4>
      tipDiv.appendChild(createTag('h4', {}, [document.createTextNode('Target port')]));
      const targetPort = cy.$id(edge.target().id());
      aTag = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode(edge.target().id())]);
      aTag.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        cy.elements().unselect();
        targetPort.select();
      });
      tipDiv.appendChild(createTag('p', {}, [aTag]));
    }

    function tooltipEdgeTopology(tipDiv, edge) {
      const inputTag = createTag('input', { type: 'checkbox', id: 'tipDiv_' + edge.id(), value: edge.id() }, []);
      inputTag.checked = !edge.hasClass('disabled');
      inputTag.addEventListener('change', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if (evt.target.checked) {
          edge.removeClass('disabled');
        } else {
          edge.addClass('disabled');
        }
        CyShortestPath.restart(cy);
      });

      const labelTag = createTag('label', {}, [document.createTextNode('enable/disable edge')]);
      labelTag.htmlFor = 'tipDiv_' + edge.id();
      tipDiv.append(createTag('div', {}, [inputTag, labelTag]));

      // add <h4>Connected routers</h4>
      tipDiv.appendChild(createTag('h4', {}, [document.createTextNode('Connected routers')]));

      // add link to connected routers
      const ulRouters = createTag('ul', {}, []);
      tipDiv.appendChild(ulRouters);
      edge.connectedNodes().forEach((neighbor) => {
        const liTag = createTag('li', {}, []);
        ulRouters.appendChild(liTag);
        const aTag = createTag('a', { href: '#', style: 'text-decoration: none;' }, [document.createTextNode(neighbor.id())]);
        liTag.appendChild(aTag);
        aTag.addEventListener('click', function (evt) {
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
        var inputTag = createTag(
          'input',
          {
            type: 'checkbox',
            id: bundleEther.id,
            value: bundleEther.id,
            name: bundleEther.id,
          },
          []
        );
        var labelTag = document.createElement('label');
        labelTag.htmlFor = bundleEther.id;
        labelTag.appendChild(document.createTextNode(bundleEther.id));
        bundleEtherDiv.appendChild(createTag('div', {}, [inputTag, labelTag]));

        inputTag.addEventListener('change', function (evt) {
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

      // in case of simple diagram data, this works
      // cy.nodes().hide(); roots.neighborhood().nodes().show(); roots.show();

      // in case of physical diagram data, create subgraph and show it
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
        if (nwdiagramState.showPopper) {
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
        // var startNode = cy.filter('node[id="' + startNodeId + '"]');
        var startNode = cy.$id(startNodeId);
        if (!startNode) {
          return;
        }

        // eles.dijkstra( options )
        // options
        //    root: The root node (selector or collection) where the algorithm starts.
        //    weight: function(edge) [optional] A function that returns the positive numeric weight for the edge. The weight indicates the cost of going from one node to another node.
        //    directed: [optional] A boolean indicating whether the algorithm should only go along edges from source to target (default false).
        var result = (CyShortestPath.dijkstraResult = cy
          .elements()
          .not('.disabled')
          .dijkstra(
            startNode,
            function (edge) {
              return edge.data('weight');
            },
            false
          ));

        CyShortestPath.parameterChanged = false;
        return result;
      };

      var _showPathTo = function (cy, targetNodeId) {
        // get end node by id
        // var targetNode = cy.filter('node[id="' + targetNodeId + '"]');
        var targetNode = cy.$id(targetNodeId);
        if (!targetNode) {
          return;
        }

        // get cached dijkstra result
        var dijkstra = CyShortestPath.dijkstraResult;
        if (!dijkstra) {
          dijkstra = CyShortestPath.dijkstra(cy, selectDijkstraSource.value);
        }

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
        var edgeType = edge.data('edgeType');
        if (!edgeType || edgeType === 'routerToPort') {
          return;
        }

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
      selectDijkstraSource.addEventListener('change', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        CyShortestPath.restart(cy);
      });
    }

    var selectDijkstraTarget = document.getElementById('idDijkstraTarget');
    if (selectDijkstraTarget) {
      selectDijkstraTarget.addEventListener('change', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var targetId = evt.target.value;
        CyShortestPath.hidePathTo(cy);
        CyShortestPath.showPathTo(cy, targetId);
      });
    }

    function setSelectOptions(select) {
      while (select.lastChild) {
        select.removeChild(select.lastChild);
      }
      cy.elements('.router').forEach(router => {
        if (router.classes().includes('L2')) {
          return;
        }
        const option = document.createElement('option');
        option.text = option.value = router.id();
        select.appendChild(option);
      });
    }

    function getSelectValues(select) {
      const values = [];
      Array.from(select.children).forEach((option) => { values.push(option.value); });  // select.children is HTMLCollection which is not iterable
      return values;
    }

    var dijkstraStartStop = document.getElementById('idDijkstraStartStop');
    if (dijkstraStartStop) {
      dijkstraStartStop.addEventListener('change', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        // disable or enable dom elements
        CyShortestPath.isRunning = selectDijkstraSource.disabled = selectDijkstraTarget.disabled = dijkstraStartStop.checked;

        // start or stop dijkstra calculation
        dijkstraStartStopFunc();
      });
    }

    function dijkstraStartStopFunc() {
      var originalSourceIndex = (sourceIndex = 0);
      var originalTargetIndex = (targetIndex = 0);

      // move to current dropdown value
      var sourceRouterIds = getSelectValues(selectDijkstraSource);
      sourceRouterIds.forEach(function (routerId, index) {
        if (selectDijkstraSource.value === routerId) {
          originalSourceIndex = sourceIndex = index;
        }
      });

      var targetRouterIds = getSelectValues(selectDijkstraTarget);
      targetRouterIds.forEach(function (routerId, index) {
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
        if (targetIndex === targetRouterIds.length) {
          targetIndex = 0;
          sourceIndex++;
          if (sourceIndex === sourceRouterIds.length) {
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
          // console.log('done');
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
    var debugButton = document.getElementById('idDebugButton');
    if (debugButton) {
      debugButton.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
      });
    }
  };
  //
})();
