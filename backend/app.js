const express = require('express');
const app = express();
const { mongoose } = require("./db/mongoose");
const bodyParser = require('body-parser');
var objectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const gravatar = require('gravatar');

app.use(express.static(__dirname + './public'));

//#region Load in the mongoose models
const { User,
    Admin,
    Employee,
    EmployeeLogin,
    Client,
    Truck,
    Trash,
    Flamme,
    Weight,
    Level,
    Gas,
    Report,
    ReportW } = require('./db/models');
//#endregion

//#region MIDDLEWARE

/* Load middleware */
app.use(bodyParser.json());

/* CORS Headers middleware */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Methods",
        "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");

    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header('Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token');

    next();
});

// check whether the request has a valid JWT access token
let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            next();
        }
    });
}

// Verify Refresh Token Middleware (which will be verifying the session)
let verifySession = (req, res, next) => {
    // grab the refresh token from the request header
    let refreshToken = req.header('x-refresh-token');

    // grab the _id from the request header
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            // user couldn't be found
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct'
            });
        }

        // if the code reaches here - the user was found
        // therefore the refresh token exists in the database - but we still have to check if it has expired or not

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if the session has expired
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    // refresh token has not expired
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            // the session is VALID - call next() to continue with processing this web request
            next();
        } else {
            // the session is not valid
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }

    }).catch((e) => {
        res.status(401).send(e);
    })
}
//#endregion

//#region SEND MAIL
app.post('/mail', (req, res) => {
    // Step 1
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'smarttrashtunisia@gmail.com', // TODO: your gmail account
            pass: 'smart1trash' // TODO: your gmail password
        }
    });

    // Step 2
    let mailOptions = {
        from: 'smarttrashtunisia@gmail.com', // TODO: email sender
        //to: 'b.irad1994@gmail.com', // TODO: email receiver
        to: req.body.emailC,
        subject: 'Trash Monitoring System',
        text: 'hello !! Thank you!!!',
        html: '<h1 style="color:blue;"> Smart Trash Tunisia  &#128151;</h1><p style="text-align-all: center"><h4>Automatic mail works perfectly !! </h4><br> Bonjour Votre reclamation est bien pris en consideration!<br>' +
            ' nous allons essayer de fixer le probleme le plus tot possible </p>' +
            '<h6>this is an automatic mail do not reply</h6>'+
            '<img style="width: 20%; height: 20%" src="http://res.cloudinary.com/dahsuexb9/image/upload/v1591438980/vvuewbddoydpvr4fuh8u.png"\n>'
    };

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Error occurs');
        }
        return console.log('Email sent!!!');
    });
});
//endregion

//region UPLOAD IMAGE
// Cloudinary Configuration
cloudinary.config({
    cloud_name: 'dahsuexb9',
    api_key: '254592322337993',
    api_secret: 's6Vh_6DYn1aid75RSwA2Z-LD42A'
})

// Multer Storafe Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
})

// Client Image Upload Route
app.route('/upload/:id').post(async (req, res) => {

    const upload = multer({ storage }).single('imageC')

    let imageC = req.body

    try {
        upload(req, res, async function (err) {
                if (err) {
                    return res.send(err)
                }

                const path = req.file.path
                console.log(path)
                cloudinary.uploader.upload(path, async function (err, image) {
                    if (err) return res.send(err)
                    console.log('file uploaded to Cloudinary')
                    // remove file from server
                    const fs = require('fs')
                    fs.unlinkSync(path)
                    // return image details
                    imageC = image.url
                    console.log(imageC)
                    const profileFields = {};
                    if (imageC) profileFields.imageC = imageC;
                    // See if user exists
                    let client = await Client.findOne({ _id: req.params.id });
                    console.log(client)
                    if (client) {
                        client = await Client.findOneAndUpdate({ _id: req.params.id },
                            { $set: profileFields, },
                            { new: true });
                        return res.json(client);
                    }
                })
            }
        )
    } catch (err) {
        console.error(err.message + "ddddddd");
        res.status(500).send('Server error')
    }
})

// Employee Image Upload Route
app.route('/uploadE/:id').post(async (req, res) => {

    const uploadE = multer({ storage }).single('imageE')

    let imageE = req.body

    try {
        uploadE(req, res, async function (err) {
                if (err) {
                    return res.send(err)
                }

                const path = req.file.path
                console.log(path)
                cloudinary.uploader.upload(path, async function (err, image) {
                    if (err) return res.send(err)
                    console.log('file uploaded to Cloudinary')
                    // remove file from server
                    const fs = require('fs')
                    fs.unlinkSync(path)
                    // return image details
                    imageE = image.url
                    console.log(imageE)
                    const profileFields = {};
                    if (imageE) profileFields.imageE = imageE;
                    // See if user exists
                    let employee = await Employee.findOne({ _id: req.params.id });
                    console.log(employee)
                    if (employee) {
                        employee = await Employee.findOneAndUpdate({ _id: req.params.id },
                            { $set: profileFields, },
                            { new: true });
                        return res.json(employee);
                    }
                })
            }
        )
    } catch (err) {
        console.error(err.message + "ddddddd");
        res.status(500).send('Server error')
    }
})
//endregion

//#region Admin and Users Access Tokens
/**
 * GET /admin/me/access-token
 * Purpose: generates and returns an access token
 */
app.get('/admin/me/access-token', verifySession, (req, res) => {
    // we know that the user/caller is authenticated and we have the user_id and user object available to us
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
app.get('/users/me/access-token', verifySession, (req, res) => {
    // we know that the user/caller is authenticated and we have the user_id and user object available to us
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
});
//#endregion

//#region Admin Signup and Login ROUTES
/**
 * POST /admins
 * Purpose: Sign up
 */
app.post('/admins', (req, res) => {
    // Admin sign up

    let body = req.body;
    let newAdmin = new Admin(body);

    newAdmin.save().then(() => {
        return newAdmin.createSession();
    }).then((refreshToken) => {
        // Session created successfully - refreshToken returned.
        // now we geneate an access auth token for the user

        return newAdmin.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now we return an object containing the auth tokens
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newAdmin);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

/**
 * POST /admins/loginA
 * Purpose: Login
 */
app.post('/admins/loginA', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    Admin.findByCredentials(email, password).then((admin) => {
        return admin.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return admin.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(admin);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
});
//#endregion

//#region Employee Signup and login ROUTES
/**
 * POST /employeesLogin
 * Purpose: Sign up
 */
app.post('/employeesLogin', (req, res) => {
    // User sign up

    let body = req.body;
    let newEmployeesLogin = new EmployeeLogin(body);

    newEmployeesLogin.save().then(() => {
        return newEmployeesLogin.createSession();
    }).then((refreshToken) => {
        // Session created successfully - refreshToken returned.
        // now we geneate an access auth token for the user

        return newEmployeesLogin.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now we return an object containing the auth tokens
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newEmployeesLogin);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

/**
 * POST /employeesLogin/login
 * Purpose: Login
 */
app.post('/employeesLogin/login', (req, res) => {
    let emailE = req.body.email;
    let passwordE = req.body.password;

    EmployeeLogin.findByCredentials(emailE, passwordE).then((employeeLogin) => {
        return employeeLogin.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return employeeLogin.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(employeeLogin);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
});
//#endregion

//#region Client Singup and Login Routes
/**
 * POST /users
 * Purpose: Sign up
 */
app.post('/users', (req, res) => {
    // Client sign up

    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        // Session created successfully - refreshToken returned.
        // now we geneate an access auth token for the user

        return newUser.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now we return an object containing the auth tokens
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

/**
 * POST /users/login
 * Purpose: Login
 */
app.post('/users/loginC', (req, res) => {
    // Client Login
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
});
//#endregion

//#region Truck ROUTES
/**
 * GET /Truck
 * Purpose: Get all Trucks
 */
app.get('/trucks', authenticate, (req, res) => {
    // We want to return an array of all the Trucks
    Truck.find({
    }).then((trucks) => {
        res.send(trucks);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * GET /Truck1
 * Purpose: Get all Trucks1
 */
app.get('/trucks1', authenticate, (req, res) => {
    // We want to return an array of all the Trucks in Area 1
    Truck.find({
        workingAreaT: "Area 1"
    }).then((trucks1) => {
        res.send(trucks1);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * GET /Truck2
 * Purpose: Get all Trucks2
 */
app.get('/trucks2', authenticate, (req, res) => {
    // We want to return an array of all Trucks in Area 2
    Truck.find({
        workingAreaT: "Area 2"
    }).then((trucks2) => {
        res.send(trucks2);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * GET /Truck3
 * Purpose: Get all Trucks3
 */
app.get('/trucks3', authenticate, (req, res) => {
    // We want to return an array of all Trucks in Area 3
    Truck.find({
        workingAreaT: "Area 3"
    }).then((trucks3) => {
        res.send(trucks3);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * GET /Truck4
 * Purpose: Get all Trucks4
 */
app.get('/trucks4', authenticate, (req, res) => {
    // We want to return an array of all the Trucks in Area 4
    Truck.find({
        workingAreaT: "Area 4"
    }).then((trucks4) => {
        res.send(trucks4);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * POST /Truck
 * Purpose: Create a truck
 */
app.post('/trucks', authenticate, (req, res) => {
    // We want to let the Admin Create a new Truck
    let addedDateT = new Date();
    let workingAreaT = req.body.workingAreaT;
    let driverT = req.body.driverT;
    let conveyorT = req.body.conveyorT;
    let levelIdT = req.body.levelIdT;
    let weightIdT = req.body.weightIdT;


    let newtruck = new Truck({
        addedDateT,
        workingAreaT,
        driverT,
        conveyorT,
        levelIdT,
        weightIdT

    });
    newtruck.save().then((TruckDoc) => {
        // the full trash document is returned (incl. id)
        res.send(TruckDoc);
    })
});

/**
 * DELETE /truck/:id
 * Purpose: Delete a truck
 */
app.delete('/trucks/:id', authenticate, (req, res) => {
    // We want to let the Admin Delete the specified Truck
    Truck.findOneAndRemove({
        _id: req.params.id,
    }).then((removedTruckDoc) => {
        res.send(removedTruckDoc);
    })
});

/**
 * GET /DriverAV
 * Purpose: Get drivers Available
 */
app.get('/driversAv', authenticate, (req, res) => {
    // We want to return an array of all the available drivers
    Employee.find({ availabiltyE: "Available !", postE: "Driver"}).then((trucks) => {
        res.send(trucks);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * GET /ConveyorAV
 * Purpose: Get Conveyors Available
 */
app.get('/conveyorsAv', authenticate, (req, res) => {
    // We want to return an array of all the available conveyors
    Employee.find({ availabiltyE: "Available !", postE: "Conveyor"}).then((trucks) => {
        res.send(trucks);
    }).catch((e) => {
        res.send(e);
    });
})
//#endregion

//#region Trash ROUTES
/**
 * GET /Trashs
 * Purpose: Get all trashes
 */
app.get('/trashs', authenticate, (req, res) => {
    // We want to return an array of all the Trash Cans
    Trash.find({
    }).then((trashes) => {
        res.send(trashes);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * POST /Trashs
 * Purpose: Create a Trash
 */
app.post('/trashs', authenticate, (req, res) => {
    // We want to let the Admin Create a new Trash Can
    let cityT = req.body.cityT;
    let municipalityT = req.body.municipalityT;
    let areaT = req.body.areaT;
    let addedDateT = new Date();
    let flammeId = req.body.flammeId;
    let gasId = req.body.gasId;
    let levelId = req.body.levelId;
    let weightId = req.body.weightId;

    let newTrash = new Trash({
        cityT,
        municipalityT,
        areaT,
        addedDateT,
        flammeId,
        gasId,
        levelId,
        weightId
    });

    newTrash.save().then((TrashDoc) => {
        // the full trash document is returned (incl. id)
        res.send(TrashDoc);
    })
});

/**
 * DELETE /trashs/:id
 * Purpose: Delete a trash
 */
app.delete('/trashs/:id', authenticate, (req, res) => {
    // We want to delete the specified Trash Can
    Trash.findOneAndRemove({
        _id: req.params.id,
    }).then((removedTrashDoc) => {
        res.send(removedTrashDoc);
    })
});
//#endregion

//#region User Report Routes
/**
* POST /report
* Purpose: Create a report
*/
app.post('/reports', authenticate, (req, res) => {
    // We want to create a new trash and return the new trash document back to the user (which includes the id)
    // The trash information (fields) will be passed in via the JSON request body
    let emailR = req.body.emailR;
    let subR = req.body.subR;
    let repR = req.body.repR;
    let addedDateR = new Date()
    let statusR = req.body.statusR;

    let newReport = new Report({
        emailR,
        subR,
        repR,
        addedDateR,
        statusR,
    });

    newReport.save().then((reportDoc) => {
        // the full trash document is returned (incl. id)
        res.send(reportDoc);
    })
});

/**
 * GET /reportC
 * Purpose: Get all reports
 *
 */
app.get('/rep', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Report.find({
    }).then((reports) => {
        res.send(reports);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * PATCH /report/:id
 * Purpose: Update a specified report
 */
app.patch('/reports/:id', authenticate, (req, res) => {
    // We want to update the specified trash (trash document with id in the URL) with the new values specified in the JSON body of the request
    Report.findByIdAndUpdate({_id:req.params.id}, {
        $set: {statusR : "Seen"},
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    })
});

/**
 * DELETE /report/:id
 * Purpose: Delete an employee
 */
app.delete('/reports/:id', authenticate, (req, res) => {
    // We want to delete the specified trash (document with id in the URL)
    Report.findOneAndRemove({
        _id: req.params.id,
    }).then((removedReportDoc) => {
        res.send(removedReportDoc);
    })
});
//endregion

//#region Worker Report Routes
/**
 * POST /reportW
 * Purpose: Create a reportW
 */
app.post('/reportsW', authenticate, (req, res) => {
    // We want to create a new trash and return the new trash document back to the user (which includes the id)
    // The trash information (fields) will be passed in via the JSON request body
    let emailRW = req.body.emailRW;
    /*    let cinR = req.body.cinR;*/
    let subRW = req.body.subRW;
    let repRW = req.body.repRW;
    let addedDateRW = new Date()
    let statusRW = req.body.statusRW;

    let newReportW = new ReportW({
        emailRW,
        subRW,
        repRW,
        addedDateRW,
        statusRW,
    });

    newReportW.save().then((reportWDoc) => {
        // the full trash document is returned (incl. id)
        res.send(reportWDoc);
    })
});

/**
 * GET /reportW
 * Purpose: Get all reports
 *
 */
app.get('/repW', authenticate, (req, res) => {
    // We want to return an array of all the employees
    ReportW.find({
    }).then((reportsW) => {
        res.send(reportsW);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * PATCH /reportW/:id
 * Purpose: Update a specified report
 */
app.patch('/reportsW/:id', authenticate, (req, res) => {
    // We want to update the specified trash (trash document with id in the URL) with the new values specified in the JSON body of the request
    ReportW.findByIdAndUpdate({_id:req.params.id}, {
        $set: {statusRW : "Seen"},
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    })
});

/**
 * DELETE /reportW/:id
 * Purpose: Delete an employee
 */
app.delete('/reportsW/:id', authenticate, (req, res) => {
    // We want to delete the specified trash (document with id in the URL)
    Report.findOneAndRemove({
        _id: req.params.id,
    }).then((removedReportWDoc) => {
        res.send(removedReportWDoc);
    })
});
//endregion

//#region Flamme ROUTES
/**
 * GET /Flamme
 * Purpose: Get all flammes
 */
app.get('/flammes', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Flamme.find({
    }).then((flammes) => {
        res.send(flammes);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * GET /Flamme status
 * Purpose: Get all flammes
 */
app.get('/status/:id', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Flamme.findById({
        _id: req.params.id
    }).then(() => {
        res.send(Flamme.statusF);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * GET /FlammeAV
 * Purpose: Get flammes Available
 */
app.get('/flammesAv', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Flamme.find({
        availabiltyF: "Available !"
    }).then((flammes) => {
        res.send(flammes);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * GET /FlammeU
 * Purpose: Get flammes in Use
 */
app.get('/flammesU', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Flamme.find({
        availabiltyF: "In use"
    }).then((flammes) => {
        res.send(flammes);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * POST /Flamme
 * Purpose: Create a Flamme
 */
app.post('/flammes', authenticate, (req, res) => {
    // We want to create a new Employee and return the new trash document back to the user (which includes the id)
    // The Employee information (fields) will be passed in via the JSON request body
    let depotF = req.body.depotF;
    let rayonF = req.body.rayonF;
    let addedDateF = new Date()
    let availabiltyF = req.body.availabiltyF;
    let statusF = req.body.statusF;

    let newFlamme = new Flamme({
        depotF,
        rayonF,
        addedDateF,
        availabiltyF,
        statusF,
        _userId: req.user_id
    });

    newFlamme.save().then((FlammeDoc) => {
        // the full trash document is returned (incl. id)
        res.send(FlammeDoc);
    })
});

/**
 * DELETE /flamme/:id
 * Purpose: Delete an flamme
 */
app.delete('/flammes/:id', authenticate, (req, res) => {
    // We want to delete the specified trash (document with id in the URL)
    Flamme.findOneAndRemove({
        _id: req.params.id,
    }).then((removedFlammeDoc) => {
        res.send(removedFlammeDoc);
    })
});

/**
 * PATCH /flammes/:id
 * Purpose: Update a specified flamme
 */
app.patch('/flammes/:id', authenticate, (req, res) => {
    // We want to update the specified trash (trash document with id in the URL) with the new values specified in the JSON body of the request
    Flamme.findByIdAndUpdate({_id:req.params.id}, {
        $set: {availabiltyF : "In use", trashIdF :"affected"},
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    })
});

/**
 * PATCH /flammesA/:id
 * Purpose: Update a specified flamme
 */
app.patch('/flammesA/:id', authenticate, (req, res) => {
    // We want to update the specified trash (trash document with id in the URL) with the new values specified in the JSON body of the request
    Flamme.findByIdAndUpdate({_id:req.params.id}, {
        $set: {availabiltyF : "Available !", trashIdF :"non affected"},
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    })
});
//#endregion

//#region Weight ROUTES
/**
 * GET /Weight
 * Purpose: Get all weights
 */
app.get('/weights', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Weight.find({

    }).then((weights) => {
        res.send(weights);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * GET /WeightAV
 * Purpose: Get Weights Available
 */
app.get('/weightsAv', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Weight.find({
        availabiltyW: "Available !"
    }).then((weights) => {
        res.send(weights);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * GET /WeightU
 * Purpose: Get Weights in use
 */
app.get('/weightsU', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Weight.find({
        availabiltyW: "In use"
    }).then((weights) => {
        res.send(weights);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * POST /Weight
 * Purpose: Create a Weight
 */
app.post('/weights', authenticate, (req, res) => {
    // We want to create a new Employee and return the new trash document back to the user (which includes the id)
    // The Employee information (fields) will be passed in via the JSON request body
    let depotW = req.body.depotW;
    let rayonW = req.body.rayonW;
    let addedDateW = new Date()
    let availabiltyW = req.body.availabiltyW;
    let statusW = req.body.statusW;

    let newWeight = new Weight({
        depotW,
        rayonW,
        addedDateW,
        availabiltyW,
        statusW,
        _userId: req.user_id
    });

    newWeight.save().then((WeightDoc) => {
        // the full trash document is returned (incl. id)
        res.send(WeightDoc);
    })
});

/**
 * DELETE /weight/:id
 * Purpose: Delete a weight
 */
app.delete('/weights/:id', authenticate, (req, res) => {
    // We want to delete the specified trash (document with id in the URL)
    Weight.findOneAndRemove({
        _id: req.params.id,
    }).then((removedWeightDoc) => {
        res.send(removedWeightDoc);
    })
});

/**
 * PATCH /weights/:id
 * Purpose: Update a specified weight
 */
app.patch('/weights/:id', authenticate, (req, res) => {
    // We want to update the specified trash (trash document with id in the URL) with the new values specified in the JSON body of the request
    Weight.findByIdAndUpdate({_id:req.params.id}, {
        $set: {availabiltyW : "In use", trashIdW :"affected"},
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    })
});

/**
 * PATCH /weightsA/:id
 * Purpose: Update a specified weightA
 */
app.patch('/weightsA/:id', authenticate, (req, res) => {
    // We want to update the specified trash (trash document with id in the URL) with the new values specified in the JSON body of the request
    Weight.findByIdAndUpdate({_id:req.params.id}, {
        $set: {availabiltyW : "Available !", trashIdW :"non affected"},
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    })
});
//#endregion

//#region Gas ROUTES
/**
 * GET /Gas
 * Purpose: Get all gases
 */
app.get('/gases', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Gas.find({

    }).then((gases) => {
        res.send(gases);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * GET /GasAV
 * Purpose: Get gases Available
 */
app.get('/gasesAv', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Gas.find({
        availabiltyG: "Available !"
    }).then((gases) => {
        res.send(gases);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * GET /GasU
 * Purpose: Get gases in Use
 */
app.get('/gasesU', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Gas.find({
        availabiltyG: "In use"
    }).then((gases) => {
        res.send(gases);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * POST /gas
 * Purpose: Create a gas
 */
app.post('/gases', authenticate, (req, res) => {
    // We want to create a new Employee and return the new trash document back to the user (which includes the id)
    // The Employee information (fields) will be passed in via the JSON request body
    let depotG = req.body.depotG;
    let rayonG = req.body.rayonG;
    let addedDateG = new Date()
    let availabiltyG = req.body.availabiltyG;
    let statusG = req.body.statusG;

    let newGas = new Gas({
        depotG,
        rayonG,
        addedDateG,
        availabiltyG,
        statusG,
        _userId: req.user_id
    });
    newGas.save().then((GasDoc) => {
        // the full trash document is returned (incl. id)
        res.send(GasDoc);
    })
});

/**
 * DELETE /gas/:id
 * Purpose: Delete a gas
 */
app.delete('/gases/:id', authenticate, (req, res) => {
    // We want to delete the specified trash (document with id in the URL)
    Gas.findOneAndRemove({
        _id: req.params.id,
    }).then((removedGasDoc) => {
        res.send(removedGasDoc);
    })
});

/**
 * PATCH /gases/:id
 * Purpose: Update a specified gas
 */
app.patch('/gases/:id', authenticate, (req, res) => {
    // We want to update the specified trash (trash document with id in the URL) with the new values specified in the JSON body of the request
    Gas.findByIdAndUpdate({_id:req.params.id}, {
        $set: {availabiltyG : "In use", trashIdG :"affected"},
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    })
});

/**
 * PATCH /gasesA/:id
 * Purpose: Update a specified gas A
 */
app.patch('/gasesA/:id', authenticate, (req, res) => {
    // We want to update the specified trash (trash document with id in the URL) with the new values specified in the JSON body of the request
    Gas.findByIdAndUpdate({_id:req.params.id}, {
        $set: {availabiltyG : "Available !", trashIdG :"non affected"},
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    })
});
//#endregion

//#region Level ROUTES
/**
 * GET /Level
 * Purpose: Get all levels
 */
app.get('/levels', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Level.find({

    }).then((levels) => {
        res.send(levels);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * GET /LevelAV
 * Purpose: Get levels Available
 */
app.get('/levelsAv', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Level.find({
        availabiltyL: "Available !"
    }).then((levels) => {
        res.send(levels);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * GET /LevelU
 * Purpose: Get levels Available
 */
app.get('/levelsU', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Level.find({
        availabiltyL: "In use"
    }).then((levels) => {
        res.send(levels);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * POST /level
 * Purpose: Create a level
 */
app.post('/levels', authenticate, (req, res) => {
    // We want to create a new Employee and return the new trash document back to the user (which includes the id)
    // The Employee information (fields) will be passed in via the JSON request body
    let depotL = req.body.depotL;
    let rayonL = req.body.rayonL;
    let addedDateL = new Date()
    let availabiltyL = req.body.availabiltyL;
    let statusL = req.body.statusL;

    let newLevel = new Level({
        depotL,
        rayonL,
        addedDateL,
        availabiltyL,
        statusL,
        _userId: req.user_id
    });
    newLevel.save().then((LevelDoc) => {
        // the full trash document is returned (incl. id)
        res.send(LevelDoc);
    })
});

/**
 * DELETE /level/:id
 * Purpose: Delete a level
 */
app.delete('/levels/:id', authenticate, (req, res) => {
    // We want to delete the specified trash (document with id in the URL)
    Level.findOneAndRemove({
        _id: req.params.id,
    }).then((removedLevelDoc) => {
        res.send(removedLevelDoc);
    })
});

/**
 * PATCH /levels/:id
 * Purpose: Update a specified level
 */
app.patch('/levels/:id', authenticate, (req, res) => {
    // We want to update the specified trash (trash document with id in the URL) with the new values specified in the JSON body of the request
    Level.findByIdAndUpdate({_id:req.params.id}, {
        $set: {availabiltyL : "In use", trashIdL :"affected"},
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    })
});

/**
 * PATCH /levelsA/:id
 * Purpose: Update a specified levelA
 */
app.patch('/levelsA/:id', authenticate, (req, res) => {
    // We want to update the specified trash (trash document with id in the URL) with the new values specified in the JSON body of the request
    Level.findByIdAndUpdate({_id:req.params.id}, {
        $set: {availabiltyL : "Available !", trashIdL :"non affected"},
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    })
});
//#endregion

//#region Employee ROUTES
/**
 * GET /Employee
 * Purpose: Get all employees
 */
app.get('/employees', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Employee.find({
    }).then((employees) => {
        res.send(employees);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * POST /Employee
 * Purpose: Create an Employee
 */
app.post('/employees', authenticate, (req, res) => {
    // We want to create a new Employee and return the new trash document back to the user (which includes the id)
    // The Employee information (fields) will be passed in via the JSON request body
    let firstNameE = req.body.firstNameE;
    let lastNameE = req.body.lastNameE;
    let userNameE = req.body.userNameE;
    let passwordE = req.body.passwordE;
    let cinE = req.body.cinE;
    let birthDateE = req.body.birthDateE;
    let emailE = req.body.emailE;
    let cityE = req.body.cityE;
    let addressE = req.body.addressE;
    let postE = req.body.postE;
    let municipalityE = req.body.municipalityE;
    let workingAreaE = req.body.workingAreaE;
    const imageE = gravatar.url(emailE, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })
    let newEmployee = new Employee({
        firstNameE,
        lastNameE,
        userNameE,
        passwordE,
        cinE,
        birthDateE,
        emailE,
        cityE,
        addressE,
        postE,
        municipalityE,
        workingAreaE,
        imageE,
        _userId: req.user_id
    });
    newEmployee.save().then((EmployeeDoc) => {
        // the full trash document is returned (incl. id)
        res.send(EmployeeDoc);
    })
});


/**
 * DELETE /employee/:id
 * Purpose: Delete an employee
 */
app.delete('/employees/:id', authenticate, (req, res) => {
    // We want to delete the specified trash (document with id in the URL)
    Employee.findOneAndRemove({
        _id: req.params.id,
    }).then((removedEmployeeDoc) => {
        res.send(removedEmployeeDoc);
    })
});

/**
 * PATCH /levelsA/:id
 * Purpose: Update a specified levelA
 */
app.patch('/emp/:id', authenticate, (req, res) => {
    Employee.findByIdAndUpdate({_id:req.params.id}, {
        $set: {
            firstNameE : req.body.firstNameE,
            lastNameE : req.body.lastNameE,
            cinE : req.body.cinE,
            /*            birthDateC : req.body.birthDateC,*/
            emailE : req.body.emailE,
            cityE : req.body.cityE,
            addressE : req.body.addressE,
            userNameE : req.body.userNameE,
        },
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    })
});

app.patch('/employees/:id', authenticate, (req, res) => {
    // We want to update the specified trash (trash document with id in the URL) with the new values specified in the JSON body of the request
    Employee.findByIdAndUpdate({_id:req.params.id}, {
        $set: {availabiltyE : "Affected !"},
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    })
});

app.patch('/employeesA/:id', authenticate, (req, res) => {
    // We want to update the specified trash (trash document with id in the URL) with the new values specified in the JSON body of the request
    Employee.findByIdAndUpdate({_id:req.params.id}, {
        $set: {availabiltyE : "Available !"},
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    })
});

/**
 * GET /current employee
 * Purpose: Get all Trucks
 */
app.get('/currentE', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Employee.find({
    }).then((currentE) => {
        res.send(currentE);
    }).catch((e) => {
        res.send(e);
    });
})

app.get('/currentW', authenticate, (req, res) => {
    // We want to return an array of all the employees
    EmployeeLogin.find({
        _id : req.user_id
    }).then((currentW) => {
        res.send(currentW);
    }).catch((e) => {
        res.send(e);
    });
})
//#endregion

//#region Client ROUTES
/**
 * GET /Client
 * Purpose: Get all clients
 */
app.get('/clients', authenticate, (req, res) => {
    // We want to return an array of all the clients
    Client.find({
    }).then((clients) => {
        res.send(clients);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * POST /Client
 * Purpose: Create an Client
 */
app.post('/clients', authenticate, (req, res) => {
    // We want to create a new Client and return the new trash document back to the user (which includes the id)
    // The Client information (fields) will be passed in via the JSON request body
    let firstNameC = req.body.firstNameC;
    let lastNameC = req.body.lastNameC;
    let cinC = req.body.cinC;
    let birthDateC = req.body.birthDateC;
    let emailC = req.body.emailC;
    let cityC = req.body.cityC;
    let addressC = req.body.addressC;
    let userNameC = req.body.userNameC;
    const imageC = gravatar.url(emailC, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })

    let newClient = new Client({
        firstNameC,
        lastNameC,
        cinC,
        birthDateC,
        emailC,
        cityC,
        addressC,
        userNameC,
        imageC,
        _userId: req.user_id
    });
    newClient.save().then((ClientDoc) => {
        // the full trash document is returned (incl. id)
        res.send(ClientDoc);
    })
});

/**
 * DELETE /client/:id
 * Purpose: Delete a client
 */
app.delete('/clients/:id', authenticate, (req, res) => {
    // We want to delete the specified trash (document with id in the URL)
    Client.findOneAndRemove({
        _id: req.params.id,
    }).then((removedClientDoc) => {
        res.send(removedClientDoc);
    })
});

/**
 * GET /current user
 * Purpose: Get all Trucks
 */
app.get('/currentC', authenticate, (req, res) => {
    // We want to return an array of all the employees
    Client.find({
    }).then((currentC) => {
        res.send(currentC);
    }).catch((e) => {
        res.send(e);
    });
})

app.get('/currentU', authenticate, (req, res) => {
    // We want to return an array of all the employees
    User.find({
        _id : req.user_id
    }).then((currentU) => {
        res.send(currentU);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * PATCH /clients/:id
 * Purpose: Update a specified client
 */
app.patch('/clients/:id', authenticate, (req, res) => {
    // We want to update the specified trash (trash document with id in the URL) with the new values specified in the JSON body of the request
    Client.findByIdAndUpdate({_id:req.params.id}, {
        $set: {
            firstNameC : req.body.firstNameC,
            lastNameC : req.body.lastNameC,
            cinC : req.body.cinC,
/*            birthDateC : req.body.birthDateC,*/
            emailC : req.body.emailC,
            cityC : req.body.cityC,
            addressC : req.body.addressC,
            userNameC : req.body.userNameC
        },
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    })
});
//#endregion

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
