// 备注：manually run seed/index.js file to create seed data

const {
  sequelize,
  Song,
  User,
  Bookmark
} = require('../src/models') // why we can require entire folder? Answer: https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder

const songs = require('./songs.json')
const users = require('./users.json')
const bookmarks = require('./bookmarks.json')
const Promise = require('bluebird')
sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      // using 'map' to loop through the user array in users.json
      users.map(user => {
        User.create(user)
      })
    )

    await Promise.all(
      // using 'map' to loop through the user array in users.json
      songs.map(song => {
        Song.create(song)
      })
    )

    await Promise.all(
      // using 'map' to loop through the user array in users.json
      bookmarks.map(bmark => {
        Bookmark.create(bmark)
      })
    )
  })
