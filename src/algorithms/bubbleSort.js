export function* bubbleSort(arr) {
  const a = [...arr];
  let swapCount = 0;
  let comparisonCount = 0;
  
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      comparisonCount++;
      // yield before swap (to show comparison)
      yield { 
        array: [...a], 
        comparing: [j, j + 1], 
        swaps: swapCount, 
        comparisons: comparisonCount 
      };

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapCount++;
        // yield after swap
        yield { 
          array: [...a], 
          comparing: [j, j + 1], 
          swaps: swapCount, 
          comparisons: comparisonCount 
        };
      }
    }
  }
  
  return { 
    array: a, 
    comparing: [], 
    swaps: swapCount, 
    comparisons: comparisonCount 
  };
}