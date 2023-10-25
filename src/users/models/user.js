const mongoose = require("mongoose")

const Notifier = mongoose.model("User",{
    "email":String,
    "token":String,
    "movies_watched":Array
})

module.exports = Notifier