export function* radixSort(arr) {
  const a = [...arr];
  let swapCount = 0;
  let comparisonCount = 0;

  const max = Math.max(...a);
  const maxDigits = max.toString().length;

  function getDigit(num, digitPos) {
    return Math.floor(Math.abs(num) / Math.pow(10, digitPos)) % 10;
  }

  for (let digitPos = 0; digitPos < maxDigits; digitPos++) {
    const buckets = Array.from({ length: 10 }, () => []);

    for (let i = 0; i < a.length; i++) {
        const digit = getDigit(a[i], digitPos);
        buckets[digit].push(a[i]);

        yield {
            array: [...a],
            buckets: buckets.map(b => [...b]),
            digitPos: digitPos,
            highlight: i,
            comparing: [],
            swaps: swapCount,
            comparisons: comparisonCount,
        };

        comparisonCount++;
    }

    yield {
      array: [...a],
      buckets: buckets.map(b => [...b]),
      digitPos: digitPos,
      highlight: null,
      comparing: [],
      swaps: swapCount,
      comparisons: comparisonCount
    };

    let writeIndex = 0;
    for (let bucketIdx = 0; bucketIdx < 10; bucketIdx++) {
        for (let j = 0; j < buckets[bucketIdx].length; j++) {
            a[writeIndex] = buckets[bucketIdx][j];

            yield {
                array: [...a],
                buckets: null,  
                digitPos: digitPos,
                highlight: writeIndex,
                comparing: [],
                swaps: swapCount,
                comparisons: comparisonCount
            };

            writeIndex++;
            swapCount++;
        }
    }

    yield {
      array: [...a],
      buckets: null,
      digitPos: digitPos,
      highlight: null,
      comparing: [],
      swaps: swapCount,
      comparisons: comparisonCount
    };
  }

  return {
    array: a,
    buckets: null,
    digitPos: maxDigits - 1,
    comparing: [],
    highlight: null,
    swaps: swapCount,
    comparisons: comparisonCount
  };
}