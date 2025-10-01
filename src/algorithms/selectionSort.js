export function* selectionSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      // yield before swap (to show comparison)
      yield { array: [...a], comparing: [j], min };

      if (a[j] < a[min]) {
        min = j
        // yield after swap
        yield { array: [...a], comparing: [j], min };
      }
    }

    if (min !== i) {
        [a[i], a[min]] = [a[min], a[i]];
        yield { array: [...a], comparing: [i, min], min };
    }
  }
}
