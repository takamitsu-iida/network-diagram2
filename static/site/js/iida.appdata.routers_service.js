/* global iida */

(function () {
  // see position.pptx
  var col, row;

  var routers;
  var edges;

  col = 8;
  row = 2;
  routers = [
    {
      grid: { row: row, col: col },
      id: 'C棟サービス収容ルータ#1',
      label: 'C棟サービス収容ルータ#1\nASR 9901\ntac-his-sr103\nloopback:172.16.13.3\nMgmt 10.100.1.240',
      popper: 'SID:20303',
      classes: ['PE'],
      dragWith: ['C棟サービス収容ルータ#2'],
      redundant: 1,
      model: 'ASR9901',
      ports: [
        {
          id: 'Hu0/0/0/20',
          label: 'Hu0/0/0/20\n.10',
          align: ['LO', 'C'],
        },
        {
          id: 'Hu0/0/0/21',
          label: 'Hu0/0/0/21\n.5',
          align: ['C', 'B'],
        },
        {
          id: 'Te0/0/0/8',
          label: 'Te0/0/0/8',
          align: ['RO', 'T'],
        },
        {
          id: 'Te0/0/0/9',
          label: 'Te0/0/0/9',
          align: ['RO', 'T2'],
        },
        {
          id: 'Te0/0/0/10',
          label: 'Te0/0/0/10',
          align: ['RO', 'C'],
        },
      ],
    },
  ];
  Array.prototype.push.apply(iida.appdata.routers, routers);

  col = 8;
  row = 3;
  routers = [
    {
      grid: { row: row, col: col },
      id: 'C棟サービス収容ルータ#2',
      label: 'C棟サービス収容ルータ#2\nASR 9901\ntac-his-sr104\nloopback:172.16.13.4\nMgmt 10.100.1.239',
      popper: 'SID:20304',
      classes: ['PE'],
      dragWith: ['C棟サービス収容ルータ#1'],
      redundant: 2,
      model: 'ASR9901',
      ports: [
        {
          id: 'Hu0/0/0/21',
          label: 'Hu0/0/0/21\n.6',
          align: ['C', 'T'],
        },
        {
          id: 'Hu0/0/0/20',
          label: 'Hu0/0/0/20\n.14',
          align: ['LO', 'C'],
        },
        {
          id: 'Te0/0/0/8',
          label: 'Te0/0/0/8',
          align: ['RO', 'T'],
        },
        {
          id: 'Te0/0/0/9',
          label: 'Te0/0/0/9',
          align: ['RO', 'T2'],
        },
        {
          id: 'Te0/0/0/10',
          label: 'Te0/0/0/10',
          align: ['RO', 'C'],
        },
      ],
    },
  ];
  Array.prototype.push.apply(iida.appdata.routers, routers);

  col = 8;
  row = 6;
  routers = [
    {
      grid: { row: row, col: col },
      id: 'B棟サービス収容ルータ#1',
      label: 'B棟サービス収容ルータ#1\nASR 9901\ntab-his-sr201\nloopback:172.16.13.1\nMgmt 10.100.1.242',
      popper: 'SID:20301',
      classes: ['PE'],
      dragWith: ['B棟サービス収容ルータ#2'],
      redundant: 1,
      model: 'ASR9901',
      ports: [
        {
          id: 'Hu0/0/0/21',
          label: 'Hu0/0/0/21\n.1',
          align: ['C', 'B'],
        },

        {
          id: 'Hu0/0/0/20',
          label: 'Hu0/0/0/20\n.2',
          align: ['LO', 'C'],
        },

        {
          id: 'Te0/0/0/8',
          label: 'Te0/0/0/8\n.137',
          align: ['RO', 'T'],
        },

        {
          id: 'Te0/0/0/9',
          label: 'Te0/0/0/9',
          align: ['RO', 'C'],
        },
      ],
    },
  ];
  Array.prototype.push.apply(iida.appdata.routers, routers);

  col = 8;
  row = 7;
  routers = [
    {
      grid: { row: row, col: col },
      id: 'B棟サービス収容ルータ#2',
      label: 'B棟サービス収容ルータ#2\nASR 9901\ntab-his-sr202\nloopback:172.16.13.2\nMgmt 10.100.1.241',
      popper: 'SID:20302',
      classes: ['PE'],
      dragWith: ['B棟サービス収容ルータ#1'],
      redundant: 2,
      model: 'ASR9901',
      ports: [
        {
          id: 'Hu0/0/0/21',
          label: 'Hu0/0/0/21\n.2',
          align: ['C', 'T'],
        },

        {
          id: 'Hu0/0/0/20',
          label: 'Hu0/0/0/20\n.6',
          align: ['LO', 'C'],
        },

        {
          id: 'Te0/0/0/8',
          label: 'Te0/0/0/8\n.141',
          align: ['RO', 'T'],
        },

        {
          id: 'Te0/0/0/9',
          label: 'Te0/0/0/9',
          align: ['RO', 'C'],
        },
      ],
    },
  ];
  Array.prototype.push.apply(iida.appdata.routers, routers);

  edges = [
    {
      sourceRouter: 'C棟サービス収容ルータ#1',
      sourcePort: 'Hu0/0/0/20',
      targetRouter: 'C棟コアルータ#1',
      targetPort: 'Hu0/0/0/16',
      label: '192.168.16.8/30',
      classes: ['taxiL'],
      taxiTurn: 60,
      weight: 1,
    },

    {
      sourceRouter: 'C棟サービス収容ルータ#2',
      sourcePort: 'Hu0/0/0/20',
      targetRouter: 'C棟コアルータ#2',
      targetPort: 'Hu0/0/0/16',
      label: '192.168.16.12/30',
      classes: ['taxiL'],
      taxiTurn: 60,
      weight: 5,
    },

    {
      sourceRouter: 'C棟サービス収容ルータ#2',
      sourcePort: 'Hu0/0/0/21',
      targetRouter: 'C棟サービス収容ルータ#1',
      targetPort: 'Hu0/0/0/21',
      label: '192.168.18.4/30',
      weight: 1,
    },

    {
      sourceRouter: 'B棟サービス収容ルータ#1',
      sourcePort: 'Hu0/0/0/20',
      targetRouter: 'B棟コアルータ#1',
      targetPort: 'Hu0/0/0/16',
      label: '192.168.16.0/30',
      classes: ['taxiL'],
      taxiTurn: 60,
      weight: 1,
    },

    {
      sourceRouter: 'B棟サービス収容ルータ#2',
      sourcePort: 'Hu0/0/0/21',
      targetRouter: 'B棟サービス収容ルータ#1',
      targetPort: 'Hu0/0/0/21',
      label: '192.168.18.0/30',
      weight: 1,
    },

    {
      sourceRouter: 'B棟サービス収容ルータ#2',
      sourcePort: 'Hu0/0/0/20',
      targetRouter: 'B棟コアルータ#2',
      targetPort: 'Hu0/0/0/16',
      label: '192.168.16.4/30',
      classes: ['taxiL'],
      taxiTurn: 60,
      weight: 5,
    },
  ];

  Array.prototype.push.apply(iida.appdata.edges, edges);
})();
