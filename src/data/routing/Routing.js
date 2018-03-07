/*

@params
Input
data: Object

Output
percentage: string

@description
Calculate the usage % of driver.

*/

export const calculateDriverUsage = (data) => {
    class exception {
        constructor(message) {
            this.message = message;
        }
    }
    try {
        if (!data) {
            throw new exception('data is empty');
        }
        if (!data.driver_schedules || !data.driver_schedules.length) {
            throw new exception('driver_schedules is empty');
        }
        if (!data.driver_assignments || !data.driver_assignments.length) {
            throw new exception('driver_assignments is empty');
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
            throw new exception('The denominator cannot be zero.');
        }

        return (driverAssignmentsTime / driverSchedulesTime).toFixed(4);

    } catch (e) {
        console.log(e.message);
    }
}