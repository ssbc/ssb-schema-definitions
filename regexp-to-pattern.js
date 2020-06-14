// NOTE is-my-json-valid takes "pattern" as regexp (hmmm)
// but this really needs to be converted into a string
// it's that same as the regexp but less the surrounding //

module.exports = function regexToPattern (regex) {
  return regex.toString()
    .replace(/\/$/, '')
    .replace(/^\//, '')
}
