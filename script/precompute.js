// ユーティリティ
function calcFD(options, weights = FD_WEIGHTS) {
  return options.reduce((sum, opt) => sum + (weights[opt] ?? 0), 0);
}

// 全パターン生成（直積）→ FD算出 → FDごとに確率を集計（ヒストグラム化）
function precomputeFDDistribution(distribution, weights = FD_WEIGHTS) {
  const fdProb = new Map(); // key: fd (number), value: prob (number)

  for (const f of distribution.first) {
    for (const s of distribution.second) {
      for (const t of distribution.third) {
        const options = [f.option, s.option, t.option];
        const prob = f.prob * s.prob * t.prob;
        const fd = calcFD(options, weights);

        fdProb.set(fd, (fdProb.get(fd) ?? 0) + prob);
      }
    }
  }

  // Map → ソート済み配列（FD降順）に変換
  const arr = Array.from(fdProb.entries())
    .map(([fd, prob]) => ({ fd, prob }))
    .sort((a, b) => b.fd - a.fd);

  // 正規化チェック（必要なら丸め）
  const sumProb = arr.reduce((s, x) => s + x.prob, 0);
  // console.log("sumProb", sumProb); // ≈ 1.0 に近い値になる

  return arr;
}

// ネオの期待FDは現状FDに依存しないため、定数化できる
function expectedFDFromPrecomputed(precomputed) {
  return precomputed.reduce((sum, x) => sum + x.fd * x.prob, 0);
}

// 実行
const PRECOMPUTED_NEO = precomputeFDDistribution(neoDistribution);
const PRECOMPUTED_MEGA = precomputeFDDistribution(megaDistribution);
const EXPECTED_FD_NEO = expectedFDFromPrecomputed(PRECOMPUTED_NEO);

// JSON 出力（コピー用）
console.log("NEO_FD_PROB =", JSON.stringify(PRECOMPUTED_NEO, null, 2));
console.log("MEGA_FD_PROB =", JSON.stringify(PRECOMPUTED_MEGA, null, 2));
console.log("EXPECTED_FD_NEO =", EXPECTED_FD_NEO);
