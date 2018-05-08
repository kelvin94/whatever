const {Bookmark} = require('../models')

module.exports = {

  async index (req, res) {
    try {
      const songId = req.query.songId
      const userId = req.query.userId
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      console.log('bookmark', bookmark)
      res.send(bookmark.toJSON())
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in bookmark controller index action'
      })
    }
  }
}
