class RangeList {
  rangeList = []; // Store range list
  leftBoundary = Infinity; // Range list left boundary
  rightBoundary = -Infinity; // Range list right boundary

  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
  */
  add(range) {
    this.checkArgumentsValidity(range);
    const [rangeBegin, rangeEnd] = range;
    this.leftBoundary = Math.min(rangeBegin, this.leftBoundary);
    this.rightBoundary = Math.max(rangeEnd, this.rightBoundary);
    for (let i = this.leftBoundary; i < this.rightBoundary; i += 1) {
      if (i >= rangeBegin && i < rangeEnd) {
        this.rangeList[i] = true;
      }
    }
  }

  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
  */
  remove(range) {
    this.checkArgumentsValidity(range);
    const [rangeBegin, rangeEnd] = range;
    for (let i = this.leftBoundary; i < this.rightBoundary; i += 1) {
      if (i >= rangeBegin && i < rangeEnd) {
        this.rangeList[i] = false;
      }
    }

    // Reset boundary if range list is empty now
    if (rangeBegin === this.leftBoundary && rangeEnd === this.rightBoundary) {
      this.resetBoundary();
    }
  }

  /**
   * Prints out the list of ranges in the range list
   * @returns {String} Range list string e.g [1, 3) [19, 21)
  */
  print() {
    let result = '';
    let currentRangeStr = '';
    for (let i = this.leftBoundary; i < this.rightBoundary; i += 1) {
      if (currentRangeStr === '' && this.rangeList[i] === true) {
        // Generate current range string beginning
        currentRangeStr = `[${i}, `;

        // Loop to end of current range
        let tmpRangeCount = 0;
        let nextItem = this.rangeList[i];
        while (nextItem) {
          tmpRangeCount += 1;
          nextItem = this.rangeList[i + tmpRangeCount];
        }

        // Generate current range string end
        i += tmpRangeCount;
        currentRangeStr += `${i})`;

        // Append current range string to result
        result = result === '' ? currentRangeStr : `${result} ${currentRangeStr}`;
        
        // Reset current range string to empty
        currentRangeStr = '';
      }
    }

    // Display range list
    console.log(result);
    return result;
  }

  /**
   * Reset range list boundary
   */
  resetBoundary() {
    this.leftBoundary = Infinity;
    this.rightBoundary = -Infinity;
  }

  /**
   * Check if arguments is valid
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  checkArgumentsValidity(range) {
    const [rangeBegin, rangeEnd] = range;

    if (!Array.isArray(range) || (Array.isArray(range) && range.length !== 2)) {
      throw new Error('Arguments must be an array with two elements of integer, e.g [1, 3]');
    }

    if (!Number.isInteger(rangeBegin) || !Number.isInteger(rangeEnd)) {
      throw new Error('Arguments of range[0] & range[1] both must be integer, e.g [1, 3]');
    }

    if (rangeBegin > rangeEnd) {
      throw new Error('Arguments of range[0] must be less than range[1], e.g [1, 3]');
    }
  }
}

module.exports = RangeList;
