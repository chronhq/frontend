# Chron Frontend

## Getting Started

### Requirments

* Node.js version 8 and later
* Mapbox access token

### Hot to run

```bash
# Clone the repo
git clone https://github.com/chronhq/frontend.git

cd frontend

# Install dependencies
npm i

# Create a settings.json file from settings.json.example

# Setup your mapbox access token in settings.json 
# New token can be accuired from https://www.mapbox.com/account/access-tokens

sed 's/MAPBOX_TOKEN/past_your_token_here/' settings.json.example > settings.json

# Run the app in development environment
# webpack-dev-server - 0.0.0.0:3000
# webpack-bundle-analyzer - 0.0.0.0:3001 
npm start
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

There are three endpoints for fetching data from backend

Development config:
```json
proxy: {
  "/api": "http://api:3333/",
  "/mvt": "http://api:3333/",
  "/shared": "http://api:3333/"
}
```
`/api` - REST requests for data

`/mvt` - GET requests for MVT (mapbox vector tiles) with political borders `/mvt/{geom_id}/{z}/{x}/{y}` 

`/shared` - shared code with chronist landing page (Feedback page)
