// plotEfficiency.js
import { expectedSetGain } from "./logic/expectation.js";
import { neoDistribution } from "./data/neoDistribution.js";
import { megaDistribution } from "./data/megaDistribution.js";

const COST = {
  neo: 1500 / 11,   // ネオ11個換算の1回コスト
  mega: 3200 / 11   // メガ11個換算の1回コスト
};

function efficiencyNeo(currentFD, EN) {
  return (EN - currentFD) / COST.neo;
}

function efficiencyMega(currentFD) {
  const absEV = expectedSetGain(megaDistribution, currentFD);
  return (absEV - currentFD) / COST.mega;
}

export function plotEfficiency() {
  const EN = expectedSetGain(neoDistribution);
  const maxFD = EN * 1.5;
  const step = 0.2;

  console.log("=== ネオ vs メガ 効率グラフ（ASCII） ===");
  for (let c = 0; c <= maxFD; c += step) {
    const n = efficiencyNeo(c, EN);
    const m = efficiencyMega(c);

    const nBar = "█".repeat(Math.max(0, Math.round(n * 200)));
    const mBar = "▓".repeat(Math.max(0, Math.round(m * 200)));

    console.log(
      `FD=${c.toFixed(1)} | N:${n.toFixed(4)} ${nBar} | M:${m.toFixed(4)} ${mBar}`
    );
  }
}