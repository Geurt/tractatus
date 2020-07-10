// delimiter of the propositions in the tex file
const propositionDelimiter = /\Proposition[EG]/

// gets only the proposition number (unparsed)
const numberRegex = /^{\d.?\d*?}/g

// gets footnote
const footnoteRegex = /\\footnote{(.*)}}/s

module.exports = {
    propositionDelimiter,
    numberRegex,
    footnoteRegex
}