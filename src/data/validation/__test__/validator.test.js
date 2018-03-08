import { mock } from './mock';
import { changeDriverSlot } from '../Rules';

describe('Rule 1: Cannot change the driver slot that has confirmed orders.', () => {
  it('Should get driver details', async () => {
    let result = changeDriverSlot(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});

describe('Rule 2: I cannot place an order on a schedule that is not available (block user)', () => {
  it('Should get driver details', async () => {
    let result = capacity(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});

describe('Rule 3: Delivery cannot be scheduled before the related pickup (show warning)', () => {
  it('Should get driver details', async () => {
    let result = calculateDriverCapacity(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});

describe('Rule 4:: Pickup cannot be duplicate on the same route', () => {
  it('Should get driver details', async () => {
    let result = checkAvailabilityOnRoute(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});

describe('Rule 5 :: No delivery location can be scheduled before the initial pickup', () => {
  it('Should get driver details', async () => {
    let result = updateRouteLocationOnLockedJob(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});

describe('Rule 7:: Capacity validation on pop-up: cannot choose value smaller than what is on the route already', () => {
  it('Should get driver details', async () => {
    let result = overLappingSlot(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});

describe('Rule 1: Cannot change the driver slot that has confirmed orders.', () => {
  it('Should get driver details', async () => {
    let result = findValueInArray(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});

describe('Rule 1: Cannot change the driver slot that has confirmed orders.', () => {
  it('Should get driver details', async () => {
    let result = itemIterations(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});

describe('Rule 1: Cannot change the driver slot that has confirmed orders.', () => {
  it('Should get driver details', async () => {
    let result = reduce(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});

describe('Rule 1: Cannot change the driver slot that has confirmed orders.', () => {
  it('Should get driver details', async () => {
    let result = checkDuplicateInObject(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});

describe('Rule 1: Cannot change the driver slot that has confirmed orders.', () => {
  it('Should get driver details', async () => {
    let result = findDuplicate(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});

describe('Rule 1: Cannot change the driver slot that has confirmed orders.', () => {
  it('Should get driver details', async () => {
    let result = checkRouteSequence(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});

describe('Rule 1: Cannot change the driver slot that has confirmed orders.', () => {
  it('Should get driver details', async () => {
    let result = isDuplicateDestination(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});

describe('Rule 1: Cannot change the driver slot that has confirmed orders.', () => {
  it('Should get driver details', async () => {
    let result = isRoutelocked(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});

describe('Rule 1: Cannot change the driver slot that has confirmed orders.', () => {
  it('Should get driver details', async () => {
    let result = groupRouteLocationsByLocationId(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});

describe('Rule 1: Cannot change the driver slot that has confirmed orders.', () => {
  it('Should get driver details', async () => {
    let result = comparePickupAndDropOffWindow(mock.routes[0]);
    expect(result).toBeTruthy();
  });
});
