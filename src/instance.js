import {MomentSvelteGanttDateAdapter, SvelteGantt, SvelteGanttTable} from "svelte-gantt";
import moment from "moment/moment";
import {addRows, addTasks} from "./methods";

// Provide default zoom levels. This is adapted from the svelte-gantt
// documentation for viewing tasks across months, weeks and days.
// See https://anovokmet.github.io/svelte-gantt/docs/options/zoom
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

  // Default options for the farmos-timeline library.
  const default_options = {
    highlightPast: true,
    // Set default padding to 7 days converted to seconds.
    padding: [86400 * 7, 86400 * 7],
    props: {},
  };
  options = {...default_options, ...options};

  // Default props for svelte-gantt.
  // For all options see https://anovokmet.github.io/svelte-gantt/docs/options/gantt
  const default_props = {
    ganttTableModules: [SvelteGanttTable],
    dateAdapter: new MomentSvelteGanttDateAdapter(moment),
    tableHeaders: [{ title: target.dataset?.tableHeader, property: 'label', type: 'tree' }],
    tableWidth: 240,
    fitWidth: true,
    from: Date.now() - options.padding[0] * 1000,
    to: Date.now() + options.padding[1] * 1000,
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
    rows: [],
  };
  return {
    highlightPast: options.highlightPast,
    padding: options.padding,
    timeline: new SvelteGantt({
      target: target,
      props: {...default_props, ...options.props},
    }),
    addRows,
    addTasks,
  }
}

export default createInstance;