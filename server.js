const cl = console.log;
const app = require('./app');

app.listen(3000, () => {
    cl('Server running on port 3000');
});
