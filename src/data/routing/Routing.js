export var calculate = function(data) {
  if (!data) {
    throw 'data is enpty';
  }
  if (!data.driver_schedules || !data.driver_schedules.length) {
    throw 'driver_schedules is enpty';
  }
  if (!data.driver_assignments || !data.driver_assignments.length) {
    throw 'driver_assignments is enpty';
  }

  let result = [];

  let driver_schedules_time_array = [];
  for (let schedules of data.driver_schedules) {
    let start_time = new Date(schedules.start_at + " " + schedules.start_time).getTime();
    let end_time = new Date(schedules.start_at + " " + schedules.end_time).getTime();
    driver_schedules_time_array.push(end_time - start_time);
  }

  let driver_assignments_array = [];
  for (let assignments of data.driver_assignments) {
    let assignment_start = new Date(assignments.assignment_start).getTime();
    let assignment_end = new Date(assignments.assignment_end).getTime();
    driver_assignments_array.push(assignment_end - assignment_start);
  }

  for (let i = 0,len = driver_schedules_time_array.length; i < len ; i++ ){
    result.push((driver_assignments_array[i]/driver_schedules_time_array[i]).toFixed(4));
  }

  return result;
}

