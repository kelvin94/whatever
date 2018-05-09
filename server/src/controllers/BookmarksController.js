const {Bookmark} = require('../models')
const {Song} = require('../models')
const _ = require('lodash')
module.exports = {

  async index (req, res) {
    try {
      console.log('backend index action req.query', req.query)
      const songId = req.query.songId
      const userId = req.query.userId
      const where = {
        UserId: userId
      }
      if (songId) {
        where.SongId = songId
      }
      const bookmarks = await Bookmark.findAll({
        where: where,
        // using include to associate with other model
        include: [
          {
            model: Song
          }
        ]
      }).map(bookmark => bookmark.toJSON()).map(bookmark => _.extend(
        {},
        bookmark.Song,
        bookmark))
      console.log('bookmark', bookmarks)
      res.send(bookmarks)
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in bookmark controller index action'
      })
    }
  },
  async post (req, res) {
    try {
      const {songId, userId} = req.body
      console.log('post bookmark req.body', req.body)
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      console.log('found bookmark or not in db', bookmark)
      if (bookmark) {
        return res.status(404).send({
          error: 'you already have this set as bookmark'
        })
      }
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      console.log('newBookmark', newBookmark)
      res.send(newBookmark)
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in bookmark controller post action'
      })
    }
  },
  async delete (req, res) {
    try {
      const bookmarkId = req.params.bookmarkId
      const bookmark = await Bookmark.findById(bookmarkId)
      await bookmark.destroy()
      console.log('bookmark delted', bookmark)
      res.send(bookmark)
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in bookmark controller delete action'
      })
    }
  }
}
