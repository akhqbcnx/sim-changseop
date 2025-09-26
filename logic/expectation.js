// logic/expectation.js

// ネオ／メガ共通の期待値計算
// distribution: { first:[], second:[], third:[] }
// currentFD: nullならネオ（単純平均）、数値ならメガ（現状と比較してmaxを取る）
export function expectedSetGain(distribution, currentFD = null) {
  let total = 0;
  for (const first of distribution.first) {
    for (const second of distribution.second) {
      for (const third of distribution.third) {
        const prob = first.prob * second.prob * third.prob;
        const gain = first.gain + second.gain + third.gain;

        if (currentFD === null) {
          // ネオ用（単純平均）
          total += prob * gain;
        } else {
          // メガ用（現状と比較して良い方を選ぶ）
          total += prob * Math.max(currentFD, gain);
        }
      }
    }
  }

  return total;
}