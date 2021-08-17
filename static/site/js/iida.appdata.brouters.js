/* global iida */

(function () {
  // see position.pptx
  var col, row;

  var routers;
  var edges;

  col = 2;
  row = 1;
  routers = [
    {
      grid: { row: row, col: col },
      id: 'tab-his-ur303',
      label: 'NCS-5501\ntab-his-ur303\nNODE ID:20403',
      dragWith: ['tab-his-ur304'],
      classes: ['PE'],
      redundant: 1,
      model: 'NCS-5501',
      ports: [
        {
          id: 'Hu0/0/1/0',
          label: 'Hu0/0/1/0',
          align: ['RO', 'T1'],
        },
        {
          id: 'Hu0/0/1/2',
          label: 'Hu0/0/1/2',
          align: ['RO', 'T2'],
        },
        {
          id: 'Hu0/0/1/4',
          label: 'Hu0/0/1/4',
          align: ['LO', 'T1'],
        },
        {
          id: 'Hu0/0/1/5',
          label: 'Hu0/0/1/5',
          align: ['LO', 'T2'],
        },
      ],
    },
  ];
  Array.prototype.push.apply(iida.appdata.routers, routers);

  col = 2;
  row = 2;
  routers = [
    {
      grid: { row: row, col: col },
      id: 'tab-his-ur304',
      label: 'NCS-5501\ntab-his-ur304\nNODE ID:20404',
      dragWith: ['tab-his-ur303'],
      classes: ['PE'],
      redundant: 2,
      model: 'NCS-5501',
      ports: [
        {
          id: 'Hu0/0/1/0',
          label: 'Hu0/0/1/0',
          align: ['RO', 'T1'],
        },
        {
          id: 'Hu0/0/1/2',
          label: 'Hu0/0/1/2',
          align: ['RO', 'T2'],
        },
        {
          id: 'Hu0/0/1/4',
          label: 'Hu0/0/1/4',
          align: ['LO', 'T1'],
        },
        {
          id: 'Hu0/0/1/5',
          label: 'Hu0/0/1/5',
          align: ['LO', 'T2'],
        },
      ],
    },
  ];
  Array.prototype.push.apply(iida.appdata.routers, routers);

  col = 2;
  row = 3;
  routers = [
    {
      grid: { row: row, col: col },
      id: 'tab-his-ur305',
      label: 'NCS-5501\ntab-his-ur305\nNODE ID:20405',
      dragWith: ['tab-his-ur306'],
      classes: ['PE'],
      redundant: 1,
      model: 'NCS-5501',
      ports: [
        {
          id: 'Hu0/0/1/0',
          label: 'Hu0/0/1/0',
          align: ['RO', 'T1'],
        },
        {
          id: 'Hu0/0/1/2',
          label: 'Hu0/0/1/2',
          align: ['RO', 'T2'],
        },
        {
          id: 'Hu0/0/1/4',
          label: 'Hu0/0/1/4',
          align: ['LO', 'T1'],
        },
        {
          id: 'Hu0/0/1/5',
          label: 'Hu0/0/1/5',
          align: ['LO', 'T2'],
        },
      ],
    },
  ];
  Array.prototype.push.apply(iida.appdata.routers, routers);

  col = 2;
  row = 4;
  routers = [
    {
      grid: { row: row, col: col },
      id: 'tab-his-ur306',
      label: 'NCS-5501\ntab-his-ur305\nNODE ID:20406',
      dragWith: ['tab-his-ur305'],
      classes: ['PE'],
      redundant: 2,
      model: 'NCS-5501',
      ports: [
        {
          id: 'Hu0/0/1/0',
          label: 'Hu0/0/1/0',
          align: ['RO', 'T1'],
        },
        {
          id: 'Hu0/0/1/2',
          label: 'Hu0/0/1/2',
          align: ['RO', 'T2'],
        },
        {
          id: 'Hu0/0/1/4',
          label: 'Hu0/0/1/4',
          align: ['LO', 'T1'],
        },
        {
          id: 'Hu0/0/1/5',
          label: 'Hu0/0/1/5',
          align: ['LO', 'T2'],
        },
      ],
    },
  ];
  Array.prototype.push.apply(iida.appdata.routers, routers);

  edges = [
    {
      sourceRouter: 'tab-his-ur303',
      sourcePort: 'Hu0/0/1/4',
      targetRouter: 'tab-his-ur303',
      targetPort: 'Hu0/0/1/5',
      weight: 1,
    },

    {
      sourceRouter: 'tab-his-ur304',
      sourcePort: 'Hu0/0/1/4',
      targetRouter: 'tab-his-ur304',
      targetPort: 'Hu0/0/1/5',
      weight: 1,
    },

    {
      sourceRouter: 'tab-his-ur305',
      sourcePort: 'Hu0/0/1/4',
      targetRouter: 'tab-his-ur305',
      targetPort: 'Hu0/0/1/5',
      weight: 1,
    },

    {
      sourceRouter: 'tab-his-ur306',
      sourcePort: 'Hu0/0/1/4',
      targetRouter: 'tab-his-ur306',
      targetPort: 'Hu0/0/1/5',
      weight: 1,
    },

    {
      sourceRouter: 'tab-his-ur303',
      sourcePort: 'Hu0/0/1/2',
      targetRouter: 'tab-his-ur304',
      targetPort: 'Hu0/0/1/2',
      weight: 1,
    },

    {
      sourceRouter: 'tab-his-ur305',
      sourcePort: 'Hu0/0/1/2',
      targetRouter: 'tab-his-ur306',
      targetPort: 'Hu0/0/1/2',
      weight: 1,
    },

  ];
  Array.prototype.push.apply(iida.appdata.edges, edges);



})();
