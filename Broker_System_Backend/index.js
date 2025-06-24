const express = require('express')
const userRoutes=require("./routes/user.route.js")
const path = require("path");
const connectDB=require("./config/db.config.js")
const authRoutes=require("./routes/auth.route.js")
const roleRoutes=require("./routes/role.route.js")
const leaseAgreementRoutes=require("./routes/leaseAgreement.route.js")
const propertyRoutes=require("./routes/property.route.js")
const categoryRoutes=require("./routes/category.route.js")
const addressRoutes=require("./routes/address.route.js")
const ownerRoutes=require("./routes/owner.route.js")
const reviewRoutes = require("./routes/review.route.js");
const filterRoutes = require("./routes/filter.route.js");
const emailRoutes = require('./routes/email.route.js');
const cors=require('cors');
const app = express()
connectDB();
const cookieParser = require('cookie-parser')
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3002'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
}));
app.use('/api/user',userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/leaseAgreement', leaseAgreementRoutes);
app.use('/api/property', propertyRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/owner',ownerRoutes);
app.use("/api/review", reviewRoutes);
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use("/api/filter",filterRoutes);
app.use('/api/email', emailRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
