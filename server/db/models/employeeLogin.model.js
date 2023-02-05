const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// JWT Secret
const jwtSecret = "51778657246321226641fsdklafjasdkljfsklfjd7148924065";

const EmployeeLoginSchema = new mongoose.Schema({
    emailE: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    passwordE: {
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
EmployeeLoginSchema.methods.toJSON = function () {
    const employeeLogin = this;
    const employeeLoginObject = employeeLogin.toObject();

    // return the document except the password and sessions (these shouldn't be made available)
    return _.omit(employeeLoginObject, ['passwordE', 'sessions']);
}

/* Generate Access Auth Token */
EmployeeLoginSchema.methods.generateAccessAuthToken = function () {
    const employeeLogin = this;
    return new Promise((resolve, reject) => {
        // Create the JSON Web Token and return that
        jwt.sign({ _id: employeeLogin._id.toHexString() }, jwtSecret, { expiresIn: "15m" }, (err, token) => {
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
EmployeeLoginSchema.methods.generateRefreshAuthToken = function () {
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

/* Create a user session */
EmployeeLoginSchema.methods.createSession = function () {
    let employeeLogin = this;

    return employeeLogin.generateRefreshAuthToken().then((refreshToken) => {
        return saveSessionToDatabase(employeeLogin, refreshToken);
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
EmployeeLoginSchema.statics.getJWTSecret = () => {
    return jwtSecret;
}

/* Find user by his Token*/
EmployeeLoginSchema.statics.findByIdAndToken = function (_id, token) {
    // finds user by id and token
    // used in auth middleware (verifySession)

    const User = this;

    return User.findOne({
        _id,
        'sessions.token': token
    });
}

/* Find user by his Email and Password */
EmployeeLoginSchema.statics.findByCredentials = function (emailE, passwordE) {
    let EmployeeLogin = this;
    return EmployeeLogin.findOne({ emailE }).then((EmployeeLogin) => {
        if (!EmployeeLogin) return Promise.reject();

        return new Promise((resolve, reject) => {
            bcrypt.compare(passwordE, EmployeeLogin.passwordE, (err, res) => {
                if (res) {
                    resolve(EmployeeLogin);
                }
                else {
                    reject();
                }
            })
        })
    })
}

EmployeeLoginSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
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
// Before a user document is saved, this code runs
EmployeeLoginSchema.pre('save', function (next) {
    let employeeLogin = this;
    let costFactor = 10;

    if (employeeLogin.isModified('passwordE')) {
        // if the password field has been edited/changed then run this code.

        // Generate salt and hash password
        bcrypt.genSalt(costFactor, (err, salt) => {
            bcrypt.hash(employeeLogin.passwordE, salt, (err, hash) => {
                employeeLogin.passwordE = hash;
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
let saveSessionToDatabase = (employeeLogin, refreshToken) => {
    // Save session to database
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();

        employeeLogin.sessions.push({ 'token': refreshToken, expiresAt });

        employeeLogin.save().then(() => {
            // saved session successfully
            return resolve(refreshToken);
        }).catch((e) => {
            reject(e);
        });
    })
}

/* Refresh Token Expiry Time */
let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpire = "100";
    let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
    return ((Date.now() / 1000) + secondsUntilExpire);
}
//endregion

const EmployeeLogin = mongoose.model('EmployeeLogin', EmployeeLoginSchema);

module.exports = { EmployeeLogin }
