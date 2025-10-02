function partition (arr, low, high) {
    const a = [...arr];
    // const high = a.indexOf(Math.max(a));
    // const low = a.indexOf(Math.min(a));

    let pivot = a[high];
    let i = low - i;

    for (j = low; j < high; j++) {
        if (a[j] <= pivot) {
            i++;
            [a[i], a[j]] = [[a[j]], [a[i]]];
        }
    }

    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    return (i + 1);
}

export function* quickSort(arr) {
    const a = [...arr];
    let high = a.length - 1;
    let low = 0;

    if (low < high) {
        let pivot = partition(a, low, high)
        quickSort(a, low, pivot - 1);
        quickSort(a, pivot + 1, high);
    }
}