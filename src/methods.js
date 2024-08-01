// Helper function to add rows.
export function addRows(rows) {
  // @todo Remove this.rows state and use timeline.updateRows() once working.
  // See https://github.com/ANovokmet/svelte-gantt/issues/231
  this.rows.push(...rows);
  this.timeline.$set({
    rows: this.rows,
  });
}

// Helper function to add tasks.
export function addTasks(tasks, updateRange = true) {

  // Keep track of first/last timestamps.
  // Read current time range integer values from gantt timeline utils.
  let now = new Date();
  let first = this.timeline?.util?.from ? new Date(this.timeline?.util?.from + this.padding[0] * 1000) : null;
  let last = this.timeline?.util?.to ? new Date(this.timeline?.util?.to - this.padding[1] * 1000) : null;

  // Update the timeline range.
  if (updateRange) {
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
    // Update the range of the timeline with new values including padding.
    // The from and to props must be valid Date objects or null.
    this.timeline.$set({
      from: first ? new Date(first.getTime() - this.padding[0] * 1000) : null,
      to: last ? new Date(last.getTime() + this.padding[1] * 1000) : null,
    })
  }

  // Update the past highlight if necessary.
  if (this.highlightPast && first && first < now) {
    this.timeline.$set({
      timeRanges: [{
        id: 'past',
        from: first - this.padding[0] * 1000,
        to: now.getTime(),
        label: 'Past',
        resizable: false,
      }],
    })
  }

  // Add tasks to timeline.
  this.timeline.updateTasks(tasks);
}