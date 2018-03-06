import { indicator } from './Indicator';

export const validator = () => {
  /* Update Driver Slot*/
  return {
    /** changeDriverSlot
     * Rule 1:: Change driver slot that already confirmed order
     * @param {object} driverObject
     * @return {}
     */
    changeDriverSlot: (driverObject) => {
      return driverObject.jobId ? indicator.pass : indicator.error;
    },

    /** Add order on the schedule
     * Rule 2 & 10:: Can't be place order on a schdeule
     * @param {object} driverObject
     * @return {}
     */
    placeOrderOnSchedule: (driverObject) => {
      return driverObject.jobId ? indicator.pass : indicator.error;
    },

    /** Check whethere delivery time is earlier than pickup or not
     * Rule 3 and 5:: Delivery shouldn't be before related pickup
     * @param {object} pickup
     * @param {object} delivery
     * @return {}
     */
    deliveryBeforePickUp: (pickup, delivery) => {
      return delivery.startTime >= pickup.startTime
        ? indicator.error
        : indicator.console.warn;
    },

    /** Add order on the schedule
     * Rule 4:: Can't be place order on a schdeule
     * @param {object} driverObject
     * @return {}
     */
    duplicatePickUpInSameRoute: (driverObject) => {
      return this.checkDuplicateInObject(
        'locationTypeId',
        driverObject.routes.routeLocations
      )
        ? indicator.warn
        : indicator.pass;
    },

    /** Route Location Verticle Moving
     * Rule 6:: Check for duplicate on destination
     * @param {object} driverObject
     * @return {}
     */
    checkDuplicateDestination: (driverObject) => {
      driverObject.jobId ? indicator.error : indicator.pass;
    },

    /** Route Location Verticle Moving
     * Rule 7:: Check for duplicate on destination
     * @param {object} driverObject
     * @return {}
     */
    capacity: (driverObject) => {
      driverObject.jobId ? indicator.error : indicator.pass;
    },

    /** Route Location Verticle Moving
     * Rule 8:: Check for duplicate on destination
     * @param {object} driverObject
     * @return {}
     */
    inSufficientCapacity: (driverObject) => {
      driverObject.jobId ? indicator.error : indicator.pass;
    },

    /** Route Location Verticle Moving
     * Rule 9:: Check for duplicate on destination
     * @param {object} driverObject
     * @return {}
     */
    updateDriverSlot: (driverObject) => {
      driverObject.orderId ? indicator.pass : indicator.error;
    },

    /**
     * Rule 11:: Can't add over lapping slot
     * @param {object} driverObject
     * @return {}
     */
    overLappingSlot: (startTime, endTime, driverObject) => {
      if (endTime >= driverObject.startTime) {
        return indicator.pass;
      } else if (driverObject.endTime <= startTime) {
        return indicator.pass;
      }
      return indicator.error;
    },

    /* Other Dependencies */

    /** check duplicate proper in the object
     * @param {string} propertyName
     * @param {array} inputArray
     * @return {}
     */
    checkDuplicateInObject: (propertyName, inputArray) => {
      var seenDuplicate = false,
        testObject = {};

      inputArray.map(function(item) {
        var itemPropertyName = item[propertyName];
        if (itemPropertyName in testObject) {
          testObject[itemPropertyName].duplicate = true;
          item.duplicate = true;
          seenDuplicate = true;
        } else {
          testObject[itemPropertyName] = item;
          delete item.duplicate;
        }
      });

      return seenDuplicate;
    },
  };
};
