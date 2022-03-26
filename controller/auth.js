const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const generateJwtToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};


exports.signup = (req, res) => {

    User.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (user) return res.status(400).json({
                message: 'user already registered'

            });
            console.log("userback",req.body);
            const {
                fullName,
                email,
                passwordRepeat
            } = req.body;
            const hash_password = await bcrypt.hash(passwordRepeat, 10);
            const _user = new User({
                fullName,
                email,
                password: hash_password,
            });
            _user.save((error, user) => {
                if (error) {
                    return res.status(400).json({
                        message: 'something went wrong'
                    });
                }
                if (user) {
                    // const token = generateJwtToken(user._id, user.role);
                    const { _id, fullName, email } = user;
                    return res.status(201).json({
                        message: "user registered successfully",
                        // token,
                        user: { _id, fullName, email },
                    })
                }

            })

        });

}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                if (await user.authenticate(req.body.password)) {
                    const token = generateJwtToken(user._id, user.role);
                    const { _id, fullName, email } = user;
                    res.status(200).json({
                        token,
                        user:  { _id, fullName, email }
                    });
                } else {
                    return res.status(400).json({
                        message: 'Invalid Password or Something went wrong'
                    })

                }

            } else {
                return res.status(400).json({ message: 'User not registered! please register first' });
            }
        })
}

exports.getUserList = (req,res) => {
    User.find().exec((error, users) => {
        if(error){
            return res.status(400).json({ message: "Couldn't fetch users data"})
        }
        if(users){
            return res.status(201).json(users)
        }
    })
}

//delete controllers
exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.userId }).exec((err, user)=> {
        if(err){
            return res.status(400).json({
                messaage: "User deletion failed"
            })
        }if(user){
            res.status(200).json({
                message: "user successfully deleted"
            })
        }
    })
    // let user = req.user;
    // console.log(user);
    // user.deleteOne((err, deletedUser) => {
    //   if (err) {
    //     return res.status(400).json({
    //       error: "Failed to delete the User",
    //     });
    //   }
    //   res.json({
    //     message: "Successfully deleted user",
    //   });
    // });
  };



