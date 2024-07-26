import createInstance from "./instance";

class TimelineInstanceManager {
    create (target, options) {
        return createInstance({ target, options })
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