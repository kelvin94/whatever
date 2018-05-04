const {Song} = require('../models')

module.exports = {

  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send({songs: song})
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in songs controller post action'
      })
    }
  },
  async index (req, res) {
    try {
      const songs = await Song.findAll({
        limit: 10
      })
      res.send(songs)
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in songs controller index action'
      })
    }
  }
}
