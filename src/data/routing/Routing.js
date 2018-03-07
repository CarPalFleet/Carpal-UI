/**
* catch exceptions constructor
* @constructor
* @param {string} message
*/

class Exception {
    constructor(message) {
        this.message = message;
    }
}

/**
* Calculate the usage % of driver.
* @param {Object} data
* @return {string} percentage
*/

export const calculateDriverUsage = (data) => {
    try {
        if (!data) {
            throw new Exception('data is empty');
        }
        if (!data.driver_schedules || !data.driver_schedules.length) {
            throw new Exception('driver_schedules is empty');
        }
        if (!data.driver_assignments || !data.driver_assignments.length) {
            throw new Exception('driver_assignments is empty');
        }
        let driverSchedulesTime = null;
        for (let schedules of data.driver_schedules) {
            let startTime = new Date(`${schedules.start_at} ${schedules.start_time}`).getTime();
            let endTime = new Date(`${schedules.start_at} ${schedules.end_time}`).getTime();
            driverSchedulesTime += (endTime - startTime);
        }
        let driverAssignmentsTime = null;
        for (let assignments of data.driver_assignments) {
            let assignmentStart = new Date(assignments.assignment_start).getTime();
            let assignmentEnd = new Date(assignments.assignment_end).getTime();
            driverAssignmentsTime += (assignmentEnd - assignmentStart);
        }
        if (!driverSchedulesTime) {
            throw new Exception('The denominator cannot be zero.');
        }

        return (driverAssignmentsTime / driverSchedulesTime).toFixed(4);
    } catch (e) {
        return e.message;
    }
};
