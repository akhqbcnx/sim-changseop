// 試行回数に関する計算をまとめる

// 累積到達回数を計算
export function quantileTrials(p, q) {
  if (p <= 0) return Infinity;
  return Math.ceil(Math.log(1 - q) / Math.log(1 - p));
}

// 期待値・中央値・75%・90%をまとめて返す
export function trialStats(p) {
  if (p <= 0) {
    return { mean: Infinity, median: Infinity, q75: Infinity, q90: Infinity };
  }
  return {
    mean: 1 / p,
    median: quantileTrials(p, 0.5),
    q75: quantileTrials(p, 0.75),
    q90: quantileTrials(p, 0.90)
  };
}