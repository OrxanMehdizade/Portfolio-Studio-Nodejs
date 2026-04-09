const mongoose = require('mongoose');

const dbLoader  = async () => {
    try{
        // await mongoose.connect(process.env.DB_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
       const conn = await mongoose.connect(process.env.DB_URI);
       console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = dbLoader;
