const {Bookmark} = require('../models')
const {Song} = require('../models')
const _ = require('lodash')
module.exports = {

  async index (req, res) {
    try {
      const songId = req.query.songId
      // const userId = req.query.userId
      const userId = req.user.id
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
      res.send(bookmarks)
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in bookmark controller index action'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const {songId} = req.body
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if (bookmark) {
        return res.status(404).send({
          error: 'you already have this set as bookmark'
        })
      }
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in bookmark controller post action'
      })
    }
  },
  async delete (req, res) {
    try {
      const userId = req.user.id
      const bookmarkId = req.params.bookmarkId
      const bookmark = await Bookmark.findOne({
        where: {
          // 这么左可以加强一点security by checking if the user has valid access to the bookmark
          id: bookmarkId,
          UserId: userId
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'you donot have access to this bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in bookmark controller delete action'
      })
    }
  }
}
