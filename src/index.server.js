const express = require("express");
const env = require("dotenv");
const app = express();
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const ProductRoutes = require('./routes/product');


// environment variable or you can say constants
env.config();

// mongobd connection
// mongodb+srv://<username>:<password>@cluster0.giumd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(` mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.giumd.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() =>{
    console.log('Database connected');
});

// app.use(bodyParser());
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', ProductRoutes);


app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
