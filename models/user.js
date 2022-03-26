const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required : true,
            trim: true,
            min: 3,
            max: 25
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,

        },
        

    }, {timestamps: true});

// userSchema.virtual('password')
// .set(function(password){
// this.hash_password = bcrypt.hashSync(password, 10);
// });



// userSchema.virtual('fullName')
// .get(function(){
//     return `${this.firstName} ${this.lastName}`;
// });

userSchema.methods = {
    authenticate: async function(password){
        return await bcrypt.compare(password, this.password);
    }
};

module.exports = mongoose.model('User',userSchema);