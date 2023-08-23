const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nama: { type: String, required: true, maxLength: 100 },
    email: { type: String, required: true, maxLength: 100 },
    jenis_kelamin: { 
        type: String, 
        required: true, 
        enum: ["-", "Laki-laki", "Perempuan"], 
        default: "-"
    },
    password: { type: String, required: true, maxLength: 255}
})

module.exports = mongoose.model("Users", UserSchema);