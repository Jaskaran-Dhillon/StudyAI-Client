# Initialization
Steps:\
1.) Clone the repository\
2.) Install the node packages\
3.) Create a .env in the root directory, add the `REACT_APP_BASE_URL` variable and set it to `http://localhost:PORT` where `PORT` is any port other than the 
    one currently being used by the react app (3000 by default).\

# Deployment
Steps:\
1.) Connect repository to Heroku.\
2.) Set env var `REACT_APP_BASE_URL`=The url of the backend hosted on Heroku.