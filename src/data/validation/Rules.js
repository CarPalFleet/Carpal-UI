import { indicator } from './Indicator';
import {
  calculateDriverCapacity,
  calculateDriverUsability,
} from '../routing/Routing';

/** Change the driver slot that has confirmed orders
 * Rule 1:: Can't change the driver slot that has confirmed orders.
 * Show Error
 * @param {object} updatedRoute
 * @return {object} pass/error object
 */
export const changeDriverSlot = (updatedRoute) => {
  return updatedRoute.jobId ? indicator.pass : indicator.error;
};

/** Add order on the schedule
 * Rule 2. I can't place an order on a schedule that's not available (block user)
 * @param {object} newOrder
 * @param {object} driverSchedules
 * @return {object} pass/error object
 */
export const placeOrderOnSchedule = (newOrder, driverSchedules) => {
  newOrder.startTime && newOrder.endTime;
  driverSchedules.forEach((schd) => {});
  // return driverObject.jobId ? indicator.pass : indicator.error;
};

/** Check whethere delivery time is earlier than pickup or not
 * Rule 3:: Delivery can't be scheduled before the related pickup (show warning)
 * Rule 5 :: No delivery location can be scheduled before the initial pickup
 * @param {object} routeLocations
 * @return {object} pass/error object
 */
export const deliveryBeforePickUp = (routeLocations) => {
  let grouppedLocations = reduce(
    routeLocations,
    groupRouteLocationsByLocationId
  );
  return findValueInArray(grouppedLocations, comparePickupAndDropOffWindow)
    ? indicator.error
    : indicator.pass;
};

/** Add order on the schedule
 * Rule 4:: Pickup can't be duplicate on the same route
 * @param {object} driverObject
 * @return {object} pass/warn
 */
export const duplicatePickUpInSameRoute = (driverObject) => {
  const fieldName = 'locationTypeId'; // location Type Id means pickup or drop off
  return checkDuplicateInObject(
    fieldName,
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
 * @return {object} pass/error object
 */
export const checkDuplicateDestination = (driverObject) => {
  return findValueInArray(driverObject, isDuplicateDestination)
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
 * @return {object} pass/error object
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
 * @return {object} pass/error object
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
 * @param {array} routes
 * @param {object} updatedRouteLocation
 * @return {object} pass/error object
 */
export const updateRouteLocationOnLockedJob = (
  routes,
  updatedRouteLocation
) => {
  return findValueInArray(
    routes,
    isRoutelocked.bind(null, updatedRouteLocation.routeId)
  )
    ? indicator.pass
    : indicator.error;
};

/**
 * Rule 11:: Can't add over lapping slot
 * @param {object} startTime
 * @param {object} endTime
 * @param {object} driverObject
 * @return {object} pass/error object
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

/** Check the same value in objects inside of array
 * If there's same value, return true
 * Otherwise return false
 * @param {array} array
 * @param {fn} callback
 * callback function will operate different validation
 * @return {boolean} true/false
 */
function findValueInArray(array, callback) {
  return array.find(callback);
}

// method creates a new array with the results of calling a provided function on every element in the calling array.
/** Check the same value in objects inside of array
 * If there's same value, return true
 * Otherwise return false
 * @param {array} array
 * @param {fn} callback
 * callback function will operate different validation
 * @return {boolean} true/false
 */
function itemIterations(array, callback) {
  return array.forEach(callback);
}

/** check duplicate proper in the object
 * @param {array} array
 * @param {fn} callback
 * @return {boolean} true/false
 */
function reduce(array, callback) {
  return array.reduce(callback);
}

/** check duplicate proper in the object
 * @param {string} propertyName
 * @param {array} inputArray
 * @return {boolean} true/false
 */
function checkDuplicateInObject(propertyName, inputArray) {
  let seenDuplicate = false;
  let tempObject = {};
  itemIterations(
    inputArray,
    findDuplicate.bind(null, seenDuplicate, tempObject, propertyName)
  );

  return seenDuplicate;
}

/** check duplicate proper in the object
 * @param {boolean} seenDuplicate
 * @param {object} tempObject
 * @param {string} propertyName
 * @param {array} item
 */
function findDuplicate(seenDuplicate, tempObject, propertyName, item) {
  let itemPropertyName = item[propertyName];
  if (itemPropertyName in tempObject) {
    tempObject[itemPropertyName].duplicate = true;
    item.duplicate = true;
    seenDuplicate = true;
  } else {
    tempObject[itemPropertyName] = item;
    delete item.duplicate;
  }
}

/** check route sequence
 * @param {object} updatedRoute
 * @param {object} assignedRoute
 * @return {boolean} true/false
 */
function checkRouteSequence(updatedRoute, assignedRoute) {
  return updatedRoute.id && assignedRoute.routeId === updatedRoute.id;
}

/** check duplicate proper in the object
 * @param {string} location
 * @param {array} index
 * @return {boolean} true/false
 */
function isDuplicateDestination(location, index) {}

/** check duplicate proper in the object
 * @param {string} location
 * @param {array} index
 * @return {boolean} true/false
 */
function isRoutelocked(updatedRouteId, route) {
  return route.jobId && route.id === updatedRouteId;
}

/** check duplicate property in the object
 * @param {string} groups
 * @param {array} routeLocation
 * @param {array} index
 * @return {object} groups // groupped object
 */
function groupRouteLocationsByLocationId(groups = [], routeLocation, index) {
  let locationIndex;
  if (groups[routeLocation.groupingLocationId].length) {
    locationIndex = 0;
  }

  groups[routeLocation.groupingLocationId][locationIndex].push(routeLocation);

  return groups;
}

/** compare Pickup Time Window and Delivery Time Window
 * Return true if pickup start Time is greater than drop off start time
 * @param {object} routeLocation #routeLocation Object
 * @param {array} index
 * @param {array} routeLocations #routeLocation Array
 * @return {boolean} true/false
 */
function comparePickupAndDropOffWindow(
  routeLocation,
  index,
  routeLocations = []
) {
  return index > 0
    ? routeLocations[0].startTime >= routeLocation.startTime
    : false;
}
