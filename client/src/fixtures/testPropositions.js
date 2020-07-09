// Note that the children array is zero based
// It has empty elements at zero sometimes (when there is no proposition there)

export const proposition = {
    number: "123",
    english: "Proposition 123"
}

export const propositionAncestry = [
    {
        number: "1",
        english: "Proposition 1"  
    },
    {
        number: "12",
        english: "Proposition 12"      
    },
    {
        number: "123",
        english: "Proposition 123" 
    }
]

export const rootPropositionNode = {
    number: "1",
    proposition: {
        number: "1",
        english: "Proposition 1"
    },
    children: [
        ,   // possibly empty element
        {
            number: "11",
            proposition: {
                number: "11",
                english: "Proposition 11"
            },
            children: [
                ,
                {
                    number: "111",
                    proposition: {
                        number: "111",
                        english: "Proposition 111"
                    },
                    children: []
                }
            ]

        }
    ]
}