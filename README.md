# Spiknubben

A real-time score tracking app for team-based games. Multiple teams record their own scores, and one or two game masters monitor progress and standings via the host view.

## Setup

Install Node.js and npm, then clone the repo:

```shell
git clone git@github.com:adsamu/spiknubben.git
cd spiknubben
npm install
```

## Development

### Against the cloud database

```shell
npm run dev
```

### Against a local database (no internet required)

Requires the [Firebase CLI](https://firebase.google.com/docs/cli): `npm install -g firebase-tools`

Start the local Firestore emulator and dev server together:

```shell
npm run dev:emulator
```

In a separate terminal, seed the emulator with a demo room (`DEMO01`, 2 teams, 4 players each):

```shell
npm run emulator:seed
```

Then open [http://localhost:5173/host/DEMO01](http://localhost:5173/host/DEMO01).

The Emulator UI (inspect/edit data) is at [http://localhost:4000](http://localhost:4000).

### Testing on a phone (local network)

1. Make sure your phone is on the same Wi-Fi as your dev machine.
2. Start the emulator and dev server: `npm run dev:emulator`
3. Find your machine's local IP:
   ```shell
   ip route get 1 | awk '{print $7; exit}'
   ```
4. Open `http://<your-local-ip>:5173` on your phone.

The app automatically connects to the local Firestore emulator instead of the cloud database.

## Testing

Run all tests:

```shell
npm test
```

Watch mode (re-runs on file changes):

```shell
npm run test:watch
```

Coverage report:

```shell
npm run test:coverage
```
