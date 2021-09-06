# Oren Fullstack Project

## main features usage: 
* react 
* redux
* material-ui
* node-js (express)
* knex (mySql)


# RUNNING PROJECT

Run the following command in the server directory package.json <br>
```bash 
$ cd server
$ npm run start:db
$ npm run start:server
$ npm run start:client
```


## Client cases: 
- add new user: email and name, create new user data: id, email, name, lastConnection
- edit exist user: modify email, and/or name
- delete multiple users by selected.

## Server routes:
main route
- get:/health - return server health-check
- get:/ - print hello world

users route
- get:/users - fetch the user list
- get:/users/:userId - fetch specific user
- post:/users - create a new user
- put:/users/:userId - modify user data
- delete:/users - delete users by ids


## Submitted by: Oren Shmuel
