document.getElementById("calcBtn").addEventListener("click", () => {
  // 仮の計算処理（MVPではダミー値）
  const resultTable = document.getElementById("resultTable");
  resultTable.innerHTML = `
    <tr><td>ネオ</td><td>18%</td><td>120個</td></tr>
    <tr><td>メガ</td><td>15%</td><td>150個</td></tr>
    <tr><td>ブラック</td><td>20%</td><td>90個</td></tr>
  `;
});
