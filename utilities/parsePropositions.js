const { numberRegex } = require('./regexps');

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
            .removeComments()       // this depends on linebreaks; apply before removing those
            .trimText()             // this is sometimes messed up by comments; remove them first
            .removeLineBreaks()
            .replaceTexWithSpans()
            .improveLongDashes()
            .parseSpecialCharacters()
            .removeTypos()
            .removeTexCharacters()
            .replacePropRefsWithLinks()
            .parseImages()
            .removeDashes()
    }

    trimNumber() {
        this.number = this.number
                        .replace(/^([\n\r]*{)/,'')
                        .replace(/(}[\n\r]*(\\)?)$/,'')
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
                        .replace(/^([\n(\r)?]*{)/,'')
                        .replace(/(}[\n(\r)?]*(\\)?)$/,'')
        return this
    }
    removeComments() {
        this.text = this.text
                        .replace(/%.*?(\r)?\n/g,'')
        return this
    }
    removeLineBreaks() {
        // first I pick out the double occurences \r\n\r\n -these must be preserved
        // (note that the german has \n instead of \r\n, for some reason)
        this.text = this.text
                        .replace(/(\r)?\n(\r)?\n/g, '<br /><span class="indenter"></span>')
        // then remove the rest
        this.text = this.text
                        .replace(/(\r)?\n/g, ' ')
        return this
    }
    replaceTexWithSpans() {
        // this replaces a selection of tex commands
        // of the form \[command]{[text]}
        // with spans of the form
        // <span class="texCommand_[command]">[text]</span>
        // so they can be dealt with through CSS

        const texCommands = [   // list these explicitly not to be too greedy
            'textit',
            'emph',
            'Emph',
            'EmphPart',
            'BookTitle'
        ]

        texCommands.forEach((command) => {
            // note: here each / is escaped twice! Once for string, then for the regex... (So it just matches one \)
            const re = new RegExp('\\\\(?<command>' + command + '){(?<text>.+?)}', 'g')
            const matches = [...this.text.matchAll(re)]
    
            const text = this.text.replace(re, '<span class="texCommand_$<command>">$<text></span>')
            this.text = text
        })

        return this
    }
    replacePropRefsWithLinks() {
        this.text = this.text.replace(/~?\\Prop[E|G]Ref{(.*?)}/g,'<a href="/api/$1">$1</a>')
        return this
    }
    improveLongDashes() {
        this.text = this.text.replace(/---/g, '&mdash;')
        return this
    }
    removeDashes() {
        // not to be too greedy, the \- needs to be preceded by a word
        // (I could test for following characters, but careful because 
        // that group wouldn't be captured in immediately following matches)
        this.text = this.text.replace(/(\w+?)\\-/g,'$1')
        return this
    }
    removeTypos() {
        // there are typos in the original text
        this.text = this.text.replace(/\\DPtypo{.+?}{(.+?)}/g, '$1')
        return this
    }
    parseSpecialCharacters() {
        const specialCharacters = [
            [/ ?;?\\ldots/g, '...'],
            [/\\exempliGratia\\?/g, 'e.g.'],
            [/\\ExempliGratia\\?/g, 'E.g.'],
            [/\\zumBeispiel\\?/g, 'z. B.'],
            [/\\ZumBeispiel\\?/g, 'Z. B.'],
            [/\\undSoFort/g, 'u.s.f.'],
            [/\\UndSoWeiter/g, 'U.s.w.'],
            [/\\dasHeiszt\\/,'d.h.'],
            [/\\idEst\\?/g, 'i.e.'],
            [/\\IdEst\\?/g, 'I.e.'],
            [/\\fourdots/g, '....'],
            [/{\\stretchyspace(.*)}/g, '$1'],
            [/{\\verystretchyspace(.*)}/g, '$1'],
            [/etc.\\/g, 'etc.'],
            [/\\glqq{}(.*?)\\?grqq{}/g,'``$1\'\''],  // quotes only in the german
            [/\\glq{}(.*?)\\?grq{}/g,'`$1\'']
        ]
        specialCharacters.forEach((character) => {
            this.text = this.text.replace(character[0],character[1])
        })

        return this
    }
    removeTexCharacters() {
        const texCharacters = [
            /\\AllowBreak/g,
            /\\enlargethispage{.*?}/g
        ]
        texCharacters.forEach((character) => {
            this.text = this.text.replace(character,'')
        })
        return this
    }
    parseImages() {
        this.text = this.text.replace(/\\Illustration(\[.*?\])?{(.*?)}/g,
            "<img src='/images/$2.png' class='proposition__image proposition__image--$2'>")

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
