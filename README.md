## App

### Dependencis

- npm i react-bootstrap bootstrap
- npm i react-router-dom
- npm i react-scroll
- npm i node-sass
- npm install jquery popper.js
- npm add workbox-webpack-plugin@3.3.1 react-app-rewire-workbox@2.0.1 react-app-rewired@1.5.2

### Run

- npm run start
- npm run build && npm start

### Deploy

- ssh -i "dploy.pem" ubuntu@ec2-3-236-212-228.compute-1.amazonaws.com

- sudo apt-get update
- sudo apt install docker.io
- sudo apt install docker-compose
- sudo git clone https://gitlab.com/dploygit/josephine_frontend.git ./app

- sudo nano ~/.bash_profile
- alias gitpull="cd app; sudo git pull; sudo docker-compose down; sudo docker-composer build; sudo docker-compose up -d; echo 'Process Finished';"
- sudo bash ~/.bash_profile
