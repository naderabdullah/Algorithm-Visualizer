export function* quickSort(arr) {
    const a = [...arr];
    let swapCount = 0;
    let comparisonCount = 0;

    yield* quickSortHelper (a, 0, a.length - 1);

    function* quickSortHelper (array, low, high) {
        if (low < high) {
           const pivotIndex = yield* partition (array, low, high);

           yield* quickSortHelper (array, low, pivotIndex - 1);
           yield* quickSortHelper (array, pivotIndex + 1, high);
        }
    }

    function* partition (array, low, high) {
        const pivot = array[high];
        let i = low - 1;

        yield {
            array: [...array],
            comparing: [high],
            highlight: high,
            swaps: swapCount,
            comparisons: comparisonCount,
        };

        for (let j = low; j < high; j++) {
            comparisonCount++;

            yield {
                array: [...array],
                comparing: [j, high],
                highlight: high,
                swaps: swapCount,
                comparisons: comparisonCount,
            };

            if (array[j] <= pivot) {
                i++;

                if (i !== j) {
                    [array[i], array[j]] = [array[j], array[i]];
                    swapCount++;

                    yield {
                        array: [...array],
                        comparing: [i, j],
                        highlight: high,
                        swaps: swapCount,
                        comparisons: comparisonCount,
                    };
                }
            }
        }

        if (i + 1 !== high) {
            [array[i + 1], array[high]] = [array[high], array[i + 1]];
            swapCount++;

            yield {
                array: [...array],
                comparing: [i + 1, high],
                highlight: i + 1,
                swaps: swapCount,
                comparisons: comparisonCount,
            };
        }

        return i + 1;
    }

    return { 
        array: a, 
        comparing: [], 
        swaps: swapCount, 
        comparisons: comparisonCount 
    };
}