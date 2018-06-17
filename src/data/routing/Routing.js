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
        if (!data.driverSchedules || !data.driverSchedules.length) {
            throw new Exception('driverSchedules is empty');
        }
        if (!data.driverAssignments || !data.driverAssignments.length) {
            throw new Exception('driverAssignments is empty');
        }
        let driverSchedulesTime = null;
        for (let schedules of data.driverSchedules) {
            let startTime = new Date(`${schedules.startAt} ${schedules.startTime}`).getTime();
            let endTime = new Date(`${schedules.startAt} ${schedules.endTime}`).getTime();
            driverSchedulesTime += (endTime - startTime);
        }
        let driverAssignmentsTime = null;
        for (let assignments of data.driverAssignments) {
            let assignmentStart = new Date(assignments.assignmentStart).getTime();
            let assignmentEnd = new Date(assignments.assignmentEnd).getTime();
            driverAssignmentsTime += (assignmentEnd - assignmentStart);
        }
        if (!driverSchedulesTime) {
            throw new Exception('The denominator cannot be zero.');
        }

        return (driverAssignmentsTime / driverSchedulesTime).toFixed(4);
    } catch (e) {
        return -1;
    }
};
