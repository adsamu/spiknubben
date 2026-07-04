// Populate the Firestore emulator with a demo room.
// Run: FIRESTORE_EMULATOR_HOST=localhost:8080 node scripts/seed-emulator.js
// Or via: npm run emulator:seed  (which sets the env var automatically)

import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

const app = initializeApp({ projectId: "spiknubben-dev" });
const db = getFirestore(app);

const ROOM_CODE = "DEMO01";
const NUM_CHALLENGES = 5;

const teams = [
  { teamId: "TEAM01", teamName: "Saltiga Sälarna" },
  { teamId: "TEAM02", teamName: "Stormiga Hajarna" },
];

const players = [
  { name: "Anna", gender: "female" },
  { name: "Erik", gender: "male" },
  { name: "Sofia", gender: "female" },
  { name: "Lars", gender: "male" },
];

async function seed() {
  await db.collection("rooms").doc(ROOM_CODE).set({
    challenges: NUM_CHALLENGES,
    createdAt: new Date(),
  });

  for (const team of teams) {
    for (const { name, gender } of players) {
      const playerId = `${team.teamId}-${name.toLowerCase()}`;
      await db
        .collection("rooms")
        .doc(ROOM_CODE)
        .collection("players")
        .doc(playerId)
        .set({
          id: playerId,
          name,
          gender,
          teamId: team.teamId,
          teamName: team.teamName,
          scores: {
            1: Array(NUM_CHALLENGES).fill(0),
            2: Array(NUM_CHALLENGES).fill(0),
          },
          joinedAt: new Date(),
        });
    }
  }

  console.log(
    `Seeded room ${ROOM_CODE} — ${teams.length} teams, ${teams.length * players.length} players.`
  );
  console.log(`Open http://localhost:5173/host/${ROOM_CODE} to see it.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
