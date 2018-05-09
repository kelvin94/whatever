const {History} = require('../models')
const {Song} = require('../models')
const _ = require('lodash')
module.exports = {

  async index (req, res) {
    try {
      const userId = req.query.userId
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
      console.log('history', histories)
      res.send(_.uniqBy(histories, history => history.SongId))
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in history controller index action'
      })
    }
  },
  async post (req, res) {
    try {
      const {songId, userId} = req.body
      console.log('post bookmark req.body', req.body)
      const newHistory = await History.create({
        SongId: songId,
        UserId: userId
      })
      console.log('newHistory', newHistory)
      res.send(newHistory)
    } catch (error) {
      res.status(500).send({
        error: 'error pops up in bookmark controller post action for newHistory'
      })
    }
  }
}
