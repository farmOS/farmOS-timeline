import {
    SvelteGantt,
    SvelteGanttTable,
    MomentSvelteGanttDateAdapter
} from 'svelte-gantt';
import moment from 'moment';

class TimelineInstanceManager {

    create (target, options) {

        const default_options = {
            ganttTableModules: [SvelteGanttTable],
            dateAdapter: new MomentSvelteGanttDateAdapter(moment),
            tableHeaders: [{ title: target.dataset?.tableHeader, property: 'label', type: 'tree' }],
            tableWidth: 240,
            fitWidth: true,
            from: Date.now()-86400,
            to: Date.now(),
            zoomLevels: [
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
            ],
        }

        return new SvelteGantt(
            {
                target: target,
                props: {...default_options, ...options},
            },
        );
    }
}

// Create instance.
const INSTANCE = new TimelineInstanceManager();

// Make instance available.
if (typeof window.farmOS === 'undefined') {
    window.farmOS = {};
}
window.farmOS.timeline = INSTANCE;
window.farmOS.timeline.TimelineInstanceManager = TimelineInstanceManager;
export default INSTANCE;