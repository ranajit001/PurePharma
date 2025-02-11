// import swaggerAutogen from 'swagger-autogen';
const swaggerAutogen  = require('swagger-autogen')

const doc = {
    info: {
        title: 'My API',
        description: 'API Documentation for src1',
    },
    host: 'https://online-pharmacy-jwkq.onrender.com',  // Your host URL, adjust as needed
    schemes: ['http'],
};

const outputFile = './swagger.json';  // The generated swagger.json path
const endpointsFiles = ['./routes/cartRoutes.js',
                        './routes/medicineRoutes.js',
                        './routes/productRoutes.js',
                        './routes/userRoutes.js'

];  // Path to your route files

// Initialize swaggerAutogen and generate the documentation
const swaggerGenerator = swaggerAutogen();
swaggerGenerator(outputFile, endpointsFiles);
