const { HTTP_CODES } = require("../config/globals.config")
const locationHelpers = require("../helpers/location.helpers");

const Panic = require("../models/panic.model.js");
// Create and Save a new Tutorial
exports.create = async (req, res) => {
    console.log('req.body', req.body)
    const { longitude, latitude, user, phone } = req.body

    if (!latitude || latitude === "")
        return res.status(HTTP_CODES.BAD_REQUEST).json({
            success: false,
            message: 'Could not get your current location'
        });


    if (!longitude || longitude === "")
        return res.status(HTTP_CODES.BAD_REQUEST).json({
            success: false,
            message: 'Could not get your current location'
        });

    console.log('latitude', latitude)
    console.log('longitude', longitude)

    location = await locationHelpers.fetchLocationName(latitude, longitude)

    // Create an instance Panic
    const newPanic = new Panic({
        longitude,
        latitude,
        location: location.results[0].formatted_address,
        user,
        phone,
    });

    // Save the panic in the database
    Panic.create(newPanic, (err, data) => {
        if (err)
            return res.status(HTTP_CODES.SERVER_ERROR).json({
                success: false,
                message: 'An error occured while creating the panic. Please try again later'
            })

        else
            return res.status(HTTP_CODES.OK).json({
                success: true,
                data
            })
    });
};
// Retrieve all Panics from the database (with condition).
exports.findAll = (req, res) => {
    Panic.getAll((err, data) => {
        if (err)
            return res.status(HTTP_CODES.SERVER_ERROR).json({
                success: false,
                message: 'An error occured while fetching all panics. Please try again later'
            })

        else
            return res.status(HTTP_CODES.OK).json({
                success: true,
                panics: data
            })
    });
};
