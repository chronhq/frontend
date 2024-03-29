# Chron Frontend [![Build Status](https://travis-ci.org/chronhq/frontend.svg?branch=master)](https://travis-ci.org/chronhq/frontend)

## Getting Started

### Requirments

* Node.js version 8 and later
* Mapbox access token
* Firebase access token

### Hot to setup

```bash
# Clone the repo
git clone https://github.com/chronhq/frontend.git

cd frontend

# Install dependencies
npm ci

# Set configs
cp configs/disabled-config.json.example static/disabled-config.json
cp configs/analytics-config.json.example static/analytics-config.json

# Setup your mapbox access token in settings.json 
# New token can be accuired from https://www.mapbox.com/account/access-tokens

sed 's/MAPBOX_TOKEN/past_your_token_here/' configs/mapbox-config.json.example > static/mapbox-config.json.json

# Create project in Firebase https://console.firebase.google.com/
# Configure firebase and auth methods https://github.com/firebase/firebaseui-web#available-providers
cp configs/firebase-config.json.example static/firebase-config.json
```

### Optional: Configure environment for docker image

```bash

echo "\
FLAGS_CONFIG_BASE64=$(base64 -w0 static/disabled-config.json)
ANALYTICS_CONFIG_BASE64=$(base64 -w0 static/analytics-config.json)
MAPBOX_CONFIG_BASE64=$(base64 -w0 static/mapbox-config.json)
FIREBASE_CONFIG_BASE64=$(base64 -w0 static/firebase-config.json)" > frontend.env

```

### Hot to run

```bash
# Run the app in development environment
# webpack-dev-server - 0.0.0.0:3000
# webpack-bundle-analyzer - 0.0.0.0:3001 

# For development using production database
# All queries to /api would be redirected to https://chronmaps.com/api
npm start

# For development using local instance of backend server
# All queries to /api would be redirected to http://api/api
# !!! Add api domain to hosts file
# echo '127.0.0.1 api'  >> /etc/hosts
npm run dev
```

The app can be accessed via http://localhost:3000/

Webpack-bundle-analyzer can be accessed via http://localhost:3001/

### How to build a release version

```bash
npm run release
# Compiled files can be served from ./dist directory
```

### Docker images

App container can be build with docker but it was never designed to be used as standalone docker image.

However docker-compose is applicable for development purposes

------
### Endpoints

There are two endpoints for fetching data from backend

Development config:
```json
proxy: {
  "/api": "http://api/",
  "/mvt": "http://api:5000/",
}
```
`/api` - REST requests for data

`/mvt` - GET requests for MVT (mapbox vector tiles) with political borders `/mvt/{z}/{x}/{y}` 
