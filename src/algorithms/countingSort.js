export function* countingSort(arr) {
    const a = [...arr];
    let swapCount = 0;
    let comparisonCount = 0;

    const max = Math.max(...a);
    const count = Array(max + 1).fill(0);

    for (let i = 0; i < a.length; i++) {
        yield {
            array: [...a],
            comparing: [],
            highlight: i,
            swaps: swapCount,
            comparisons: comparisonCount,
        };
        count[a[i]]++;
    }

    let writeIdx = 0;
    
    for (let value = 0; value <= max; value++) {
        while (count[value] > 0) {
            comparisonCount++;

            let foundIdx = -1;
            for (let j = writeIdx; j < a.length; j++) {
                if (a[j] === value) {
                    foundIdx = j;
                    break;
                }
            }

            if (foundIdx !== -1 && foundIdx !== writeIdx) {
                yield {
                    array: [...a],
                    comparing: [writeIdx, foundIdx],
                    highlight: null,
                    swaps: swapCount,
                    comparisons: comparisonCount,
                };

                [a[writeIdx], a[foundIdx]] = [a[foundIdx], a[writeIdx]];
                swapCount++;

                yield {
                    array: [...a],
                    comparing: [],
                    highlight: writeIdx,
                    swaps: swapCount,
                    comparisons: comparisonCount,
                };
            } else if (foundIdx === writeIdx) {
                yield {
                    array: [...a],
                    comparing: [],
                    highlight: writeIdx,
                    swaps: swapCount,
                    comparisons: comparisonCount,
                };
            }

            count[value]--;
            writeIdx++;
        }
    }

    return { 
        array: a, 
        comparing: [], 
        swaps: swapCount, 
        comparisons: comparisonCount 
    };
}