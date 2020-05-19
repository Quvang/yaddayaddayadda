var userToFollow = document.querySelector('.profile-user-name').innerHTML;
var userFollowing = document.querySelector('.userFollowingArray').value;

console.log(userToFollow);
console.log(userFollowing);

if (userFollowing.includes(userToFollow) == true) {
  document.getElementById('followBtn').value = 'Unfollow';
} else {
  document.getElementById('followBtn').value = 'Follow';
}
