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
      let songs = null
      const search = req.query.search
      if (search) {
        songs = await Song.findAll({
          where: {
            $or: [
              'title', 'artist', 'genre', 'album'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        songs = await Song.findAll({
          limit: 10
        })
      }
      res.send(songs)
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in songs controller index action'
      })
    }
  },
  async show (req, res) {
    try {
      const song = await Song.findById(req.params.songId)
      res.send(song)
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in songs controller index action'
      })
    }
  },
  async put (req, res) {
    try {
      const song = await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      res.send(song)
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in songs controller put action'
      })
    }
  }
}
