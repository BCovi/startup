const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('nightfall');
const userCollection = db.collection('user');
const statsCollection = db.collection('stats');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

async function recordGameResult(email, won, role) {
  const incFields = {
    [won ? 'wins' : 'losses']: 1,
  };
  if (role) {
    incFields[`roles.${role.toLowerCase()}`] = 1;
  }

  await statsCollection.updateOne(
    { email: email },
    { $inc: incFields },
    { upsert: true }
  );
  console.log('Successfully updated stats in MongoDB!');
}

async function getLeaderboard() {
  const stats = await statsCollection.find().toArray();

  return stats
    .map((p) => {
      const wins = p.wins || 0;
      const losses = p.losses || 0;
      const gamesPlayed = wins + losses;
      const winRate = gamesPlayed > 0 ? Number(((wins / gamesPlayed) * 100).toFixed(1)) : 0;
      return {
        ...p,
        wins,
        losses,
        gamesPlayed,
        winRate,
      };
    })
    .sort((a, b) => b.wins - a.wins || b.winRate - a.winRate)
    .slice(0, 10);
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  recordGameResult,
  getLeaderboard,
};