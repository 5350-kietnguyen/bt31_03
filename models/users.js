let mongoose = require('mongoose'); 
let bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true},
    email: { type: String, unique: true, required: true},
    fullName: { 
        type: String, 
        default: '', 
        validate: {
            validator: function(value) {
              return value === '' || /^[A-Za-zÀ-ỹ]+(?:\s[A-Za-zÀ-ỹ]+)*$/.test(value);
            },
            message: 'Full name chỉ được chứa chữ cái và khoảng trắng.'
        }
    },
    avatarUrl: { 
        type: String, 
        default: '',
        validate: {
          validator: function(value) {
              return value === '' || /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))(?:\?.*)?$/.test(value);
          },
          message: 'Avatar URL phải là một đường dẫn hợp lệ đến hình ảnh.'
        }
    },
    status: { type: Boolean, default: false },
    loginCount: { type: Number, default: 0, min: 0 },
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'role'
    }
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(this.password, salt);
        this.password = hash;
    }
    next();
});

module.exports = mongoose.model('user', userSchema);
