export var calculate_driver_usage = function(data) {
  if (!data) {
    throw 'data is empty';
  }
  if (!data.driver_schedules || !data.driver_schedules.length) {
    throw 'driver_schedules is empty';
  }
  if (!data.driver_assignments || !data.driver_assignments.length) {
    throw 'driver_assignments is empty';
  }

  let result = [];

  let driver_schedules_time = null;
  for (let schedules of data.driver_schedules) {
    let start_time = new Date(schedules.start_at + " " + schedules.start_time).getTime();
    let end_time = new Date(schedules.start_at + " " + schedules.end_time).getTime();
    driver_schedules_time +=(end_time - start_time);
  }

  let driver_assignments = null;
  for (let assignments of data.driver_assignments) {
    let assignment_start = new Date(assignments.assignment_start).getTime();
    let assignment_end = new Date(assignments.assignment_end).getTime();
    driver_assignments +=(assignment_end - assignment_start);
  }

  result = (driver_assignments/driver_schedules_time).toFixed(4);

  return result;
}

