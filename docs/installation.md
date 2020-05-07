# Installation
> Local setup


## Install system dependencies

Install [NodeJS](https://nodejs.org/) globally. This will include NPM, for managing packages.

```sh
brew install nodejs
```

## Install Heroku CLI
To deploy to Heroku, you'll need the Heroku CLI

```sh
brew tap heroku/brew && brew install heroku
```

Connect the Git repository to the app.

```sh
heroku login
cd path/to/project
heroku git:remote -a hackathon2u-queue
```

You can now deploy by pushing master to the `heroku` remote

```sh
git push heroku master
```

Or go to [Download](https://nodejs.org/en/download/) page.


## Clone repo


```sh
git clone git@github.com:getsmarter/hackathon-team-queue.git
cd hackathon-team-queue
```


## Install project dependencies

```
npm install
```
