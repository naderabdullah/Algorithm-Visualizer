export function* selectionSort(arr) {
  const a = [...arr];
  let swapCount = 0;
  let comparisonCount = 0;
  
  for (let i = 0; i < a.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      comparisonCount++;
      // yield before swap (to show comparison)
      yield { 
        array: [...a], 
        comparing: [j], 
        min, 
        swaps: swapCount, 
        comparisons: comparisonCount 
      };

      if (a[j] < a[min]) {
        min = j;
        // yield after finding new min
        yield { 
          array: [...a], 
          comparing: [j], 
          min, 
          swaps: swapCount, 
          comparisons: comparisonCount 
        };
      }
    }

    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      swapCount++;
      yield { 
        array: [...a], 
        comparing: [i, min], 
        min, 
        swaps: swapCount, 
        comparisons: comparisonCount 
      };
    }
  }
  
  return { 
    array: a, 
    comparing: [], 
    swaps: swapCount, 
    comparisons: comparisonCount 
  };
}