# Squamish Events Hub

Discover and share the heartbeat of Squamish through this dynamic event sharing platform. Whether you're a seeker of experiences or an event organizer, our user-friendly platform connects you with the vibrant pulse of the community. Explore, create, and celebrate extraordinary moments in Squamish!

Also my capstone project for BrainStation's full-stack web development bootcamp!

### Tech Stack

This site is a Vite React app using react-router and SASS on the front-end, Node and Express for a back-end server and Knex for querying a MySQL database. JWT/BcCrypt was implemented for user authentication/authorization and Multer was used to handle image uploads.

![](./src/assets/screenshots/Home%20page%20-%20event%20list.png)

### Features

- Users can view the home page and a list of events, filtering events by category, most popular or by the upcoming weekend.

- Users can sign up for an account.

- Logged in users can post, edit and delete their own events and can save other hosted events. User events and saved events appear in a user dashboard.

![](./src/assets/screenshots/event%20details.png)

### Run Locally

Clone the project client and server repos

```bash
$ git clone https://github.com/FreyaP/squamish-events.git
$ git clone https://github.com/FreyaP/squamish-events-api.git
```

## Server Set Up

Go to server project and install dependencies

```bash
$ cd squamish-events-api
$ npm install
```

Run migrations

```bash
$ npm run migrate
```

Run seeds

```bash
$ npm run seed
```

Set environment variables - rename .env.sample to .env and replace values

```bash
PORT=<PORT_NUMBER>
DB_HOST=<HOST_ADDRESS>
DB_LOCAL_NAME=<DB_NAME>
DB_LOCAL_USER=<username>
DB_LOCAL_PASSWORD=<password>
JWT_SECRET=<SECRET_KEY>

```

Start the server

```bash
$ npm run dev
```

## Client Set Up

Go to client project and install dependencies

```bash
$ cd squamish-events
$ npm install
```

Set environment variables - rename .env.sample to .env and replace values

```bash
VITE_BASE_URL=http://localhost:<PORT SET IN SERVER .ENV>
```

Start the app

```bash
$ npm run dev
```

## Next Steps

- FE: Light/dark theme
- Forget password functionality
- Social media intergration
- Set notifications for new events added in specific categories
- User comments on events
- Analytics on event engagement
