var express = require('express');
const app = express();
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json()); //it's using express default middleware
app.use(express.static(`${__dirname}/public`));
//3rd Party Middleware (Morgan)

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//own create middleware
app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});
 
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// app.get('/', (req, res) => {
//   res
//   .status(200)
//   .json({message: 'Hello From The Server-Side!', app: 'Node Express & MongoDB'});
// });

// app.post('/', (req,res) => {
//     res.send('You Can Post To The Endpoint...')
// })


//Route or EndPoint
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
//or another system is below

//Route for Tours
app.use('/api/v1/tours', tourRouter);

//Route for Users
app.use('/api/v1/users', userRouter);

module.exports = app;