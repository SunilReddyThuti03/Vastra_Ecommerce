const mongoose = require("mongoose");

const validateMongoDBId = (req, res, next)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send("Invalid Mongodb Id format");
    }
    next();
}

module.exports = {validateMongoDBId};