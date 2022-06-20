const Responder = require("../models/responder.model.js");
const { HTTP_CODES } = require("../config/globals.config")
const bcrypt = require('bcrypt');

// Create and Save a new Tutorial
exports.create = async (req, res) => {
    console.log('req.body: ', req.body)
    const { name, email, password, phone_number } = req.body;

    console.log('here')
    // validations
    if (!name || name.trim() === "")
        return res.status(HTTP_CODES.BAD_REQUEST).json({
            success: false,
            message: 'Please enter a valid name'
        });

    if (!email || email.trim() === "")
        return res.status(HTTP_CODES.BAD_REQUEST).json({
            success: false,
            message: 'Please enter a valid email'
        });

    if (!password || password.trim() === "")
        return res.status(HTTP_CODES.BAD_REQUEST).json({
            success: false,
            message: 'Please enter a password'
        });


    if (!phone_number || phone_number.trim() === "")
        return res.status(HTTP_CODES.BAD_REQUEST).json({
            success: false,
            message: 'Please enter a valid phone number'
        });


    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create an instance User
    const newResponder = new Responder({
        company_name: name.toLowerCase(),
        email: email.toLowerCase(),
        password: encryptedPassword,
        phone_number,
    });

    console.log('newResponder', newResponder)

  // Save the user in the database
    Responder.create(newResponder, (err, data) => {
        if (err)
            return res.status(HTTP_CODES.SERVER_ERROR).json({
                success: false,
                message: 'An error occured while creating your account. Please try again later'
            })
 
        else return res.status(HTTP_CODES.OK).json({
            success: true,
            responder: data
        })
    });
};

// Retrieve all Panics from the database (with condition).
exports.findByEmail = (req, res) => {
    const { email, password } = req.body

    //validations
    if (!email || email.trim() === "")
        return res.status(HTTP_CODES.BAD_REQUEST).json({
            success: false,
            message: 'Please enter a valid email'
        });

    if (!password || password.trim() === "")
        return res.status(HTTP_CODES.BAD_REQUEST).json({
            success: false,
            message: 'Please enter your password'
        })  

    Responder.findByEmail(email.toLowerCase(), async (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(HTTP_CODES.BAD_REQUEST).json({
                    success: false,
                    message: `Responder with email ${email} doesn't exist.`
              });
            } else return res.status(HTTP_CODES.SERVER_ERROR).json({
                success: false,
                message: 'An error occured. Please try again later'
            })
            
        } else {
            console.log('data', data)
            const passwordCorrect = await bcrypt.compare(
                password,
                data.Password
            );

            // alert user if the password is incorrect
            if (!passwordCorrect) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    success: false,
                    message: 'Invalid Credentials',
                });
            } else {
                return res.status(HTTP_CODES.OK).json({
                    success: true,
                    responder: data
                })
            }
        }
    })
    
    
};

