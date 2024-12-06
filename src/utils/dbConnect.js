// import mongoose from 'mongoose';

// async function dbConnect () {
//   if (mongoose.connection.readyState === 1) return;
//   await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// export default dbConnect;



import mongoose from 'mongoose';

async function dbConnect() {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default dbConnect;
