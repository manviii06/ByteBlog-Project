const express = require('express');
const session = require('express-session');
const passport = require('passport');

const cors = require('cors');
const dotenv = require('dotenv');
require('./config/passport');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: "https://byteblog-wfa2.onrender.com",  // your React app
    credentials: true,                // allow cookies/session
  })
);
app.use(express.json());

connectDB();

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    
    res.redirect(`http://localhost:3000?user=${JSON.stringify(req.user)}`);
  }
);

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(process.cwd(), "/uploads")));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes')); 
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/admin/contact',  require('./routes/contactRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});