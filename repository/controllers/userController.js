const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// // Avatar upload destination - avatar unique filename
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images/avatar');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

// Avatar upload to buffer - (Due to sharp package)
const multerStorage = multer.memoryStorage();

// Avatar filetype validation
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload imagefiles only!', 400), false);
  }
};

// Avatar Upload
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Avatar Upload ...Shortifier I guess
exports.uploadUserAvatar = upload.single('avatar');

// Resize Avatars
exports.resizeUserAvatar = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500, { fit: 'cover' })
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/avatar/${req.file.filename}`);

  next();
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates. Please use /updateMyPassword', 400));
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'username', 'email', 'firstName', 'lastName');
  if (req.file) filteredBody.avatar = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  // user.findOne({ _id: req.params.id })

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.save(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.followUser = catchAsync(async (req, res, next) => {
  const currentUser = req.body.currentUser;
  // console.log('-----Current User ID-----\n' + currentUser); // User ID

  const user = await User.findById(currentUser); // User Object
  // console.log('-----Find User By ID Object-----\n' + user);

  const userToFollow = req.body.thisUser; // #{userData[0].username}
  // console.log('-----User To Follow-----\n' + userToFollow);

  following = { following: userToFollow }; // Object Key and value to pull/push
  // console.log('-----Push/Pull into/from Following Array-----\n' + JSON.stringify(following));

  // function If userToFollow exist in user.following array return userToFollow
  function compare(x) {
    return x == userToFollow;
  }
  var compare = user.following.find(compare);

  // Do the actualy comparison and do pull/push
  if (compare == userToFollow) {
    await User.findByIdAndUpdate(currentUser, { $pull: following }); // FIND THE USER and update
    // console.log(`You're no longer following ` + userToFollow);
  } else {
    await User.findByIdAndUpdate(currentUser, { $push: following }); // FIND THE USER and update
    // console.log(`You've starter to follow ` + userToFollow);
  }
  res.redirect('/dashboard');
  // res.redirect(req.get('referer'));
});
