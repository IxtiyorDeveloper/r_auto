const User = require("../models/user")

exports.CreateUser = async(req, res)=>{
    try {
        const user = new User({...req.body})
        await user.save()
        res.status(201).json(
            {
                message: "success created",
                data: user
            }
        )
    } catch (err) {
        res.status(500).json(
            {
                message: "error"
            }
        )
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        res.status(404).json({success: false})
    }
    else if (!password) {
        res.status(404).json({success: false})
    }
    const user = await Admin.findOne({ email: email, password: password })
    .select(["email", "password"]);
    if (!user) {
        res.status(404).json({success: false})
    }else{
        res.status(200).json({success: true, data: user})
    }
};


exports.GetByIdUser = async(req, res)=>{
    try {
        const user = await User.findById({_id: req.params.id})
        res.status(200).json(
            {
                message: "success",
                data: user
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "editor not found"
            }
        )
    }
}


exports.GetUser = async(req, res)=>{
    try {
        const user = await User.find({roles: "user"}).sort({date: -1})
        res.status(200).json(
            {
                message: "success",
                data: user
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "editor not found"
            }
        )
    }
}


exports.EditUser = async(req, res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            ...req.body
        })
        res.status(200).json(
            {
                message: "success",
                data: user
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "editor not found"
            }
        )
    }
}




exports.DeleteUser = async(req, res)=>{
    try {
        const user = await User.findByIdAndDelete({_id: req.params.id}).sort({date: -1})
        res.status(200).json(
            {
                message: "success",
                data: []
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "editor not found"
            }
        )
    }
}