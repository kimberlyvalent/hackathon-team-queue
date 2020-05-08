# Deploy
> Setup on a remote environment

This uses:

- Heroku - for backend Node Express app
- Netlify - for frontend Vue.js app



### Install Heroku CLI

To deploy the backend to Heroku, you'll need the Heroku CLI.

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


## Setup Netlify

1. Setup a Netlify account.
2. Add the repo that is on Github.
3. The site will deploy using the [netlify.toml](/netlify.toml) config.
4. Configure the project to have a friendly URL.
5. Visit the URL.
