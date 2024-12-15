import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// Assuming you have a User model/service to interact with your database
import { User } from '../../../../database/models/user.model';
import { UserAuth } from '../../../../database/models/user_auth.model';

export const login = async (data) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'secret';
  try {
    const { email, password } = data;

    // Find user by email
    const user = await User.findOne({ email, 
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