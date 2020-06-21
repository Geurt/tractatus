// Note that the children array is zero based
// It has empty elements at zero sometimes (when there is no proposition there)

export const rootPropositionNode = {
    number: "1",
    proposition: {
        number: "1",
        text: "Proposition 1"
    },
    children: [
        ,   // possibly empty element
        {
            number: "11",
            proposition: {
                number: "11",
                text: "Proposition 11"
            },
            children: [
                ,
                {
                    number: "111",
                    proposition: {
                        number: "111",
                        text: "Proposition 111"
                    }
                }
            ]

        }
    ]
}