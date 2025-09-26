import { gainFromOptionString } from "./gain.js";

export function linePMF(lineDist) {
  const pmf = new Map();
  for (const { option, prob } of lineDist) {
    const g = gainFromOptionString(option);
    pmf.set(g, (pmf.get(g) ?? 0) + prob);
  }
  return pmf;
}

export function convolvePMF(pmfA, pmfB) {
  const pmf = new Map();
  for (const [ga, pa] of pmfA) {
    for (const [gb, pb] of pmfB) {
      const g = ga + gb;
      pmf.set(g, (pmf.get(g) ?? 0) + pa * pb);
    }
  }
  return pmf;
}

export function setPMF(distSet) {
  return convolvePMF(
    convolvePMF(linePMF(distSet.first), linePMF(distSet.second)),
    linePMF(distSet.third)
  );
}

export function improvementProb(distSet, currentGain) {
  const pmf = setPMF(distSet);
  let p = 0;
  for (const [g, prob] of pmf) {
    if (g > currentGain) p += prob;
  }
  return p;
}