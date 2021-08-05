const memoized: { [key: string]: number } = {};

export function normalize(
  enteredValue: number,
  minEntry = 0,
  maxEntry = 1.01,
  normalizedMin = 20,
  normalizedMax = 16000
) {
  const mx =
    (enteredValue - minEntry) ** 2 / (maxEntry - minEntry) ** 2;
  const preshiftNormalized = mx * (normalizedMax - normalizedMin);
  const shiftedNormalized = preshiftNormalized + normalizedMin;
  memoized[shiftedNormalized] = enteredValue;

  return shiftedNormalized;
}

export function denormalize(
  shiftedNormalized: number,
  minNormd = 0,
  maxNormd = 1,
  minEntered = 20,
  maxEntered = 16000
) {
  if (memoized[shiftedNormalized]) {
    return memoized[shiftedNormalized];
  }

  const preshiftNormalized = shiftedNormalized - minEntered;
  const mx = preshiftNormalized / (maxEntered - minEntered);
  const enteredValue = Math.pow(mx * (maxNormd - minNormd) ** 2, 1 / 2);

  memoized[shiftedNormalized] = enteredValue;

  return enteredValue;
}
