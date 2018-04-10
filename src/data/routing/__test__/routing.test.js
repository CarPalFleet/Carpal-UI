import {calculateDriverUsage} from '../Routing';
const data = {
    "driverSchedules": [
        {
            "id": 123,
            "driverId": 10737,
            "startTime": "09:00",
            "endTime": "12:00",
            "startAt": "2018-02-01"
        },
        {
            "id": 124,
            "driverId": 10737,
            "startTime": "13:00",
            "endTime": "18:00",
            "startAt": "2018-02-01"
        }
    ],
    "driverAssignments": [
        {
            "id": 1234,
            "driverId": 10737,
            "routeId": 28,
            "jobId": null,
            "assignmentStart": "2018-02-19 10:00:00",
            "assignmentEnd": "2018-02-19 11:00:00",
        },
        {
            "id": 1235,
            "driverId": 10737,
            "routeId": 29,
            "jobId": null,
            "assignmentStart": "2018-02-19 14:00:00",
            "assignmentEnd": "2018-02-19 16:00:00",
        }
    ],
    "routes": [
        {
            "id": 28,
            "customerId": 14445,
            "driverId": 10737,
            "routeSettings": "{}",
            "pickupDate": "2018-02-19",
            "creatorUserId": 25143,
            "routeStatusId": 1,
            "routeStatusName": "Active",
            "orderId": null,
            "createdAt": "2018-02-18 05:00:37",
            "updatedAt": "2018-02-18 05:00:37",
            "routeLocations": [
                {
                    "id": 91,
                    "routeId": 28,
                    "sequence": 1,
                    "groupingLocationId": 27313,
                    "locationTypeId": 3,
                    "capacity": 20,
                    "routeLocationStatusId": 1,
                    "createdAt": "2018-02-18 05:00:37",
                    "updatedAt": "2018-02-18 05:00:37",
                    "addressDetails": {
                        "id": 256263,
                        "address": "310 Margaret Drive, Singapore 149303",
                        "unitNumber": null,
                        "buildingName": null,
                        "city": null,
                        "postalCode": null,
                        "countryCode": "SG",
                        "lat": "1.2960990000000265",
                        "long": "103.80795750000004",
                        "addressType": {
                            "id": 3,
                            "addressTypeName": "Pickup Location"
                        },
                        "createdAt": "2018-02-07 03:58:11",
                        "updatedAt": "2018-02-07 03:58:11"
                    },
                    "pickupDetails": {
                        "pickupDate": "2018-02-19",
                        "pickupWindowStart": "20:00:00",
                        "pickupWindowEnd": "21:00:00"
                    },
                    "deliveryDetails": []
                }
            ]
        }
    ]
};
test('test calculate driver usage', () => {
    expect(calculateDriverUsage(data)).toBe('0.3750');
});
