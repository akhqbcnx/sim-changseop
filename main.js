import { neoDistribution } from "./data/neoDistribution.js";
import { megaDistribution } from "./data/megaDistribution.js";
import { currentSetGain } from "./logic/gain.js";
import { expectedSetGain } from "./logic/expectation.js";
import { improvementProb } from "./logic/probability.js";
import { trialStats } from "./logic/trials.js";
import { printResultTable } from "./view/tableOutput.js";
import { FD_WEIGHTS } from "./data/fdWeight.js";

function attachFD(distribution) {
  const convert = arr =>
    arr.map(opt => ({
      ...opt,
      gain: FD_WEIGHTS[opt.option] ?? 0
    }));

  return {
    first: convert(distribution.first),
    second: convert(distribution.second),
    third: convert(distribution.third)
  };
}

const combos = [
  { label: "有効オプションなし", lines: [] },
  { label: "攻撃+12%のみ", lines: ["攻撃+12%"] },
  { label: "ボスダメ+40%のみ", lines: ["ボスダメージ+40%"] },
  { label: "攻撃+9%+攻撃+9%", lines: ["攻撃+9%", "攻撃+9%"] },
  { label: "攻撃+9%+ボスダメ30%", lines: ["攻撃+9%", "ボスダメージ+30%"] },
  { label: "ボスダメ+35%+攻撃+9%", lines: ["ボスダメージ+35%", "攻撃+9%"] },
  { label: "ボスダメ+35%+ボスダメ30%", lines: ["ボスダメージ+35%", "ボスダメージ+30%"] },
  { label: "攻撃+12%+攻撃+9%", lines: ["攻撃+12%", "攻撃+9%"] },
  { label: "攻撃+12%+ボスダメ30%", lines: ["攻撃+12%", "ボスダメージ+30%"] },
  { label: "ボスダメ+40%+攻撃+9%", lines: ["ボスダメージ+40%", "攻撃+9%"] },
  { label: "ボスダメ+40%+ボスダメ30%", lines: ["ボスダメージ+40%", "ボスダメージ+30%"] }
];

// distribution: 確率分布
// label: 出力ラベル
// isSelectable: 前後選択可能かどうか（メガなど）
function evaluateCube(distribution, label, isSelectable = false) {
  // ネオ用は全体で共通の期待値を先に計算
  const baseEV = !isSelectable ? expectedSetGain(distribution) : null;

  const rows = combos.map(c => {
    const current = currentSetGain(c.lines);

    // ネオなら共通の期待値、メガなら現状ごとに計算
    const absEV = isSelectable ? expectedSetGain(distribution, current) : baseEV;

    const net = absEV - current;
    const pImprove = improvementProb(distribution, current);
    const { mean, median, q75, q90 } = trialStats(pImprove);

    return {
      "上潜在": c.label,
      "現状最終": current,
      "単発期待値": absEV,
      "期待値差分": net,
      "改善確率": pImprove,
      "期待値(回)": mean,
      "中央値(回)": median,
      "75%到達(回)": q75,
      "90%到達(回)": q90
    };
  });

  console.log(`=== ${label} の結果 ===`);
  printResultTable(rows);
}

function evaluateAll() {
  const neoWithFD = attachFD(neoDistribution);
  const megaWithFD = attachFD(megaDistribution);

  evaluateCube(neoWithFD, "ネオキューブ", false);
  evaluateCube(megaWithFD, "メガキューブ", true);
}

evaluateAll();