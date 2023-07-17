function makeFriendsList(friends) {
  // ваш код...
  const templateUl = document.createElement("ul");

  const liArray = friends.map((friend) => {
    const liElement = document.createElement("li");
    liElement.textContent = `${friend.firstName} ${friend.lastName}`;
    return liElement;
  });

  templateUl.append(...liArray);

  return templateUl;
}
