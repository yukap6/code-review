const RangeList = require('../RangeList');

const rl = new RangeList();

describe('Exception logic', () => {
  test('Arguments must be an array with two elements of integer', () => {
    expect(() => { rl.add('1, 5'); }).toThrowError(new Error('Arguments must be an array with two elements of integer, e.g [1, 3]'));
  });

  test('Arguments must be an array with two elements of integer', () => {
    expect(() => { rl.add([1, 2, 3]); }).toThrowError(new Error('Arguments must be an array with two elements of integer, e.g [1, 3]'));
  });
  
  test('Arguments of range[0] & range[1] both must be integer, e.g [1, 3]', () => {
    expect(() => { rl.add([1, '2']); }).toThrowError(new Error('Arguments of range[0] & range[1] both must be integer, e.g [1, 3]'));
  });
  
  test('Arguments of range[0] must be less than range[1], e.g [1, 3]', () => {
    expect(() => { rl.add([4, 1]); }).toThrowError(new Error('Arguments of range[0] must be less than range[1], e.g [1, 3]'));
  });
});

describe('Function add should perform as expected', () => {
  test('Add [1, 5] at first, should display: [1, 5)', () => {
    rl.add([1, 5]);
    expect(rl.print()).toBe('[1, 5)');
  });
  
  test('Then add [10, 20] , should display: [1, 5) [10, 20)', () => {
    rl.add([10, 20]);
    expect(rl.print()).toBe('[1, 5) [10, 20)');
  });
  
  test('Then add [20, 20] , should display: [1, 5) [10, 20)', () => {
    rl.add([20, 20]);
    expect(rl.print()).toBe('[1, 5) [10, 20)');
  });
  
  test('Then add [20, 21] , should display: [1, 5) [10, 21)', () => {
    rl.add([20, 21]);
    expect(rl.print()).toBe('[1, 5) [10, 21)');
  });

  test('Then add [2, 4] , should display: [1, 5) [10, 21)', () => {
    rl.add([2, 4]);
    expect(rl.print()).toBe('[1, 5) [10, 21)');
  });

  test('Then add [3, 8] , should display: [1, 8) [10, 21)', () => {
    rl.add([3, 8]);
    expect(rl.print()).toBe('[1, 8) [10, 21)');
  });

  test('Then add [10, 10] , should display: [1, 8) [10, 21)', () => {
    rl.add([10, 10]);
    expect(rl.print()).toBe('[1, 8) [10, 21)');
  });

});

describe('Function remove should perform as expected', () => {
  test('Then remove [10, 10] , should display: [1, 8) [10, 21)', () => {
    rl.remove([10, 10]);
    expect(rl.print()).toBe('[1, 8) [10, 21)');
  });

  test('Then remove [10, 11] , should display: [1, 8) [11, 21)', () => {
    rl.remove([10, 11]);
    expect(rl.print()).toBe('[1, 8) [11, 21)');
  });

  test('Then remove [15, 17] , should display: [1, 8) [11, 15) [17, 21)', () => {
    rl.remove([15, 17]);
    expect(rl.print()).toBe('[1, 8) [11, 15) [17, 21)');
  });

  test('Then remove [3, 19] , should display: [1, 3) [19, 21)', () => {
    rl.remove([3, 19]);
    expect(rl.print()).toBe('[1, 3) [19, 21)');
  });

  test('Then remove [-5, 1] , should display: [1, 3) [19, 21)', () => {
    rl.remove([-5, 1]);
    expect(rl.print()).toBe('[1, 3) [19, 21)');
  });

  test('Then remove [-7, -2] , should display: [1, 3) [19, 21)', () => {
    rl.remove([-7, -2]);
    expect(rl.print()).toBe('[1, 3) [19, 21)');
  });

  test('Then remove [21, 21] , should display: [1, 3) [19, 21)', () => {
    rl.remove([21, 21]);
    expect(rl.print()).toBe('[1, 3) [19, 21)');
  });

  test('Then remove [29, 50] , should display: [1, 3) [19, 21)', () => {
    rl.remove([29, 50]);
    expect(rl.print()).toBe('[1, 3) [19, 21)');
  });

  test('Then remove [2, 23] , should display: [1, 2)', () => {
    rl.remove([2, 23]);
    expect(rl.print()).toBe('[1, 2)');
  });
});

describe('Then add & remove intersects should perform as expected', () => {
  test('Then remove [1, 10] , should display(empty string): \'\'', () => {
    rl.remove([1, 10]);
    expect(rl.print()).toBe('');
  });

  test('Then add [1, 5] , should display: [1, 5)', () => {
    rl.add([1, 5]);
    expect(rl.print()).toBe('[1, 5)');
  });

  test('Then add [10, 21] , should display: [1, 5) [10, 21)', () => {
    rl.add([10, 21]);
    expect(rl.print()).toBe('[1, 5) [10, 21)');
  });

  test('Then add [25, 30] , should display: [1, 5) [10, 21) [25, 30)', () => {
    rl.add([25, 30]);
    expect(rl.print()).toBe('[1, 5) [10, 21) [25, 30)');
  });

  test('Then add [-10, -5] , should display: [-10, -5) [1, 5) [10, 21) [25, 30)', () => {
    rl.add([-10, -5]);
    expect(rl.print()).toBe('[-10, -5) [1, 5) [10, 21) [25, 30)');
  });

  test('Then add [-7, 4] , should display: [-10, 5) [10, 21) [25, 30)', () => {
    rl.add([-7, 4]);
    expect(rl.print()).toBe('[-10, 5) [10, 21) [25, 30)');
  });

  test('Then add [-13, -10] , should display: [-13, 5) [10, 21) [25, 30)', () => {
    rl.add([-13, -10]);
    expect(rl.print()).toBe('[-13, 5) [10, 21) [25, 30)');
  });

  test('Then remove [-13, 5] , should display: [10, 21) [25, 30)', () => {
    rl.remove([-13, 5]);
    expect(rl.print()).toBe('[10, 21) [25, 30)');
  });

  test('Then add [30, 49] , should display: [10, 21) [25, 49)', () => {
    rl.add([30, 49]);
    expect(rl.print()).toBe('[10, 21) [25, 49)');
  });

  test('Then remove [10, 21] , should display: [25, 49)', () => {
    rl.remove([10, 21]);
    expect(rl.print()).toBe('[25, 49)');
  });
});