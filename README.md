# Browse Sports Venues

A simple Expo React Native app to browse sports venues, filter by sport, sort results, and trigger booking alerts.

## Tech Stack

- React Native (Expo)
- Expo Router
- Functional components with React hooks (`useState`, `useMemo`)

## Features

- Venue list rendered using `FlatList`
- Venue details shown:
  - Name
  - Sport
  - Rating
  - Price
- Sport filter:
  - All
  - Football
  - Badminton
- Booking action:
  - `Book Now` button
  - Alert message: `Booking for {venue name}`
- Bonus sorting:
  - Price (Low to High)
  - Rating (High to Low)

## Sample Venue Data

```json
[
  {
    "id": 1,
    "name": "Elite Turf Arena",
    "sport": "Football",
    "rating": 4.5,
    "location": "Delhi",
    "price": 1200
  },
  {
    "id": 2,
    "name": "Smash Badminton Club",
    "sport": "Badminton",
    "rating": 4.2,
    "location": "Noida",
    "price": 500
  }
]
```

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start Expo:

```bash
npm start
```

3. Open on your preferred target:

- Android emulator/device
- iOS simulator/device
- Web

## Screenshots

### Mobile View 1

![Mobile View 1](./screenshots/Screenshot%202026-04-18%20125328.png)

### Mobile View 2

![Mobile View 2](./screenshots/Screenshot%202026-04-18%20125422.png)

### Web View

![Web View](./screenshots/Screenshot%202026-04-18%20125439.png)

## Submission Checklist

- Push code to GitHub
- Attach screenshots
- Email to `ashi.ofside@gmail.com`
- Keep `play@ofside.in` in CC
