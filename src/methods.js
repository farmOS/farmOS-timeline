// Helper function to add rows.
export function addRows(rows) {
  this.timeline.updateRows(rows);
}

// Helper function to add tasks.
export function addTasks(tasks, { updateRange = true } = {}) {

  // Read current time range integer values from gantt timeline utils.
  // Remove padding from range values for easy comparison with tasks.
  let first = this.timeline?.util?.from ? new Date(this.timeline?.util?.from + this.padding[0] * 1000) : null;
  let last = this.timeline?.util?.to ? new Date(this.timeline?.util?.to - this.padding[1] * 1000) : null;

  // Update first and last timestamps.
  for (let i in tasks) {
    tasks[i].from = new Date(tasks[i].from);
    if (!first || tasks[i].from < first) {
      first = tasks[i].from;
    }
    tasks[i].to = new Date(tasks[i].to);
    if (!last || tasks[i].to > last) {
      last = tasks[i].to;
    }
  }

  // Update new range values to include padding.
  const from= first ? new Date(first.getTime() - this.padding[0] * 1000) : null;
  const to = last ? new Date(last.getTime() + this.padding[1] * 1000) : null;

  // Update the range of the timeline.
  // The from and to props must be valid Date objects or null.
  if (updateRange) {
    this.timeline.$set({
      from,
      to,
    })
  }

  // Update the past highlight if necessary.
  let now = new Date();
  if (this.highlightPast && from && from < now) {
    this.timeline.$set({
      timeRanges: [{
        id: 'past',
        from: from.getTime(),
        to: now.getTime(),
        label: 'Past',
        resizable: false,
      }],
    })
  }

  // Add tasks to timeline.
  this.timeline.updateTasks(tasks);
}