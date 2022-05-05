const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./router/userRouter');
const planRouter = require('./router/planRoute');
const reviewRouter = require('./router/reviewRouter');
const bookingRouter = require('./router/paymentRouter');


const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}

connectDB();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRouter);
app.use('/plan', planRouter);
app.use('/reviews', reviewRouter);
app.use('/booking', bookingRouter);

// app.get('/setCookies', (req, res) => {
//     // res.setHeader('Set-Cookie', 'isLoggedIn=true');
//     // maxAge sets the expiration date of the cookie
//     // secure sets the security of the cookie
//     // httpOnly means that the cookie will not accessible on the frontend
//     res.cookie('isLoggedIn', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true });
//     res.cookie('isMember', false, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true });
//     res.send('Cookies has been set');
// });

// app.get('/getCookies', (req, res) => {
//     let cookies = req.cookies; // to access the cookies
//     console.log(cookies);
//     res.send('cookies received');
// });

app.listen(8000, () => {
    console.log('server is running on port 8000');
})