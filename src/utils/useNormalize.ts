import { useRef, useCallback } from "react";

import { normalize, denormalize } from "./normalize";

export function useNormalize(
  minEntry = 0,
  maxEntry = 1.01,
  normalizedMin = 20,
  normalizedMax = 16000
) {
  const memoizedNormd = useRef<{ [key: string]: number }>({});
  const memoizedDenormd = useRef<{ [key: string]: number }>({});

  const normalization = useCallback((value: number) => {
    if (memoizedNormd.current[value]) {
      return memoizedNormd.current[value];
    }

    const result = normalize(
      value,
      minEntry,
      maxEntry,
      normalizedMin,
      normalizedMax
    );
    memoizedNormd.current[value] = result;
    memoizedDenormd.current[result] = value;
    return result;
  }, [minEntry, maxEntry, normalizedMin, normalizedMax]);

  const denormalization = useCallback((value: number) => {
    if (memoizedDenormd.current[value]) {
      return memoizedDenormd.current[value];
    }

    const result = denormalize(
      value,
      minEntry,
      maxEntry,
      normalizedMin,
      normalizedMax
    );
    memoizedDenormd.current[result] = value;
    memoizedNormd.current[value] = result;

    return result;
  }, [minEntry, maxEntry, normalizedMin, normalizedMax]);

  return {
    normalize: normalization,
    denormalize: denormalization,
  };
}
