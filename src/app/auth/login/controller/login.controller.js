import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// Assuming you have a User model/service to interact with your database
import { User } from '../../../../database/models/user.model';
import { UserAuth } from '../../../../database/models/user_auth.model';

export const login = async (data) => {
  console.log("------LOGIN CONTROLLER: LOGIN------")
  const JWT_SECRET = process.env.JWT_SECRET || 'secret';
  try {
    const { email, password } = data;
    console.log("email: ", email)
    console.log("password: ", password)

    // Normalize email (convert to lowercase and trim)
    const normalizedEmail = email.toLowerCase().trim();

    // Find user by email with explicit where clause
    const user = await User.findOne({ 
      where: { 
        email: normalizedEmail
      },
      include: [
        {
          model: UserAuth,
          as: 'userAuth',
          attributes: ['passwordHash'],
        },
      ],
    });

    // If user doesn't exist
    if (!user || !user.userAuth) {
      throw new Error('User not found');
    }

    // Add debug logs
    

     if (!password || !user.userAuth.passwordHash) {
      throw new Error('Missing password or hash');
    }

   

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.userAuth.passwordHash);
    
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        // firstName: user.firstName,
        // lastName: user.lastName,
        // address: user.address,
        // city: user.city,
        // country: user.country
      },
      JWT_SECRET, // Make sure to set this in your environment variables
      {
        expiresIn: '24h', // Token expiration time
      }
    );

    // Return user info and token
    console.log("return: ",{
        user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        city: user.city,
        country: user.country
      },
      token,
    });
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        city: user.city,
        country: user.country
      },
      token,
    };
  } catch (error) {
    throw error;
  }
};

export const register = async (data) => {
  console.log("------REGISTER CONTROLLER: REGISTER------")
  const JWT_SECRET = process.env.JWT_SECRET || 'secret';
  try {
    // Normalize email
    const normalizedEmail = data.email.toLowerCase().trim();

    // Check if user already exists with explicit where clause
    const existingUser = await User.findOne({ 
      where: { 
        email: normalizedEmail 
      }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user with normalized email
    const user = await User.create({
      email: normalizedEmail,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      city: data.city,
      country: data.country
    });

    // Rest of the code remains the same
  } catch (error) {
    throw error;
  }
};