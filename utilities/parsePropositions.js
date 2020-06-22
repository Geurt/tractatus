const { numberRegex } = require('./regexps');
const { mjpage } = require('mathjax-node-page')

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
    }
}

const trimNumber = (proposition) => {
    proposition.number = proposition.number
                    .replace(/^([\n\r]*{)/,'')
                    .replace(/(}[\n\r]*(\\)?)$/,'')
                    .replace('.','')
    return proposition                         
}

const removeDot = (proposition) => {
    // the dot is a matter of style; we re-add it in front-end
    proposition.number = proposition.number.replace('.','')
    return proposition
}

const trimText = (proposition) => {
    proposition.text = proposition.text
                    .replace(/^([\n(\r)?]*{)/,'')
                    .replace(/(}[\n(\r)?]*(\\)?)$/,'')
    return proposition
}

const removeComments = (proposition) => {
    proposition.text = proposition.text
                    .replace(/%.*?(\r)?\n/g,'')
    return proposition
}

const removeLineBreaks = (proposition) => {
    // first I pick out the double occurences \r\n\r\n -these must be preserved
    // (note that the german has \n instead of \r\n, for some reason)
    proposition.text = proposition.text
                    .replace(/(\r)?\n(\r)?\n/g, '<br /><span class="indenter"></span>')
    // then remove the rest
    proposition.text = proposition.text
                    .replace(/(\r)?\n/g, ' ')
    return proposition
}

const replaceTexWithSpans = (proposition) => {
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
        const matches = [...proposition.text.matchAll(re)]

        const text = proposition.text.replace(re, '<span class="texCommand_$<command>">$<text></span>')
        proposition.text = text
    })

    return proposition
}

const replacePropRefsWithLinks = (proposition) => {
    proposition.text = proposition.text.replace(/~?\\Prop[E|G]Ref{(.*?)}/g,'<a href="/api/$1">$1</a>')
    return proposition
}

const improveLongDashes = (proposition) => {
    proposition.text = proposition.text.replace(/---/g, '&mdash;')
    return proposition
}

const removeDashes = (proposition) => {
    // not to be too greedy, the \- needs to be preceded by a word
    // (I could test for following characters, but careful because 
    // that group wouldn't be captured in immediately following matches)
    proposition.text = proposition.text.replace(/(\w+?)\\-/g,'$1')
    return proposition
}

const removeTypos = (proposition) => {
    // there are typos in the original text
    proposition.text = proposition.text.replace(/\\DPtypo{.+?}{(.+?)}/g, '$1')
    return proposition
}

const parseSpecialCharacters = (proposition) => {
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
        proposition.text = proposition.text.replace(character[0],character[1])
    })

    return proposition
}

const removeTexCharacters = (proposition) => {
    const texCharacters = [
        /\\AllowBreak/g,
        /\\enlargethispage{.*?}/g
    ]
    texCharacters.forEach((character) => {
        proposition.text = proposition.text.replace(character,'')
    })
    return proposition
}

const parseImages = (proposition) => {
    proposition.text = proposition.text.replace(/\\Illustration(\[.*?\])?{(.*?)}/g,
        "<img src='/images/$2.png' class='proposition__image proposition__image--$2'>")

    return proposition
}

const parseLaTex = (proposition) => {
    // mathjax-node-page accepts a callback
    // we wrap it in a promise here for better usability
    return new Promise((resolve, reject) => {
        mjpage(
            proposition.text
            ,{
                output: 'svg',
                singleDollars: true,
                fragment: true
            },{
                MathJax: {
                    tex: {
                        inlineMath: [['$', '$'], ['\\(', '\\)']]
                    },
                    speakText: false
                }
            }, (parsedText) => {
                // the callback from mathjax-node-page is where we resolve the promise 
                proposition.text = parsedText
                resolve(proposition)
            })
    })
}

async function parsePropositions(rawPropositions) {
    // we wait until all promises (returned from parseProposition;
    // waiting on laTex parsing) are resolved:
    const parsedPropositions = Promise.all(rawPropositions.map(rawProposition => parseProposition(rawProposition)))
    return parsedPropositions
}

async function parseProposition(rawProposition) {
    const proposition = new Proposition(rawProposition)

    // Parse the number
    trimNumber(proposition)
    removeDot(proposition)
        
    // Parse the text
    removeComments(proposition)       // this depends on linebreaks; apply before removing those
    trimText(proposition)             // this is sometimes messed up by comments; remove them first
    removeLineBreaks(proposition)
    replaceTexWithSpans(proposition)
    improveLongDashes(proposition)
    parseSpecialCharacters(proposition)
    removeTypos(proposition)
    removeTexCharacters(proposition)
    replacePropRefsWithLinks(proposition)
    parseImages(proposition)
    removeDashes(proposition)

    // note that parseLaTex turns the result into a promise
    return parseLaTex(proposition) // returns a promise for each proposition, waiting on LaTex parsing
}

module.exports = {
    parsePropositions
}
