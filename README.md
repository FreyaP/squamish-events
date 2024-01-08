# Project Title

Squmaish Event Hub

## Overview

An event listing website platform where users can discover and share various events happening Squamish. Users can browse through different categories of events and view event details. Event organizers can create and manage their events, reaching a broader audience.

### Problem

Squamish locals and visitors often miss out on exciting events happening around them, uh FOMO! Event organizers struggle to promote their events effectively. This app aims to bridge the gap by providing a centralized platform for Squamish event discovery and promotion.

### User Profile

Locals or visitors looking for upcoming events in Squamish, whether it be music, outdoor, educational etc. - (View only)

Event organizers and business owners wanting to post and advertise their events - (May require sign up and login)

Users who want to save events to a calendar or "bucket list" page (nice to have - May require sign in and login)

### Features

<!-- List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented. -->

As an organizer (logged in - nice to have):

- post an event to the site including event name, host, images, decription, price, type of event and ticket info
- events expire after the event date or can be deleted anytime
- events can be edited by the event organizer
- host dashboard - shows list of events host has added

As a user:

- view upcoming events in squamish
- filter or organize events by category, date, popularity (if using like stats)
- engage with event posting e.g. liking, sharing or commenting (nice to have)

As a logged in user (nice to have):

- save events to a wish list

General Site Features:

- weather bar showing the current and forecast weather (external api)
  - Will appear below the nav bar (not in the mock up images)
- responsive design

## Implementation

### Tech Stack

Frontend:

- React
- SCSS
- TypeScript (potentially)
- Client libraries:
  - react
  - react-router
  - axios - HTTP requests

Backend:

- Node
- knex
- express
- bcrypt for password hashing
- MySql

### APIs

Open weather map api for the current and forecast weather data

### Sitemap

<!-- List the pages of your app with brief descriptions. You can show this visually, or write it out. -->

Home Page

- displays events to browse

Add Event

- add event form (logged in host)

Edit Event

- edit eveit form (logged in host)

Event details

- details of single event with link to tickets if applicable

Register

- sign up form

Login

- login form

Dashboard (logged in host)

- profile details
- list of events by the logged in host

### Mockups

<!-- Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches. -->

![](./src/assets/HomePage.png)

![](./src/assets/Addedit%20page.png)

![](./src/assets/Event-details.png)

![](./src/assets/register.png)

![](./src/assets/Login.png)

![](./src/assets/host%20dashboard.png)

![](./src/assets/delete.png)

### Features

- Users can view the home page and a list of events, filtering events by category, most popular or by the upcoming weekend.

- Users can sign up for an account.

- Logged in users can post, edit and delete their own events and can save other hosted events. User events and saved events appear in a user dashboard.

![](./src/assets/screenshots/event%20details.png)

## Run Locally

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

Set up Database in MySQL

```bash
CREATE DATABASE <DB_NAME>;
```

Run migrations

```bash
$ npx knex migrate:latest
```

Run seeds

```bash
$ npx knex run:seed
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

To play with features as a logged in user either signup or use the following user credentials:

- Email: john@example.com
- Password: password

## Next Steps

- FE: Light/dark theme
- See past atteneded events/saved events in user profile when logged in
- Forget password functionality
- Social media intergration
- Set notifications for new events added in specific categories
- user comments on events
- analytics on event engagement
