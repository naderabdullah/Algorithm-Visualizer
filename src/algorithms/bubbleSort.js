export function* bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      // yield before swap (to show comparison)
      yield { array: [...a], comparing: [j, j + 1] };

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        // yield after swap
        yield { array: [...a], comparing: [j, j + 1] };
      }
    }
  }
}
