const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//Middkeware checkID
exports.checkID = (req, res, next, val) => {

    console.log(`Tour id is: ${val}`);
    
    const id = req.params.id * 1;
    if(id > tours.length) {
        return res.status(404).json({
            status: 'Failed',
            message: 'Invalid ID'
        });
    }
    next();
}

//Middleware checkBody
exports.checkBody = (req, res, next) => {

    if(!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'Fail',
            message: 'Missing name or price'
        });
    }
    next();
};

//Tour GET Method
exports.getAllTours = (req,res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success!',
        requestAt: req.requestTime,
        result: tours.length,
        data: {
            tours
        }
    });
};

//Tour Find by ID
exports.getTour = (req,res) => {
    console.log(req.params);
    const id = req.params.id * 1;

    const tour = tours.find(el => el.id === id);
    //if(id > tours.length)
    res.status(200).json({
        status: 'success!',
        requestAt: req.requestTime,
        data: {
            tour
        }
    });
};

//Tour POST or create Method
exports.createTour = (req, res) => {
    // console.log(req.body);

    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            createdAt: req.requestTime,
            data: {
                tours: newTour
            }
        })
    });
};

//Tour UPDATE Method
exports.updateTour = (req, res) => {

    res.status(200).json({
        status: 'success',
        updatedAt: req.requestTime,
        data: {
            tour: '<Updated Tour Here>'
        }
    })
};

//Tour Delete Method
exports.deleteTour = (req, res) => {

    res.status(204).json({
        status: 'success',
        data: null
    })
};