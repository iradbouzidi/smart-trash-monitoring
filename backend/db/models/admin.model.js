const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// JWT Secret
const jwtSecret = "51778657246321226641fsdklafjasdkljfsklfjd7148924065";

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
});

//region Instance methods
/* Hide password and sessions*/
AdminSchema.methods.toJSON = function () {
    const admin = this;
    const adminObject = admin.toObject();

    // return the document except the password and sessions (these shouldn't be made available)
    return _.omit(adminObject, ['password', 'sessions']);
}

/* Generate Access Auth Token */
AdminSchema.methods.generateAccessAuthToken = function () {
    const admin = this;
    return new Promise((resolve, reject) => {
        // Create the JSON Web Token and return that
        jwt.sign({ _id: admin._id.toHexString() }, jwtSecret, { expiresIn: "15m" }, (err, token) => {
            if (!err) {
                resolve(token);
            } else {
                // there is an error
                reject();
            }
        })
    })
}

/* Generate Refresh Auth Token */
AdminSchema.methods.generateRefreshAuthToken = function () {
    // This method simply generates a 64byte hex string - it doesn't save it to the database. saveSessionToDatabase() does that.
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (!err) {
                // no error
                let token = buf.toString('hex');
                return resolve(token);
            }
        })
    })
}

/* Create a admin session */
AdminSchema.methods.createSession = function () {
    let admin = this;

    return admin.generateRefreshAuthToken().then((refreshToken) => {
        return saveSessionToDatabase(admin, refreshToken);
    }).then((refreshToken) => {
        // saved to database successfully
        // now return the refresh token
        return refreshToken;
    }).catch((e) => {
        return Promise.reject('Failed to save session to database.\n' + e);
    })
}
//endregion

//region MODEL METHODS (static methods)
AdminSchema.statics.getJWTSecret = () => {
    return jwtSecret;
}

/* Find admin by his Token*/
AdminSchema.statics.findByIdAndToken = function (_id, token) {
    // finds admin by id and token
    // used in auth middleware (verifySession)

    const Admin = this;

    return Admin.findOne({
        _id,
        'sessions.token': token
    });
}

/* Find admin by his Email and Password */
AdminSchema.statics.findByCredentials = function (email, password) {
    let Admin = this;
    return Admin.findOne({ email }).then((admin) => {
        if (!admin) return Promise.reject();

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, admin.password, (err, res) => {
                if (res) {
                    resolve(admin);
                }
                else {
                    reject();
                }
            })
        })
    })
}

AdminSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
    let secondsSinceEpoch = Date.now() / 1000;
    if (expiresAt > secondsSinceEpoch) {
        // hasn't expired
        return false;
    } else {
        // has expired
        return true;
    }
}

//endregion

//region MIDDLEWARE
// Before a admin document is saved, this code runs
AdminSchema.pre('save', function (next) {
    let admin = this;
    let costFactor = 10;

    if (admin.isModified('password')) {
        // if the password field has been edited/changed then run this code.

        // Generate salt and hash password
        bcrypt.genSalt(costFactor, (err, salt) => {
            bcrypt.hash(admin.password, salt, (err, hash) => {
                admin.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});
//endregion

//region HELPER METHODS
/* Save Session To Database */
let saveSessionToDatabase = (admin, refreshToken) => {
    // Save session to database
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();

        admin.sessions.push({ 'token': refreshToken, expiresAt });

        admin.save().then(() => {
            // saved session successfully
            return resolve(refreshToken);
        }).catch((e) => {
            reject(e);
        });
    })
}

/* Refresh Token Expiry Time */
let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpire = "10";
    let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
    return ((Date.now() / 1000) + secondsUntilExpire);
}
//endregion

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = { Admin }
