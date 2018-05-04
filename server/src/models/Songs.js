
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    // this 2nd arg is OPTIONS
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    genre: DataTypes.STRING,
    album: DataTypes.STRING,
    albumImageUrl: DataTypes.STRING,
    youtubeId: DataTypes.STRING,
    lyrics: DataTypes.TEXT,
    tab: DataTypes.TEXT

  })

  return Song
}
