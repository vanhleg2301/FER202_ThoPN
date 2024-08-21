const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 9999;

app.use(bodyParser.json());
app.use(cors());

const REFRESH_SECRET_KEY =
  "e37yI1vC7fn4SExuDEOZqIz21U3rjNsv_9ETpMmy77G2mLjEoLWp3lMaD7LjouZ1"; // Use an environment variable for security
const SECRET_KEY = "dhMjsQ5dte0EEpnMIKn8EmvsamGysMjM";
if (!SECRET_KEY) {
  throw new Error("SECRET_KEY must be defined");
}

const DATABASE_PATH = path.join(__dirname, "database.json");

// JWT utility functions
const generateToken = (userId, expiresIn) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn });
};

const generateRefreshToken = (userId, expiresIn = "7d") => {
  return jwt.sign({ userId }, REFRESH_SECRET_KEY, { expiresIn });
};

const verifyToken = (token, secret, callback) => {
  jwt.verify(token, secret, callback);
};

// Database utility functions
const readDatabase = () => {
  const data = fs.readFileSync(DATABASE_PATH);
  return JSON.parse(data);
};

const writeDatabase = (data) => {
  fs.writeFileSync(DATABASE_PATH, JSON.stringify(data, null, 2));
};

// Header processing utility function
const extractTokenFromHeader = (req) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    return token;
  }
  return null;
};

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  const db = readDatabase();
  const user = db.users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    const token = generateToken(user.id, "2m");
    const refreshToken = generateRefreshToken(user.id);

    // Optionally, store the refresh token in your database (recommended)
    return res.json({ token, refreshToken });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).send("Refresh Token Required");
  }

  verifyToken(refreshToken, REFRESH_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid Refresh Token");
    }

    const token = generateToken(decoded.userId);
    return res.json({ token });
  });
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  const db = readDatabase();

  // Check if the email already exists
  const existingUser = db.users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  // Create a new user
  const newUser = {
    id: db.users.length + 1,
    email,
    password,
    profile: {
      email,
    },
  };

  // Add the new user to the database and write it back
  db.users.push(newUser);
  writeDatabase(db);

  // Return token
  return res.json({ regis: "Registered successfully!" });
});

app.get("/profile/:userId", (req, res) => {
  const token = extractTokenFromHeader(req);
  if (token) {
    verifyToken(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).send("Invalid token");

      const db = readDatabase();
      const user = db.users.find(
        (user) => user.id === parseInt(decoded.userId)
      );
      if (user) {
        return res.json(user.profile);
      } else {
        return res.status(404).send("User not found");
      }
    });
  } else {
    return res.status(401).send("No token provided");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
