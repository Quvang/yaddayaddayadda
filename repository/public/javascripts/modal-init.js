(function () {
  var $content = $('#profile-followers-modal').detach(); // Remove modal from page

  $('#profile-followers').on('click', function () {
    // Click handler to open modal
    modal.open({ content: $content, width: 340, height: 800 });
  });
})();
