function isEmpty(obj) {
  // ваш код...
  if (typeof obj === "object") {
    for (let key in obj) {
      return !(obj[key] || obj[key] === undefined);
    }
    return true;
  }
}
