const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const authCookieName = 'token';

// Port configuration (Startup requires port 4000)
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body and cookie parsers
app.use(express.json());
app.use(cookieParser());

// Serve static frontend files (used in production / deployment)
app.use(express.static('public'));

// In-memory data structures (will move to MongoDB in the next deliverable)
let users = [];
let gameStats = []; // Holds your Nightfall leaderboard data

// Router for all /api endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// --- AUTH ENDPOINTS ---

// CreateAuth: Register a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth: Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth: Logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// --- MIDDLEWARE ---
const verifyAuth = async (req, res, next) => {
  console.log('--> Incoming Cookies received by server:', req.cookies);
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// --- NIGHTFALL DATA ENDPOINTS ---

// Get leaderboard stats
apiRouter.get('/stats', verifyAuth, (_req, res) => {
  res.send(gameStats);
});

// Submit a game stat / match result
apiRouter.post('/stat', verifyAuth, (req, res) => {
  gameStats = updateStats(req.body);
  res.send(gameStats);
});

// --- HELPER FUNCTIONS ---

function updateStats(newStat) {
  gameStats.push(newStat);
  if (gameStats.length > 10) gameStats.length = 10;
  return gameStats;
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: process.env.NODE_ENV === 'production', // Only secure in production (AWS/HTTPS
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return index.html for unknown frontend routes
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Nightfall backend listening on port ${port}`);
});