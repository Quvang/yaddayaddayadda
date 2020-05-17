// ADMIN CONTROLLER
exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('adminpanel', {
    title: '🔒🔒🔒 | adminpanel',
    user: updatedUser,
  });
});
