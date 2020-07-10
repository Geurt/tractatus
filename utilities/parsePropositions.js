const { mjpage } = require('mathjax-node-page')

const trimNumber = (number) => {
    number = number
                .replace(/^([\n\r]*{)/,'')
                .replace(/(}[\n\r]*(\\)?)$/,'')
                .replace('.','')
    return number                         
}

const removeDot = (number) => {
    // the dot is a matter of style; we re-add it in front-end
    number = number.replace('.','')
    return number
}

const trimText = (text) => {
    text = text
            .replace(/^([\n(\r)?]*{)/,'')
            .replace(/(}[\n(\r)?]*(\\)?)$/,'')
    return text
}

const removeComments = (text) => {
    text = text
            .replace(/%.*?(\r)?\n/g,'')
    return text
}

const removeLineBreaks = (text) => {
    // first I pick out the double occurences \r\n\r\n -these must be preserved
    // (note that the german has \n instead of \r\n, for some reason)
    text = text
            .replace(/(\r)?\n(\r)?\n/g, '<br /><span class="indenter"></span>')
    // then remove the rest
    text = text
            .replace(/(\r)?\n/g, ' ')
    return text
}

const replaceTexWithSpans = (text) => {
    // this replaces a selection of tex commands
    // of the form \[command]{[content]}
    // with spans of the form
    // <span class="texCommand_[command]">[content]</span>
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
        const re = new RegExp('\\\\(?<command>' + command + '){(?<content>.+?)}', 'g')
        text = text.replace(re, '<span class="texCommand_$<command>">$<content></span>')
    })

    return text
}

const replacePropRefsWithLinks = (text) => {
    text = text.replace(/~?\\Prop[E|G]Ref{(.*?)}/g,'<a href="/api/$1">$1</a>')
    return text
}

const improveLongDashes = (text) => {
    text = text.replace(/---/g, '&mdash;')
    return text
}

const removeDashes = (text) => {
    // not to be too greedy, the \- needs to be preceded by a word
    // (I could test for following characters, but careful because 
    // that group wouldn't be captured in immediately following matches)
    text = text.replace(/(\w+?)\\-/g,'$1')
    return text
}

const removeTypos = (text) => {
    // there are typos in the original text
    text = text.replace(/\\DPtypo{.+?}{(.+?)}/g, '$1')
    return text
}

const parseSpecialCharacters = (text) => {
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
        [/\\glqq{}(.*?)\\?grqq{}/g,'\'\'$1\'\''],  // quotes only in the german
        [/\\glq{}(.*?)\\?grq{}/g,'\'$1\''],
        [/``/g,'\“'],                // mathjax doesn't pick up these backticks (outside $ $), and babel ruins them
        [/''/g,'\”'],                // and let's match closing quotes in style
        [/\\Not/g,'\\sim'],
        [/\\DotOp/g, '.'],
        [/\\Implies/g,'\\supset'],
        [/\\fivedots/g,'.....'],
        [/\\BarOp/g,'\\mid'],
        // some mathjax-unsupported environments
        [/\\mbox{(.*?)}/g,'\$ $1 \$']
    ]
    specialCharacters.forEach((character) => {
        text = text.replace(character[0],character[1])
    })

    return text
}

const removeFootnotes = (text) => {
    text = text.replace(/\\footnote{.*}}/s,'}')
    return text
}

const removeTexCharacters = (text) => {
    const texCharacters = [
        /\\AllowBreak/g,
        /\\enlargethispage{.*?}/g
    ]
    texCharacters.forEach((character) => {
        text = text.replace(character,'')
    })
    return text
}

const parseImages = (text) => {
    text = text.replace(/\\Illustration(\[.*?\])?{(.*?)}/g,
        "<img src='/images/$2.png' class='proposition__image proposition__image--$2'>")

    return text
}

const parseLaTex = (text) => {
    // mathjax-node-page accepts a callback
    // we wrap it in a promise here for better usability
    return new Promise((resolve, reject) => {
        mjpage(
            text
            ,{
                output: 'svg',
                singleDollars: true,
                fragment: true
            },{
                MathJax: {
                    tex: {
                        inlineMath: [
                            ['$', '$'], 
                            ['\\(', '\\)']
                        ]
                    },
                    speakText: false
                }
            }, (parsedText) => {
                // the callback from mathjax-node-page is where we resolve the promise 
                resolve(parsedText)
            })
    })
}

async function parsePropositions(propositions) {
    // (It is kind of ugly to do it this way; but mathJax gets confused
    // when parsing both languages in one call per proposition (timeouts juggling too many
    // promises, it seems). It does work one language after another.)

    // (so we first do the number for all propositions)
    let parsedPropositions = propositions.map(proposition => parsePropositionNumber(proposition))
    // (then the english for all propositions)
    // we wait until all promises (returned from parsePropositionEnglish,
    // waiting on laTex parsing) are resolved:
    parsedPropositions = Promise.all(propositions.map(proposition => parsePropositionEnglish(proposition)))
    // (then the german for all propositions)
    parsedPropositions = Promise.all(propositions.map(proposition => parsePropositionGerman(proposition)))
    // (and finally the same for all footnotes)
    parsedPropositions = Promise.all(propositions.map(proposition => parsePropositionFootnotes(proposition)))
    return parsedPropositions
}

function parsePropositionNumber(proposition) {
    proposition.number = parseNumber(proposition.number)
    return proposition
}

async function parsePropositionGerman(proposition) {
    proposition.german = await parseText(proposition.german)
    return proposition
}

async function parsePropositionEnglish(proposition) {
    proposition.english = await parseText(proposition.english)
    return proposition
}

async function parsePropositionFootnotes(proposition) {
    if (proposition.englishFootnote) {
        proposition.englishFootnote = await parseText(proposition.englishFootnote)
    }
    if (proposition.germanFootnote) {
        proposition.germanFootnote = await parseText(proposition.germanFootnote)
    }
    return proposition
}

function parseNumber(number) {
    number = trimNumber(number)
    number = removeDot(number)

    return number
}

async function parseText(text) {
    // Parse the text
    text = removeFootnotes(text)
    text = removeComments(text)       // this depends on linebreaks; apply before removing those
    text = trimText(text)             // this is sometimes messed up by comments; remove them first
    text = removeLineBreaks(text)
    text = replaceTexWithSpans(text)
    text = improveLongDashes(text)
    text = parseSpecialCharacters(text)
    text = removeTypos(text)
    text = removeTexCharacters(text)
    text = replacePropRefsWithLinks(text)
    text = parseImages(text)
    text = removeDashes(text)

    // note that parseLaTex turns the result into a promise
    text = await parseLaTex(text) // returns a promise for each proposition, waiting on LaTex parsing

    return text
}

module.exports = {
    parsePropositions
}
