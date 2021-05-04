import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import DisplayedPropositionContent from './DisplayedPropositionContent'
import { findEarlierSiblingsPropositions } from '../selectors/propositions'

import '../styles/propositionParsing.css'

// we forward the ref from the PropositionDislay container for scrolling to the last element
const DisplayedProposition = React.forwardRef((props, ref) => {
    const proposition = props.proposition
    const earlierSiblings = findEarlierSiblingsPropositions(proposition.number, props.rootNode)

    if (proposition === undefined) {
        return null
    } else {
        return (
            <div className="displayed-proposition">
                { (props.expandContract === 'expanded') && (earlierSiblings?.length > 0) &&
                    <div className="displayed-proposition-earlier-siblings">
                        { earlierSiblings.map((proposition) => (
                            <div key={proposition.number} className="displayed-proposition-earlier-sibling">
                                <DisplayedPropositionContent proposition={proposition} language={props.language}/>
                            </div>)
                            )
                        }
                    </div>
                }
                <div ref={ref} className="displayed-proposition-main">
                    <DisplayedPropositionContent proposition={proposition} language={props.language}/>
                </div>
            </div>
        )
    }
})

const mapStateToProps = (state) => ({
    language: state.language,
    expandContract: state.expandContract,
    rootNode: state.propositions.rootPropositionNode
})

export default connect(mapStateToProps, null, null, { forwardRef: true })(DisplayedProposition)

DisplayedProposition.propTypes = {
    proposition: PropTypes.shape({
        number: PropTypes.string,
        english: PropTypes.string
    })
}