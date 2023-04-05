const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/errorHandler")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary");
const Post = require("../models/postModel");

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name,username, email, password, avatar } = req.body;

    
    let ExistingUsername = await User.findOne({ username });
    let ExistingUser = await User.findOne({ email });
    if (ExistingUser || ExistingUsername) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    if(password.length<8){
        return res
        .status(400)
        .json({ success: false, message: "Password must be atleast 8 digits" });
    }
    let myCloud;
    if(avatar){
        myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        })
    }else{
        myCloud = {
            public_id: "avatars/defaultavatar_kqhdwp",
            url: "https://res.cloudinary.com/doqgoey64/image/upload/v1680688089/avatars/defaultavatar_kqhdwp.png",
        }
    }
    const user = await User.create({
        name,username, email, password,
        avatar: { 
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    })
    
    const token = user.getJWTToken();
    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    //     expiresIn: process.env.JWT_EXPIRE
    // })

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    }
    res.status(201).cookie("token", token, options).json({
        success: true,
        user,
        token,
    })

})

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Enter email and password", 404))
    }
    // agr password le aage + nhi lgaya to frontend me state me sirf if aur password jaega,,, + lga dia to sara data
    const user = await User.findOne({ email }).select("+password").populate("posts followers following");
    if (!user) {
        return next(new ErrorHandler("Email doesn't exist"));
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }

    // const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {
    //     expiresIn:process.env.JWT_EXPIRE
    // })
    const token = user.getJWTToken();
    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    }
    res.status(200).cookie("token", token, options).json({
        success: true,
        user,
        token,
    })

})

exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "logout"
    })
})


exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findOne(req.user.id).select("password");
    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old pass is incorrect", 400))
    }
    if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("passwords doesn't match", 400))
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
        success: true,
        user
    })

})

exports.updateProfile = catchAsyncError(async (req, res, next) => {
    // const newUserData = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     bio: req.body.bio
    // }
    // // for profile pic
    // if (req.body.avatar !== "") {
    //     const user = await User.findById(req.user.id);
        
    //     const imageId = user.avatar.public_id;
        
    //     await cloudinary.v2.uploader.destroy(imageId);
        
    //     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //         folder: "avatars",
    //         width: 150,
    //         crop: "scale",
    //     });
        
    //     newUserData.avatar = {
    //         // public_id: user.avatar.public_id,
    //         // url: user.avatar.url,
    //         public_id: myCloud.public_id,
    //         url: myCloud.secure_url,
    //     };
    // }

    // const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    //     new: true,
    //     runValidators: true,
    //     useFindAndModify: true,
    // })
    const user = await User.findById(req.user._id);

    const { name, email, avatar, bio } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if(bio){
        user.bio = bio;
    }

    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url;
    }
    await user.save();

    res.status(200).json({
        success: true,
        user
    })
})

// forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) return next(new ErrorHandler("User not found", 404))

    const resetPasswordToken = user.getResetPasswordToken();
    await user.save();

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetPasswordToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

    try {
        console.log(message)
        // await sendEmail({
        //     email: user.email,
        //     subject: `Ecommerce Password Recobery`,
        //     message,
        // })
        res.status(200).json({
            success: true,
            message: "email sent"
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return next(new ErrorHandler(error.message, 500))
    }

})

// reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) return next(new ErrorHandler("Reset password token is invalid or has been expired", 400))

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesnt match", 400))
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: "password updated"
    })
})


exports.followUser = catchAsyncError(async (req, res, next) => {
    const userToFollow = await User.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!userToFollow) return next(new ErrorHandler("user doesn't exist", 404));

    if (user.following.includes(userToFollow._id)) {

        const indexFollowing = user.following.indexOf(userToFollow._id);
        const indexFollower = userToFollow.followers.indexOf(user._id);
        user.following.splice(indexFollowing, 1);
        userToFollow.followers.splice(indexFollower, 1);

        await userToFollow.save();
        await user.save();
        return res.status(200).json({
            success: true,
            message: "User unfollowed successfully"
        })
    }

    // apni following me vo bnda add krna h 
    user.following.push(userToFollow._id);
    // us bnde ke followers me khud ko add krna h
    userToFollow.followers.push(user._id);

    await user.save();
    await userToFollow.save();

    res.status(200).json({
        success: true,
        message: "User followed successfully"
    })

})

exports.deleteProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const userId = user._id;
    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    await user.deleteOne();

    for (let i = 0; i < posts.length; i++) {
        const post = await Post.findById(posts[i]);
        await cloudinary.v2.uploader.destroy(post.image.public_id);
        await post.deleteOne();
    }
    // is user ko sbki following aur followers me se bhi delete krna h
    for (let i = 0; i < followers.length; i++) {
        const follower = await User.findById(followers[i]);

        const index = follower.following.indexOf(userId);
        follower.following.splice(index, 1)
        await follower.save();
    }

    for (let i = 0; i < following.length; i++) {
        const followedUser = await User.findById(following[i]);

        const index = followedUser.followers.indexOf(userId);
        followedUser.followers.splice(index, 1)
        await followedUser.save();
    }

    // logout bhi krna h jab profile hi delete kr denge
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "deleted"
    })
})

exports.myProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("posts followers following");

    res.status(200).json({
        success: true,
        user,
    })
})
// exports.myProfile = async (req, res) => {
//     try {
//       const user = await User.findById(req.user._id).populate(
//         "posts followers following"
//       );

//       res.status(200).json({
//         success: true,
//         user,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id).populate("posts followers following");
    if (!user) return next(new ErrorHandler("user not found", 404))


    res.status(200).json({
        success: true,
        user,
    })
})

// exports.getUserProfile = async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id).populate(
//         "posts followers following"
//       );

//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: "User not found",
//         });
//       }

//       res.status(200).json({
//         success: true,
//         user,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };



exports.getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const posts = [];

        for (let i = 0; i < user.posts.length; i++) {
            const post = await Post.findById(user.posts[i]).populate(
                "likes comments.user owner"
            );
            posts.push(post);
        }

        res.status(200).json({
            success: true,
            posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getUserPosts = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const posts = [];

        for (let i = 0; i < user.posts.length; i++) {
            const post = await Post.findById(user.posts[i]).populate(
                "likes comments.user owner"
            );
            posts.push(post);
        }

        res.status(200).json({
            success: true,
            posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({
            username: { $regex: req.query.username, $options: "i" },
            _id: { $ne: req.user._id }
        }).populate("followers");

        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getSuggestedUsers = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const users = await User.find({
            // _id: { $ne: req.user._id},
            _id: { $nin: user.following }
        }).populate("followers");

        let index;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === req.user._id) return index = i;
        }
        users.splice(index, 1)

        users.reverse();
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};