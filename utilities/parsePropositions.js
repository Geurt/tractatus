const { trimStartRegex, trimEndRegex, numberRegex } = require('./regexps');

class Proposition {
    constructor(rawProposition) {
        // This is called with the raw proposition text

        // First we extract the raw number and text
        //      (There is balanced parenthesis nesting going on here.
        //      Unfortunately, recursive regex is hard in js (although possible by hand)
        //      But the data structure here allows an easy workaround:}
        const rawNumber = rawProposition.match(numberRegex)[0]
        const rawText = rawProposition.replace(numberRegex, '')
        
        this.number = rawNumber
        this.text = rawText

        // Parse the number
        this
            .trimNumber()
            .removeDot()
        
        // Parse the text
        this
            .trimText()
            .removeComments()   // this depends on linebreaks; apply before removing those
            .removeLineBreaks()

    }

    trimNumber() {
        this.number = this.number
                        .replace(trimStartRegex,'')
                        .replace(trimEndRegex,'')
                        .replace('.','')
        return this                         
    }
    removeDot() {
        // the dot is a matter of style; we re-add it in front-end
        this.number = this.number.replace('.','')
        return this
    }
    trimText() {
        this.text = this.text
                        .replace(trimStartRegex,'')
                        .replace(trimEndRegex,'')
        return this
    }
    removeComments() {
        this.text = this.text
                        .replace(/%.*\r\n/,'')
        return this
    }
    removeLineBreaks() {
        this.text = this.text
                        .replace(/\r\n/g, ' ')
        return this
    }
}

function parsePropositions(rawPropositions) {
    return rawPropositions.map(rawProposition => parseProposition(rawProposition))
}

function parseProposition(rawProposition) {
    return new Proposition(rawProposition)
}

module.exports = {
    parsePropositions
}
