import { indicator } from './Indicator';
import {
  calculateDriverCapacity,
  calculateDriverUsability,
} from '../routing/Routing';

/** Change the driver slot that has confirmed orders
 * Rule 1:: Can't change the driver slot that has confirmed orders.
 * Show Error
 * @param {object} updatedRoute
 * @return {object} error
 */
export const changeDriverSlot = (updatedRoute) => {
  return updatedRoute.jobId ? indicator.pass : indicator.error;
};

/** Add order on the schedule
 * Rule 2. I can't place an order on a schedule that's not available (block user)
 * Rule 10. You cannot move an order (vertically or horizontally) on a 'locked' job
 * @param {object} driverObject
 * @return {object} pass/warn/error/noti
 */
export const placeOrderOnSchedule = (driverObject) => {
  return driverObject.jobId ? indicator.pass : indicator.error;
};

/** Check whethere delivery time is earlier than pickup or not
 * Rule 3 :: Delivery shouldn't be before related pickup
 * Rule 5:: Delivery can't be scheduled before the related pickup (show warning)
 * @param {object} routeLocations
 * @return {object} pass/warn/error/noti
 */
export const deliveryBeforePickUp = (routeLocations) => {
  let grouppedLocations = reduce(routeLocations, groupRoute);

  return find(grouppedLocations, compareStartTimeAndEndTime)
  ? indicator.error
  : indicator.pass;
};

/** Add order on the schedule
 * Rule 4:: Can't be place order on a schdeule
 * @param {object} driverObject
 * @return {object} pass/warn/error/noti
 */
export const duplicatePickUpInSameRoute = (driverObject) => {
  return checkDuplicateInObject(
    'locationTypeId', //field name
    driverObject.routes.routeLocations // array
  )
    ? indicator.warn
    : indicator.pass;
};

/** Route Location Verticle Moving
 * Rule 6:: Vertical moving: always move pickup AND drop-off.
 * Check for duplicate on destination.
 * don’t move the pickup location on the origin if there’s other drop-off that are not vertically moved. (notify user)
 * @param {object} driverObject
 * @return {object} pass/warn/error/noti
 */
export const checkDuplicateDestination = (driverObject) => {
  return find(driverObject, isDuplicateDestination)
    ? indicator.error
    : indicator.pass;
};

/** Route Location Verticle Moving
 * Rule 7:: Capacity validation on pop-up: can't choose value smaller than what's on the route already (block user)
 * @param {object} driverObject
 * @return {object} pass/warn/error/noti
 */
export const capacity = (driverObject) => {
  return driverObject.jobId ? indicator.error : indicator.pass;
};

/** Route Location Verticle Moving
 * Rule 8:: Capacity validation on pop-up: can't choose value smaller than what's on the route already (block)
 * Rule 9:: You can't add an order to a route that has insufficient or no capacity (warning)
 * @param {object} newCapacity
 * @param {object} driverObject
 * @return {object} pass/warn/error/noti
 */
export const checkCapacityOnRoute = (newCapacity, driverObject) => {
  return calculateDriverCapacity(newCapacity, driverObject.driver_schedules)
    ? indicator.pass
    : indicator.error;
};

/** Route Location Verticle Moving
 * Rule 9:: Check for duplicate on destination
 * @param {object} newAvailability
 * @param {object} driverObject
 * @return {object} pass/warn/error/noti
 */
export const checkAvailabilityOnRoute = (newAvailability, driverObject) => {
  return calculateDriverUsability(
    newAvailability,
    driverObject.driver_schedules
  )
    ? indicator.pass
    : indicator.error;
};

/** Update Route Location (Change Sequence) on Order
 * Rule 10. You cannot move an order (vertically or horizontally) on a 'locked' job
 * @param {array} driverAssignments
 * @param {object} updatedRoute
 * @return {object} pass/warn/error/noti
 */
export const changeRouteSequenceOnOrder = (driverAssignments, updatedRoute) => {
  return find(driverAssignments, checkRouteSequence)
    ? indicator.pass
    : indicator.error;
};

/**
 * Rule 11:: Can't add over lapping slot
 * @param {object} startTime
 * @param {object} endTime
 * @param {object} driverObject
 * @return {object} pass/warn/error/noti
 */
export const overLappingSlot = (startTime, endTime, driverObject) => {
  if (endTime >= driverObject.startTime) {
    return indicator.pass;
  } else if (driverObject.endTime <= startTime) {
    return indicator.pass;
  }
  return indicator.error;
};

/* Other Dependencies */

/** check duplicate proper in the object
 * @param {string} propertyName
 * @param {array} inputArray
 * @return {object} pass/warn/error/noti
 */
function checkDuplicateInObject(propertyName, inputArray) {
  let seenDuplicate = false;
  let testObject = {};

  map(inputArray, findDuplicate);
  return seenDuplicate;
}

/** check duplicate proper in the object
 * @param {array} array
 * @param {fn} callback
 * @return {object} pass/warn/error/noti
 */
function find(array, callback) {
  return array.find(callback);
}

/** check duplicate proper in the object
 * @param {array} array
 * @param {fn} callback
 * @return {object} pass/warn/error/noti
 */
function map(array, callback) {
  return array.map(callback);
}

/** check duplicate proper in the object
 * @param {array} array
 * @param {fn} callback
 * @return {object} pass/warn/error/noti
 */
function reduce(array, callback) {
  return array.reduce(callback);
}

/** check duplicate proper in the object
 * @param {string} propertyName
 * @param {array} inputArray
 * @return {object} pass/warn/error/noti
 */
function findDuplicate(item) {
  let itemPropertyName = item[propertyName];
  if (itemPropertyName in testObject) {
    testObject[itemPropertyName].duplicate = true;
    item.duplicate = true;
    seenDuplicate = true;
  } else {
    testObject[itemPropertyName] = item;
    delete item.duplicate;
  }

/** check duplicate proper in the object
 * @param {string} propertyName
 * @param {array} inputArray
 * @return {object} pass/warn/error/noti
 */
function checkRouteSequence(assignedRoute) {
  return updatedRoute.id && assignedRoute.routeId === updatedRoute.id;
}

/** check duplicate proper in the object
 * @param {string} propertyName
 * @param {array} inputArray
 * @return {object} pass/warn/error/noti
 */
function isDuplicateDestination(location, index) {
  if (index > 0) {
    // Skip location index zero, it's pickup
    return driverObject[0].startTime >= location.startTime;
  }
  return false;
}

/** check duplicate proper in the object
 * @param {string} propertyName
 * @param {array} inputArray
 * @return {object} pass/warn/error/noti
 */
function groupRoute(groups = [], routeLocation, index) {
    let locationIndex;
    if (groups[routeLocation.groupingLocationId].length) {
      locationIndex = 0;
    }

    groups[routeLocation.groupingLocationId][locationIndex].push(
      routeLocation
    );

    return groups;
}

/** check duplicate proper in the object
 * @param {string} propertyName
 * @param {array} inputArray
 * @return {object} pass/warn/error/noti
 */
function groupRoute(location, index) {
    if (index > 0) {
      // Skip location index zero, it's pickup
      return grouppedLocations[0].startTime >= location.startTime;
    }
    return false;
}
