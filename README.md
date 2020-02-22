# Quizdini Teach

# Todo List

- Heroku
  - Investigate SSL steps
- Documentation
- Server
  - _Refine wording_ and style for following email templates:
    - QUIZDINI_REGISTER
    - QUIZDINI_RECOVER_USERNAME
    - QUIZDINI_RESET_PASSWORD
    - Update logo to be 300px-wide friend logo with text
    - Style so that content is in simple white rounded box, i.e., experiement removing header and footer styling, etc.
- Client
  - One-off styling for Buy Credits because there is no way to provide our webfont to Stripe :(
  - Work on field outline on Buy Credits; try to get custom and Stripe rendered fields to match
  - Images
    - Once all images are known, move to S3/Cloudfront
  - Landing Page
    - Add selling point creatives (once developed)  
  - main to section
    - Remove nested mains in favor of named section elements with meaningful ids  
  - Loading
    - Change pathes to render loader independently, i.e., do not nest in main, etc.
  - Error
    - Mock up Error
      - Return and apply to all appropriate routes
      - Create component that interrogates errors sent to it
      - Leave a placeholder image 
  - About
    - Finish Attribution
  - Match
    - Change layout to resemble Stats
    - Create `Match Header` which includes `title` and `options` info
  - Dashboard
    - _Refine functional component, e.g., `MatchIntro`_
    - _Model Games_ - Show options 4, 6, 9
      - For each: title/subject, instructions, .csv, etc.
  - Hooks
    - useScroll
       - Create hook that scrolls window to top of page whenever pathname changes
    - useWindow
      - Investigate removing hook in lieu of CSS media queries
        - `HeaderNav`
        - `MatchForm`
        - `MatchTable`
  - Style Punchlist
    - Move feedback errors outside (and above) segments
    - Investigate and implement the best graph transitions
    - Different colors for alerts
        - info could be `#e6f2f5` background and `#003440` color
        - success could be `#e9f7f1` background and `#004025` color
    - Change positive/primary button background color to `#ec5252` or a Quizdini purple
    - Find better emphasis color for places like Terms and About

Kay

- Custom match icon
- Design for match-card-header
- Error image

# Diagrams

- [Route Trees](https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Quizdini.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1SUQK7qZlTLzat0yysiNBKhyWKBPDzlnA%26export%3Ddownload)

# Server Endpoints

| Endpoint                      | Method | Protected | Details                                                                                                                                                                                                                                 | Throws                                   |
| ----------------------------- | :----: | :-------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `/api/account`                |  POST  |    no     | Creates new User; creates secret validation "token"; sends registration email; returns newly-created User object                                                                                                                        | `DuplicateUsername` and `DuplicateEmail` |
| `/api/account`                |  GET   |    yes    | Returns User object (currently logged in)                                                                                                                                                                                               | none                                     |
| `/api/account`                |  PUT   |    yes    | Updates User; limited subset of fields; returns updated User object                                                                                                                                                                     | none                                     |
| `/api/account/lost`           |  POST  |    no     | Looks up "local" account by provided email; for username recovery, just sends email; for password reset, token generated and reset email sent. Special `quizdini-timezone` header is used to translate `expiryDate` into local timezone | none                                     |
| `/api/account/password`       |  PUT   |    yes    | Hashes and updates user password; limited to verified, so-called "local" accounts                                                                                                                                                       | `InvalidCredentials`                     |  |
| `/api/account/password-reset` |  PUT   |    no     | Updates user password and marks token as claimed                                                                                                                                                                                        | `InvalidToken`                           |
| `/api/account/verify`         |  PUT   |    no     | "Verifies" user account (sets `verified` to `true`) and marks token as claimed                                                                                                                                                          | none                                     |
| `/api/countries`              |  GET   |    no     | Returns array of country objects; dependency of registration and profile (update) forms                                                                                                                                                 | none                                     |
| `/api/states`                 |  GET   |    no     | Returns array of state objects; dependency of registration and profile (update) forms                                                                                                                                                   | none                                     |
| `/api/token/:secret`          |  GET   |    no     | Returns Token object, if it exists, is unexpired, and unclaimed; dependency of user verification process                                                                                                                                | `InvalidToken`                           |
| `/api/payment`                |  POST  |    yes    | Creates a charge using the Stripe Payment API; increments `credits` in user account; returns newly-created Payment object                                                                                                               | `StripeChargeError`                      |
| `/api/payment/:id`            |  GET   |    yes    | Returns Payment object for given `paymentId`; returns empty object `{}` if payment not found                                                                                                                                            | none                                     |
| `/api/payments`               |  GET   |    yes    | Returns array of Payment objects; returns empty array `[]` if no payments found                                                                                                                                                         | none                                     |
| `/api/match`                  |  POST  |    yes    | Creates new Match game record, including generating the "short id" used by end users; decrements credit total; returns newly-created Match object                                                                                       | `InsufficientCredits`                    |
| `/api/match/:id`              |  GET   |    yes    | Returns Match object for given `matchId`; returns empty object `{}` if match not found                                                                                                                                                  | none                                     |
| `/api/match/:id`              |  PUT   |    yes    | Updates Match for given `matchId`; limited to subset of fields, e.g., `title`, `instructions`, `matches`, `options`, `published`, etc.; returns updated object or empty object `{}` if match not found                                  | none                                     |
| `/api/match/:id`              | DELETE |    yes    | Updates Match for given `matchId`; limited to subset of fields, e.g., `title`, `instructions`, `matches`, `options`, `published`, etc.; returns deleted object or empty object `{}` if match not found                                  | none                                     |
| `/api/matches`                |  GET   |    yes    | Returns array of Match objects; returns empty array `[]` if no "matches" are found                                                                                                                                                      | none                                     |
| `/auth/local`                 |  POST  |    no     | Uses custom Passport "local" strategy to authenticate user; serializes user info into cookie; returns User object                                                                                                                       | `LoginFailed`                            |
| `/auth/google`                |  GET   |    no     | Uses custom Passport "google" strategy to authenticate user (in concert with Google); if it does not exist, new User is createcd; serializes user info into cookie                                                                      | none                                     |
| `/auth/google/callback`       |  GET   |    no     | Handshake endpoint associated with the custom Passport "google" strategy (see `/auth/google`); "ends" the google authentication process, redirecting to `/dashboard` route                                                              | none                                     |
| `/api/logout`                 |  GET   |    no     | Uses the `logout()` function, exposed by Passport, to clear user from session cookie                                                                                                                                                    | none                                     |
| `/api/current_user`           |  GET   |    no     | Returns `user` property from the session cookie                                                                                                                                                                                         | none                                     |

# UI Messages

Messages need to be standardized, etc.

| Event                                              | Header                                                | Content                                                                                                                   | Color |
| -------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | :---: |
| **Successful registration**                        | <blockquote>Welcome to Quizdini!</blockquote>         | <blockquote>Check your email, `%email%`, for a link to validate your account.</blockquote>                                | green |
| **Unsuccessful registration (duplicate username)** | <blockquote>Have we met before?</blockquote>          | <blockquote>`%username%` already exists.</blockquote>                                                                     |  red  |
| **Unsuccessful registration (duplicate email)**    | <blockquote>Have we met before?</blockquote>          | <blockquote>`%email%` is already associated with another account.</blockquote>                                            |  red  |
| **Successful account verification**                | <blockquote>Success!</blockquote>                     | <blockquote>Your account has been verified.</blockquote>                                                                  | green |
| **Unsuccessful account verification**              | <blockquote>Check yourself...</blockquote>            | <blockquote>Your token is invalid, claimed, or expired.</blockquote>                                                      |  red  |
| **Successful password change**                     | <blockquote>Success!</blockquote>                     | <blockquote>Your password has been updated.</blockquote>                                                                  | green |
| **Successful password reset**                      | <blockquote>Success!</blockquote>                     | <blockquote>Your password has been reset.</blockquote>                                                                    | green |
| **Unsuccessful password change**                   | <blockquote>Check yourself...</blockquote>            | <blockquote>Your current password is incorrect.</blockquote>                                                              |  red  |
| **Unsuccessful login attempt**                     | <blockquote>Oops we can't log you in!</blockquote>    | <blockquote>Please check your credentials or verify your account.</blockquote>                                            |  red  |
| **Stripe Errors**                                  | <blockquote>Something's not quite right.</blockquote> | <em>Provided by Stripe</em>                                                                                               |  red  |
| **Successful purchase**                            | <blockquote>Thank you for your purchase!</blockquote> | <blockquote>`%credits%` have been added to your account.</blockquote>                                                     | green |
| **Successful recovery request (username)**         | <blockquote>Check your email!</blockquoute>           | <blockquote>If there is an account associated with `%email%`, then a username recovery email has been sent.</blockquoute> | blue  |
| **Successful recovery request (reset)**            | <blockquote>Check your email!</blockquoute>           | <blockquote>If there is an account associated with `%email%`, then a password reset email has been sent.</blockquoute>    | blue  |
| **Insufficent credits**                            | <blockquote>Not so fast!</blockquote>                 | <blockquote>There are not enough credits in your account.</blockquote>                                                    |  red  |
| **Generic site-wide error**   | <blockquote>Something's not quite right.</blockquote>                 | <em>Provided by underlying codebase.</em>                                                    |  red  |

# User Migration

- Only users with verified account will be brought forward (369)
- Users will be given 100 credits

Here is the query to extract the users:

```
SELECT
    title,
    `quizdini-prod`.CAP_FIRST(first_name) AS 'firstName',
    `quizdini-prod`.CAP_FIRST(last_name) AS 'lastName',
    `quizdini-prod`.CAP_FIRST(city) AS 'city',
    state_code AS 'stateCode',
    country_code AS 'countryCode',
    LOWER(email) AS 'email',
    username,
    password,
    role AS 'role',
    100 AS 'credits',
    'true' AS 'verified',
    CONCAT('new Date(',
            UNIX_TIMESTAMP(created_ts) * 1000,
            ')') AS 'createDate',
    CONCAT('new Date(',
            UNIX_TIMESTAMP(last_login_ts) * 1000,
            ')') AS 'lastLoginDate',
    user_id AS 'legacyId'
FROM
    `quizdini-prod`.`user`
WHERE
    is_confirmed = 'Y'
ORDER BY last_login_ts DESC
```

The following custom function is a dependency (to clean up the data):

```
DELIMITER $$
CREATE DEFINER=`jlcdump`@`quizdini-prod` FUNCTION `CAP_FIRST`(input VARCHAR(255)) RETURNS varchar(255) CHARSET utf8
    DETERMINISTIC
BEGIN
	DECLARE len INT;
	DECLARE i INT;

	SET len   = CHAR_LENGTH(input);
	SET input = LOWER(input);
	SET i = 0;

	WHILE (i < len) DO
		IF (MID(input,i,1) = ' ' OR i = 0) THEN
			IF (i < len) THEN
				SET input = CONCAT(
					LEFT(input,i),
					UPPER(MID(input,i + 1,1)),
					RIGHT(input,len - i - 1)
				);
			END IF;
		END IF;
		SET i = i + 1;
	END WHILE;

    RETURN input;
    END$$
DELIMITER ;
```

Because we are going to MongoDB, this data--even when exported using the Table Data Export's json option.

After exporting apply the following search and replaces:

- Regex `"([0-9]+\.{0,1}[0-9]*)"` with `\1`
- Regex `"(\bnew Date\(\b[0-9]*\))"` with `\1`
- `"lastLoginDate":""` with `"lastLoginDate":null`
- `"verified":"true"` with `"verified":true`

When running the migration, here is the basic shell:

```
db = db.getSiblingDB('quizdini');
try {
  db.users.deleteMany({});
  db.matches.deleteMany({});
} catch (e) {
  print(e);
}
try {
   db.users.insertMany([array of objects go here], { ordered: true });
} catch (e) {
	print(e);
}
```

Then from MongoDB shell (or equivalent):

`load('users.js')`

DUE TO INHERENT DIFFERENCES IN OAUTH AND LOCAL THIS CAN NOT BE DONE. THESE WILL HAVE TO BE APPLICATION ENFORCED! Add the following unique indexes to support application in preventing duplicate usernames and passwords:

`db.users.createIndex({ username: 1 }, { unique: true })`
`db.users.createIndex({ email: 1 }, { unique: true })`

# Postman Testing

Here are some test cases that can be used to independently test the server portion of the site

## localhost:XXXX/api/match (POST)

```
{
      "title": "Colors in Spanish",
      "instructions": "Match the Colors!",
      "matches": [
      	{ "term": "negro", "definition": "black" },
      	{ "term": "blanco", "definition": "white" },
      	{ "term": "verde", "definition": "green" },
      	{ "term": "rojo", "definition": "red" },
      	{ "term": "gris", "definition": "grey" },
      	{ "term": "azul", "definition": "blue" },
      	{ "term": "amarillo", "definition": "yellow" },
      	{ "term": "rosado", "definition": "pink" },
      	{ "term": "marrón", "definition": "dark brown" },
      	{ "term": "naranja", "definition": "orange" }
      	],
      "options": {
      	"itemsPerBoard": 9,
         "duration": 50
      },
      "published": true
}
```

## localhost:XXXX/auth/local (POST)

```
{
	"username": "blahblahblah",
	"password": "blahblahblah"
}
```

## Summary

Quizdini's architecture combines a server (Express) and client (React)

# Getting Started

## Create directory structure

- `mkdir Quizdini-2.0`
- `cd Quizdini-2.0`
- `mkdir teach`
- `cd teach`

## Create master project

- `npm init`

## Install key modules needed to establish base project

- `npm install --save express`
- `npm install -g nodemon`
- `npm install -g create-react-app`
- `npm install --save concurrently`

## Create subdirectory for server code

- `mkdir server`

## Create basic index.js in `server` directory (to test configuration)

```
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

## Modify master project package.json with server-specific scripts:

```
"scripts": {
  "start": "node server",
  "server": "nodemon server"
}
```

## Test express server

- `npm start`
- Open browser and go to `localhost:5000/` (You should see Hello World!)

## Create React app (from project root), placing in `client` directory

- `create-react-app client`

## Remove .git from CRA

Using File explorer, remove `.git` directory from `client`

## Modify master project package.json with client-specific scripts:

```
"scripts": {
  ...
  "client": "npm run start --prefix client"
}
```

## Test Client

- `rpm run client` (from root project directory)
- `localhost:3000` should work

## Add consolidated (dev) startup script (to master project package.json)

```
"scripts": {
  ...
  "dev": "concurrently \"npm run server\" \"npm run client\""
}
```

## Test consolidated script

- `npm run dev`
- Verify that server and client start

## Initialize GitHub respository (from master server directory)

- `git init`
- Do to # of uncommitted changes, you will be prompted to create `.gitignore`
- Add appropriate values to `.gitignore`, e.g., `dev.js`
- `echo "# quizdini-2.0-teach" >> README.md`
- `git add README.md`
- `git add .`
- `git status` (to double-check what has been staged)
- `git commit -m "first commit"`
- `git remote add origin https://github.com/babalugats76/quizdini-2.0-teach.git`
- `git push -u origin master`
- Check GitHub repo for propagation of code, etc.

## Heroku Setup

- Add to `package.json` `engines` JavaScript object:

```
"engines": {
    "node": "10.14.1",
    "npm": "6.4.1"
  }
```

- Login to Heroku: `heroku login`
- Create Heroku app: `heroku create` (annotate URLs)
  - [Heroku URL](https://floating-tor-54181.herokuapp.com/)
  - [Heroku Remote Git Repo](https://git.heroku.com/floating-tor-54181.git)
- Push code to Heroku repo: `git push heroku master`
- Subsequent deployments
  - Check in code, e.g., `commit` and push `git push heroku master`

## Bring legacy code and configuration forward

Now that a basic project is in place, bring forward previous code for both the client and the server. Update node modules as required, etc.

```
parsed.reduce((accum, match) => {
    // Reduce array of lines to valid ones
    if (!match.term || !match.definition) {
      return accum;
    } // Do not attempt to parse if contents do not exist
    const term = DOMPurify.sanitize(match.term.trim(), PURIFY_OPTS); // Trim and HTML sanitize term
    const definition = DOMPurify.sanitize(match.definition.trim(), PURIFY_OPTS); // Trim and HTML sanitize definition
    if (
      term.length !== 0 && // Push if fields are non-empty
      definition.length !== 0 &&
      !uniqueTerms.has(term)
    ) {
      // Skip if term is a duplicate
      uniqueTerms.set(term, true); // Keep track of terms seen so far
      accum.push({ term, definition }); // Add to results
    }
    return accum; // In all cases, pass back work-in-progress array
  }, matches); // start with empty array (created earlier)

  return matches; // Return results
};
```
