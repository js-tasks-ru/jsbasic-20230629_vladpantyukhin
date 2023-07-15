function highlight(table) {
  // ваш код...
  for (let i = 1; i < table.rows.length; i += 1) {
    const line = table.rows[i];

    const status = table.rows[i].cells[3];
    if (!status.dataset.available) {
      line.hidden = true;
    } else {
      status.dataset.available === "true"
        ? line.classList.add("available")
        : line.classList.add("unavailable");
    }

    const gender = table.rows[i].cells[2];
    gender.innerHTML === "m"
      ? line.classList.add("male")
      : line.classList.add("female");

    const age = table.rows[i].cells[1];
    const ageNumber = parseInt(age.innerHTML, 10) || 0;
    if (ageNumber < 18) {
      line.style.textDecoration = "line-through";
    }
  }
}
