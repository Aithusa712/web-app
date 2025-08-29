# <Placeholder> App

- Choose either a Local Mongodb Database, or Cloud-hosted MongoDB service in the .env file. Remove/Comment the one you dont want inside the ./env file and also in the compose.yaml file (remove/comment the mongo container)


# Prerequisites
- Docker
- Node.js (if docker is taking too long to install node modules).

# File Structure:
```
├── backend
│   ├── dockerfile
│   ├── env
│   ├── nginx
│   ├── pyproject.toml
│   ├── requirements.txt
│   └── src
├── compose.yaml
├── frontend
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   └── src
└── LICENSE
```

## backend components
- Nginx -  Reverse Proxy, proxies requests made from the web app's http client and to the backend api port "backend:3000" docker container.
- FastAPI - a Python backend API to handles client requests and manages data into the database or retrieve data from it.
- Mongodb - NoSQL document-oriented database.

## Frontend components
- React - Javascript Library for creating the UI of the app. React components handles states.
- Axios - Http client to make requests into our backend api (FastAPI).
- react-icons - just an Icon pack.


## Docker
- Docker runs 4 containers (1 out of the 4 containers is optional).
  - frontend: contains node.js
  - backend: our backend API server, a python script in "/backend/src/server.py".
  - nginx: reverse proxy, to forward http client request to the backend container. 
  - mongo: local database. (optional if not using the cloud hosted service).
 
| Container Name   | Port    | Container Port    |
|--------------- | --------------- | --------------- 
| frontend   | 3000   | 3000   |
| backend   | 8001   | 3001   | 
| nginx   | 8000   | 80   |
| mongo   | 27017   | 27017   |

- For more info, check the compose.yaml file.

# How to run?
- Install [Docker Compose.](https://docs.docker.com/compose/install/)
- git clone this repo `git clone https://github.com/Aithusa712/web-app.git`
- cd to project folder `cd web-app`
- run `docker-compose up --build`
- open localhost:8000 in your browser.

# TODO:
- idk, dunno the project scope.


# Known issues:
- npm ci/npm install inside the docker contianer is too slow, can take hours
  to install the node_modules. To avoid this, inside the docker compose yaml 
  config file, replace the frontend docker container command in line 25 from 
  `sh -c "npm ci && npm start"` to `npm start`. Before running the docker 
  containers, install the node modules beforehand by cd-ing to the `/frontend` 
  folder and running `npm install`. This requires your OS to have node 
  installed. (outdated. After migrating to vite, the command to start the 
  server is `npm run dev`).

- After migrating to vite (from CRA), app does not render anything (even `<h1>` 
  tags outside of the App component) if no database is connected. So if you
  open the frontend port (3000) it will not render anything.
