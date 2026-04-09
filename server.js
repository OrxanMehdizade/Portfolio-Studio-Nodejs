require('dotenv').config();

const app = require('./src/app');
const dbLoader = require('./src/loaders/dbLoader'); 
const seedAdminUser = require('./src/utils/auth/seedAdmin');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try{
    await dbLoader();
    
    await seedAdminUser();

    app.listen(PORT, ()=>{
      console.log(`Server running on port ${PORT}`);
    });
  }catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();