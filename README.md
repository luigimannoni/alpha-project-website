# Alpha Core website 🌍

## Quick start

The project has been bootstrapped with a combination of react-static and react-create-app
To run a dev server locally please do a `yarn install` and then run it as usual with `yarn start` or `npm start`, but stick to using `yarn` for consistency.

## Build and serve through express

Simply run `yarn serve`.

If developing the account creation page requires also:
- a Mysql service with a 1.12 mangos realm database up and running, if you need one you can import the [official sql](https://raw.githubusercontent.com/cmangos/mangos-classic/master/sql/base/realmd.sql) on your self-hosted mysql and modify the `.env` file accordingly.
- a Google Recaptcha key with `localhost` whitelisted, grab one [from here](https://www.google.com/recaptcha/admin/create)

Please refer to the comments in `.env.template` for more guidance.
