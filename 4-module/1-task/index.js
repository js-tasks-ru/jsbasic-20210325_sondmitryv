function makeFriendsList(friends) {
  let list = document.createElement('ul');
  for (const friendsItem of friends) {
    list.insertAdjacentHTML('beforeEnd', `<li>${friendsItem.firstName} ${friendsItem.lastName}</li>`);
  }
  return list;
}
