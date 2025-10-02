export function* insertionSort(arr) {
  const a = [...arr];
  let shiftCount = 0;
  let comparisonCount = 0;

  for (let i = 0; i < a.length; i++) {
    let currentValue = a[i];
    let currentPos = i;

    yield {
        array: [...a],
        comparing: [],
        highlight: currentPos,
        swaps: shiftCount,
        comparisons: comparisonCount,
    };

    let j = i - 1;

    while (j >= 0) {
        comparisonCount++;

        yield {
            array: [...a],
            comparing: [j, currentPos],
            highlight: currentPos,
            swaps: shiftCount,
            comparisons: comparisonCount,
        };

        if (a[j] > currentValue) {
            a[j + 1] = a[j];
            shiftCount++;

            currentPos = j;
            a[currentPos] = currentValue;

            yield {
                array: [...a],
                comparing: [],
                highlight: currentPos,
                swaps: shiftCount,
                comparisons: comparisonCount,
            };

            j--;
        } else {
            break;
        }
    }

    yield {
        array: [...a],
        comparing: [],
        highlight: currentPos,
        swaps: shiftCount,
        comparisons: comparisonCount,
    };

    yield {
        array: [...a],
        comparing: [],
        highlight: null,
        swaps: shiftCount,
        comparisons: comparisonCount,
    };
  }

  return {
    array: a,
    comparing: [],
    swaps: shiftCount,
    comparisons: comparisonCount
  };
}