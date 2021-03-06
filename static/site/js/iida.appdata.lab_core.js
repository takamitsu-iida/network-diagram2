/* global iida */

(function () {
  // see position.pptx
  var col, row;

  var routers;
  var edges;

  col = 6;
  row = 3;
  routers = [
    {
      grid: { row: row, col: col },
      height: 200,
      id: 'C棟コアルータ#1',
      label: 'C棟コアルータ#1\nNCS-55A1-36H-B\ntac-his-cr103\nloopback:172.16.11.3\nMgmt 10.100.1.244',
      popper: 'SID:20103',
      dragWith: ['C棟コアルータ#2', 'B棟コアルータ#1', 'B棟コアルータ#2'],
      classes: ['P'],
      data: { redundant: 1, building: 'C', model: 'NCS55A1-36H' },
      ports: [
        {
          id: 'Hu0/0/0/0',
          label: 'Hu0/0/0/0\n.89',
          align: ['LO', 'T2'],
        },
        {
          id: 'Hu0/0/0/16',
          label: 'Hu0/0/0/16\n.9',
          align: ['RO', 'T2'],
        },
        {
          id: 'Hu0/0/0/27',
          label: 'Hu0/0/0/27\n.42',
          align: ['RO', 'C'],
        },
        {
          id: 'Hu0/0/0/22',
          label: 'Hu0/0/0/22\n.37',
          align: ['C', 'B'],
        },
        {
          id: 'Hu0/0/0/1',
          label: 'Hu0/0/0/1\n.97',
          align: ['LO', 'C'],
        },
      ],
    },
  ];
  Array.prototype.push.apply(iida.appdata.routers, routers);

  col = 6;
  row = 4;
  routers = [
    {
      grid: { row: row, col: col },
      height: 200,
      id: 'C棟コアルータ#2',
      label: 'C棟コアルータ#2\nNCS-55A1-36H-B\ntac-his-cr104\nloopback:172.16.11.4\nMgmt 10.100.1.243',
      popper: 'SID:20104',
      dragWith: ['C棟コアルータ#1', 'B棟コアルータ#1', 'B棟コアルータ#2'],
      classes: ['P'],
      data: { redundant: 2, building: 'C', model: 'NCS55A1-36H' },
      ports: [
        {
          id: 'Hu0/0/0/0',
          label: 'Hu0/0/0/0\n.94',
          align: ['LO', 'T2'],
        },
        {
          id: 'Hu0/0/0/22',
          label: 'Hu0/0/0/22\n.38',
          align: ['C', 'T'],
        },
        {
          id: 'Hu0/0/0/16',
          label: 'Hu0/0/0/16\n.13',
          align: ['RO', 'C'],
        },
        {
          id: 'Hu0/0/0/27',
          label: 'Hu0/0/0/27\n.46',
          align: ['RO', 'B2'],
        },
        {
          id: 'Hu0/0/0/1',
          label: 'Hu0/0/0/1\n.101',
          align: ['LO', 'C'],
        },
      ],
    },
  ];
  Array.prototype.push.apply(iida.appdata.routers, routers);

  col = 6;
  row = 5;
  routers = [
    {
      grid: { row: row, col: col },
      height: 200,
      id: 'B棟コアルータ#1',
      label: 'B棟コアルータ#1\nNCS-55A1-36H-B\ntab-his-cr201\nloopback:172.16.11.1\nMgmt 10.100.1.246',
      popper: 'SID:20101',
      dragWith: ['C棟コアルータ#1', 'C棟コアルータ#2', 'B棟コアルータ#2'],
      classes: ['P'],
      data: { redundant: 1, building: 'B', model: 'NCS55A1-36H' },
      ports: [
        {
          id: 'Hu0/0/0/27',
          label: 'Hu0/0/0/27\n.41',
          align: ['RO', 'T2'],
        },
        {
          id: 'Hu0/0/0/16',
          label: 'Hu0/0/0/16\n.1',
          align: ['RO', 'C'],
        },
        {
          id: 'Hu0/0/0/22',
          label: 'Hu0/0/0/22\n.33',
          align: ['C', 'B'],
        },
        {
          id: 'Hu0/0/0/1',
          label: 'Hu0/0/0/1\n.9',
          align: ['LO', 'B2'],
        },
        {
          id: 'Hu0/0/0/0',
          label: 'Hu0/0/0/0\n.1',
          align: ['LO', 'C'],
        },
      ],
    },
  ];
  Array.prototype.push.apply(iida.appdata.routers, routers);

  col = 6;
  row = 6;
  routers = [
    {
      grid: { row: row, col: col },
      height: 200,
      id: 'B棟コアルータ#2',
      label: 'B棟コアルータ#2\nNCS-55A1-36H-B\ntab-his-cr202\nloopback:172.16.11.2\nMgmt 10.100.1.245',
      popper: 'SID:20102',
      dragWith: ['C棟コアルータ#1', 'C棟コアルータ#2', 'B棟コアルータ#1'],
      classes: ['P'],
      data: { redundant: 2, building: 'B', model: 'NCS55A1-36H' },
      ports: [
        {
          id: 'Hu0/0/0/22',
          label: 'Hu0/0/0/22\n.34',
          align: ['C', 'T'],
        },
        {
          id: 'Hu0/0/0/27',
          label: 'Hu0/0/0/27\n.45',
          align: ['RO', 'C'],
        },
        {
          id: 'Hu0/0/0/16',
          label: 'Hu0/0/0/16\n.5',
          align: ['RO', 'B2'],
        },
        {
          id: 'Hu0/0/0/1',
          label: 'Hu0/0/0/1\n.13',
          align: ['LO', 'B2'],
        },
        {
          id: 'Hu0/0/0/0',
          label: 'Hu0/0/0/0\n.5',
          align: ['LO', 'C'],
        },
      ],
    },
  ];
  Array.prototype.push.apply(iida.appdata.routers, routers);

  edges = [
    {
      sourceRouter: 'C棟コアルータ#1',
      sourcePort: 'Hu0/0/0/22',
      targetRouter: 'C棟コアルータ#2',
      targetPort: 'Hu0/0/0/22',
      label: '192.168.19.36/30',
      weight: 1,
    },

    {
      sourceRouter: 'B棟コアルータ#1',
      sourcePort: 'Hu0/0/0/22',
      targetRouter: 'B棟コアルータ#2',
      targetPort: 'Hu0/0/0/22',
      label: '192.168.19.32/30',
      weight: 1,
    },

    {
      sourceRouter: 'C棟コアルータ#1',
      sourcePort: 'Hu0/0/0/27',
      targetRouter: 'B棟コアルータ#1',
      targetPort: 'Hu0/0/0/27',
      label: '192.168.19.40/30',
      weight: 1,
      classes: ['segmentsR'],
      segmentDistances: 25,
    },

    {
      sourceRouter: 'C棟コアルータ#2',
      sourcePort: 'Hu0/0/0/27',
      targetRouter: 'B棟コアルータ#2',
      targetPort: 'Hu0/0/0/27',
      label: '192.168.19.44/30',
      weight: 5,
      classes: ['segmentsR'],
      segmentDistances: 25 + 25,
    },
  ];
  Array.prototype.push.apply(iida.appdata.edges, edges);
})();
