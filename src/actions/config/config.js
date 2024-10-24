let production = true

module.exports = {
  API:
    production == true
      ? 'https://restsimpeg.kotabogor.go.id/v3'
      : 'https://restsimpeg2.kotabogor.go.id/api',
  APILAMA: 'https://restsimpeg2.kotabogor.go.id/api'
};