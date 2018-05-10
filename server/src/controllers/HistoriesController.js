const {History} = require('../models')
const {Song} = require('../models')
const _ = require('lodash')
module.exports = {

  async index (req, res) {
    try {
      const userId = req.user.id
      const where = {
        UserId: userId
      }
      const histories = await History.findAll({
        where: where,
        // using include to associate with other model
        include: [
          {
            model: Song
          }
        ]
      }).map(history => history.toJSON()).map(history => _.extend(
        {},
        history.Song,
        history))
      res.send(_.uniqBy(histories, history => history.SongId))
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in history controller index action'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const {songId} = req.body
      const newHistory = await History.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newHistory)
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in bookmark controller post action for newHistory'
      })
    }
  }
}
