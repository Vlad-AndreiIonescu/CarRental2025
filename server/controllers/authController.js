import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(createError('All fields are required', 400));
        }

        // Validare email simplă
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return next(createError('Invalid email format', 400));
        }

        // Verificare dacă userul există deja
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(createError('User already exists', 400));
        }

        // Hash parola
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(createError('Error registering user', 500));
    }
};


export const getMe = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(createError("Token missing", 401));
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "super_secret_jwt_key");

    // 🟢 Găsește userul complet în DB ca să iei și createdAt
    const user = await User.findById(decoded.id).select("name email role createdAt storeCredit");

    if (!user) return next(createError("Utilizatorul nu a fost găsit", 404));

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      storeCredit: user.storeCredit
    });
  } catch (err) {
    return next(createError("Token invalid sau expirat", 403));
  }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(createError('Email and password are required', 400));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(createError('User not found', 404));
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return next(createError('Invalid credentials', 401));
        }

        // Creăm un token JWT
        const token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role, // <-- adăugăm și rolul aici!
          },
          "super_secret_jwt_key", // trebuie să ai un JWT_SECRET în `.env`
          { expiresIn: "1d" }
        );

        
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Catch Block: loginUser", error.message);
        return next(createError(error.message || 'Error logging in', 500));
    }
};
