// delimiter of the propositions in the tex file
const propositionDelimiter = /\Proposition[EG]/

// gets only the proposition number (unparsed)
const numberRegex = /^{\d.?\d*?}/g

// find some mess from start and end to trim off both raw number and text
const trimStartRegex = /^([\n\r]*{)/
const trimEndRegex = /(}[\n\r]*(\\)?)$/

module.exports = {
    propositionDelimiter,
    numberRegex,
    trimStartRegex,
    trimEndRegex
}