const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());
const sequelize = new Sequelize('sqlite::memory:');
const SECRET_KEY = 'your_secret_key';

const Car = sequelize.define('Car', {
    make: { type: DataTypes.STRING, allowNull: false },
    model: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    price_per_day: { type: DataTypes.FLOAT, allowNull: false },
    is_available: { type: DataTypes.BOOLEAN, defaultValue: true },
});

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
});

const Booking = sequelize.define('Booking', {
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
});

Car.hasMany(Booking);
Booking.belongsTo(Car);
User.hasMany(Booking);
Booking.belongsTo(User);

app.post('/signup', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, phone, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully!', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        req.userId = decoded.id;
        next();
    });
};

app.get('/cars', async (req, res) => {
    const cars = await Car.findAll();
    res.json(cars);
});

app.get('/cars/:id', async (req, res) => {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
});

app.post('/cars', authenticate, async (req, res) => {
    try {
        const car = await Car.create(req.body);
        res.status(201).json({ message: 'Car added successfully!', car });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/bookings', authenticate, async (req, res) => {
    try {
        const { userId, carId, start_date, end_date } = req.body;
        const car = await Car.findByPk(carId);

        if (!car || !car.is_available) {
            return res.status(400).json({ message: 'Car is not available for booking.' });
        }

        const booking = await Booking.create({ userId, carId, start_date, end_date });
        car.is_available = false;
        await car.save();

        res.status(201).json({ message: 'Car booked successfully!', booking });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/bookings/:id', authenticate, async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        const car = await Car.findByPk(booking.carId);
        if (car) {
            car.is_available = true;
            await car.save();
        }

        await booking.destroy();
        res.json({ message: 'Booking cancelled successfully!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

(async () => {
    await sequelize.sync({ force: true });
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
})();


// Signup
async function signup(name, email, phone, password) {
    try {
        const response = await axios.post('http://localhost:3000/signup', {
            name,
            email,
            phone,
            password,
        });
        console.log('Signup successful:', response.data);
    } catch (error) {
        console.error('Signup error:', error.response.data);
    }
}

// Login
async function login(email, password) {
    try {
        const response = await axios.post('http://localhost:3000/login', {
            email,
            password,
        });
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.token); // Store token for authenticated requests
    } catch (error) {
        console.error('Login error:', error.response.data);
    }
}


// Fetch all cars
async function fetchCars() {
    try {
        const response = await axios.get('http://localhost:3000/cars');
        console.log('Cars:', response.data);
    } catch (error) {
        console.error('Error fetching cars:', error.response.data);
    }
}

// Fetch a specific car
async function fetchCarById(carId) {
    try {
        const response = await axios.get(`http://localhost:3000/cars/${carId}`);
        console.log('Car details:', response.data);
    } catch (error) {
        console.error('Error fetching car:', error.response.data);
    }
}


// Book a car
async function bookCar(userId, carId, start_date, end_date) {
    try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const response = await axios.post(
            'http://localhost:3000/bookings',
            { userId, carId, start_date, end_date },
            { headers: { Authorization: token } } // Pass token in headers
        );
        console.log('Booking successful:', response.data);
    } catch (error) {
        console.error('Booking error:', error.response.data);
    }
}


useEffect(() => {
    fetchCars();
}, []);


const cors = require('cors');
app.use(cors());


