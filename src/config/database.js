const URI = "mongodb+srv://ag_db_user:M1Snv6lKYw8mHhoa@mycluster.5rkkycf.mongodb.net/devTinder"
const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(URI);
}

module.exports = connectDB;