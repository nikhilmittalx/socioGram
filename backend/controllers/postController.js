const catchAsyncError = require("../middleware/catchAsyncError")
const Post = require("../models/postModel")
const User = require("../models/userModel")
const ErrorHandler = require("../utils/errorHandler")
const cloudinary = require("cloudinary")

exports.createPost = catchAsyncError(async(req,res,next)=>{
    
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder:"posts",
    })
    const newPostData = {
        caption: req.body.caption,
        image:{
            public_id: myCloud.public_id,
            url:myCloud.secure_url,
            // public_id: "publicId",
            // url:"urlH",
        },
        owner:req.user._id,
    }
    const post = await Post.create(newPostData);
    // console.log(post)
    const user = await User.findById(req.user._id);
    user.posts.unshift(post._id);
    // user.posts.push(post._id);
    await user.save()

    res.status(201).json({
        success:true,
        message: "post created"
    })
})

exports.likeUnlikePost = catchAsyncError(async(req, res,next)=>{
    const post = await Post.findById(req.params.id);
    if(!post) return next(new ErrorHandler("Post not found", 404))

    if(post.likes.includes(req.user._id)){
        const index = post.likes.indexOf(req.user._id);
        post.likes.splice(index,1)
        await post.save()
        return res.status(200).json({
            success:true,
            message:"post unliked"
        })
    }
    post.likes.push(req.user._id)
    await post.save();
    return res.status(200).json({
        success:true,
        message:"post liked"
    })
})

exports.deletePost = catchAsyncError(async(req,res,next)=>{
    const post = await Post.findById(req.params.id);
    if(!post) return next(new ErrorHandler("Post not found", 404))

    await post.deleteOne();
    console.log(req.user, "user", post)
    const user = await User.findById(req.user._id);
    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);

    await user.save();

    res.status(200).json({
        success:true,
        message: "post deleted"
    })
})

exports.getPostsOfFollowing = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user._id);
    // access hi vo kr paega jo login hoga, to user hmesha milega but phir bhi
    if(!user) return next(new ErrorHandler("User not found", 404))

    // iska ek aur method h...vo bhi try krna h(frontend ke bad)
    const posts = await Post.find({
        owner:{
            $in: user.following
        }
    }).populate("owner likes comments.user")

    res.status(200).json({
        success:true,
        posts: posts.reverse(),
    })
})

exports.updateCaption = catchAsyncError(async(req,res,next)=>{
    const post = await Post.findById(req.params.id);

    if(!post) return next(new ErrorHandler("post not found", 404))

    if(post.owner.toString() !== req.user._id.toString()) return next(new ErrorHandler("Unauthorized", 401))

    post.caption = req.body.caption;
    await post.save();

    res.status(200).json({
        success:true,
        message:"caption updated"
    })
})

exports.addComment = catchAsyncError(async(req,res,next)=>{
    const post = await Post.findById(req.params.id);

    if(!post) return next(new ErrorHandler("post not found", 404))

    // let index = -1;
    // post.comments.forEach((item, i)=>{
    //     if(item.user.toString() === req.user._id.toString()){
    //         index = i;
    //     }
    // })

    // if(index !== -1){
    //     // phle includes wale se kr rha tha... nhi hua
    //     // const index = post.comments.indexOf({user: req.user._id});
    //     post.comments[index].comment = req.body.comment;
    //     await post.save();

    //     return res.status(200).json({
    //         success:true,
    //         message:"comment updated"
    //     })
    // }

    post.comments.push({
        user: req.user._id,
        comment: req.body.comment
    })
    await post.save();

    res.status(200).json({
        success:true,
        message:"Comment added"
    })
})


exports.deleteComment = catchAsyncError(async(req,res,next)=>{
    const post = await Post.findById(req.params.id);

    if(!post) return next(new ErrorHandler("post not found", 404))
    
    
    // owner deleting comment
    if(post.owner.toString() === req.user._id.toString()){
        // ye vse to owner wale me krna tha lkin mene multi comments wala bnaya h isliye loop se bahr kr rha
        if(req.body.commentId === undefined){
            return res.status(400).json({
                success:true,
                message:"comment id is req"
            })
        }

        post.comments.forEach((item, i)=>{
            if(item._id.toString() === req.body.commentId.toString()){
                return post.comments.splice(index,1);
            }
        })
        await post.save();
        return res.status(200).json({
            success:true,
            message:"comment deleted"
        })

    }else{
// jiska comment h vhi delete kr rha
        post.comments.forEach((item, i)=>{
            if(item.user.toString() === req.user._id.toString() && item._id.toString() === req.body.commentId.toString()){
                return post.comments.splice(i,1);
            }
        })
        await post.save();
        return res.status(200).json({
            success:true,
            message:"comment deleted"
        })
    }

})