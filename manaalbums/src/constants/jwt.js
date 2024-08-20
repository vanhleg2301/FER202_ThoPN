import jwt from "jsonwebtoken";

// Define your secret key
export const secretKey = "e37yI1vC7fn4SExuDEOZqIz21U3rjNsv_9ETpMmy77G2mLjEoLWp3lMaD7LjouZ1";

// Function to sign the data (similar to encryption)
export const signToken = (data) => {
  return jwt.sign({ data }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Function to verify and decode the token (similar to decryption)
export const verifyToken = (token) => {
  try {
    // Ensure token is a non-empty string
    if (!token || typeof token !== 'string') {
      throw new Error("Invalid token");
    }

    const decoded = jwt.verify(token, secretKey);

    // Return the original data
    return decoded.data;
  } catch (error) {
    console.error("Verification error:", error);
    return null; // Return null or handle the error as needed
  }
};


const code = "some_sensitive_data";
const token = signToken(code);

console.log("Signed Token:", token);

const decodedCode = verifyToken(token);
console.log("Decoded Code:", decodedCode);
