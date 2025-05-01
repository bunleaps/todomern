import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Todo from '../models/Todo.js';

dotenv.config();

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "todomern",
    })
    .then(() => console.log("MongoDB connected for seeding"))
    .catch((err) => console.error("MongoDB connection error:", err));

const seedDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Todo.deleteMany({});

        // Create admin user
        const adminPassword = await bcrypt.hash('admin123', 10);
        const admin = await User.create({
            username: 'admin',
            email: 'admin@example.com',
            password: adminPassword,
            role: 'admin',
            isVerified: true
        });

        // Create regular users
        const userPassword = await bcrypt.hash('user123', 10);
        const user1 = await User.create({
            username: 'user1',
            email: 'user1@example.com',
            password: userPassword,
            role: 'user',
            isVerified: true
        });

        const user2 = await User.create({
            username: 'user2',
            email: 'user2@example.com',
            password: userPassword,
            role: 'user',
            isVerified: true
        });

        // Create todos for users
        const todos = [
            {
                title: 'Complete project documentation',
                description: 'Write comprehensive documentation for the MERN project',
                completed: false,
                user: user1._id
            },
            {
                title: 'Implement user authentication',
                description: 'Add JWT-based authentication system',
                completed: true,
                user: user1._id
            },
            {
                title: 'Design database schema',
                description: 'Create MongoDB schemas for the application',
                completed: false,
                user: user2._id
            },
            {
                title: 'Set up API endpoints',
                description: 'Implement RESTful API endpoints',
                completed: true,
                user: user2._id
            }
        ];

        await Todo.insertMany(todos);

        console.log('Database seeded successfully!');
        console.log('\nAdmin Credentials:');
        console.log('Email: admin@example.com');
        console.log('Password: admin123');
        console.log('\nUser Credentials:');
        console.log('Email: user1@example.com');
        console.log('Password: user123');
        console.log('Email: user2@example.com');
        console.log('Password: user123');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();