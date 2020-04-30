const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const auth = require('../controllers/authController.js');
const { forwardAuthenticated } = require('../config/auth');

router.get('/register', forwardAuthenticated, auth.register);
router.post('/register', auth.postRegister);

router.get('/login', forwardAuthenticated, auth.login);
router.post('/login', auth.postLogin);

router.get('/logout', auth.logout);

// Avatar implementation

router.post('/user/register', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded',
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./avatar/' + avatar.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size,
                },
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
