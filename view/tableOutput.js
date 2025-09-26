// 表出力をまとめる

export function printResultTable(rows) {
  console.table(rows.map(r => ({
    "上潜在": r["上潜在"],
    "現在FD": r["現状最終"].toFixed(3),
    "期待FD": r["単発期待値"].toFixed(3),
    "差分FD": r["期待値差分"].toFixed(3),
    "改善確率": (r["改善確率"] * 100).toFixed(2) + "%",
    "期待値(回)": Number.isFinite(r["期待値(回)"])
      ? r["期待値(回)"].toFixed(2)
      : "∞",
    "中央値(回)": r["中央値(回)"],
    "75%到達(回)": r["75%到達(回)"],
    "90%到達(回)": r["90%到達(回)"]
  })));
}