import {MomentSvelteGanttDateAdapter, SvelteGantt, SvelteGanttTable} from "svelte-gantt";
import moment from "moment/moment";

const defaultZoomLevels = [
  {
    headers: [
      { unit: 'year', format: 'YYYY' },
      { unit: 'month', format: 'MMMM' }
    ],
    minWidth: 800,
    columnUnit: 'month',
    columnOffset: 1,
  },
  {
    headers: [
      { unit: 'month', format: 'MMMM YYYY' },
      { unit: 'day', format: 'D' },
    ],
    minWidth: 3200,
    columnUnit: 'day',
    columnOffset: 7,
  },
  {
    headers: [
      { unit: 'week', format: 'MMM YYYY' },
      { unit: 'day', format: 'D' }
    ],
    minWidth: 8000,
    columnUnit: 'hour',
    columnOffset: 12,
  },
];

const createInstance = ({ target, options = {}}) => {
  const default_options = {
    props: {},
  };
  options = {...default_options, ...options};
  const default_props = {
    ganttTableModules: [SvelteGanttTable],
    dateAdapter: new MomentSvelteGanttDateAdapter(moment),
    tableHeaders: [{ title: target.dataset?.tableHeader, property: 'label', type: 'tree' }],
    tableWidth: 240,
    fitWidth: true,
    from: Date.now()-86400,
    to: Date.now(),
    headers: [
      {unit: 'year', format: 'YYYY'},
      {unit: 'month', format: 'MMMM'},
    ],
    zoomLevels: defaultZoomLevels,
    columnUnit: 'day',
    columnOffset: 7,
    rowHeight: 34,
    rowPadding: 8,
    reflectOnParentRows: false,
  };
  return {
    timeline: new SvelteGantt({
      target: target,
      props: {...default_props, ...options.props},
    }),
  }
}

export default createInstance;