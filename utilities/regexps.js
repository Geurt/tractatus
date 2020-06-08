// delimiter of the propositions in the tex file
const propositionDelimiter = /\Proposition[EG]/

// gets only the proposition number (unparsed)
const numberRegex = /^{\d.?\d*?}/g

module.exports = {
    propositionDelimiter,
    numberRegex
}