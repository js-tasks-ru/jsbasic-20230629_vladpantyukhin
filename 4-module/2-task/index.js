function makeDiagonalRed(table) {
  // ваш код...
  for (let i = 0; i < table.rows.length; i += 1) {
    table.rows[i].cells[i].style.backgroundColor = "red";
  }
}
