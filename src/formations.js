export const STANDARD = {
    value: 0,
    name: "Standard",
    cups: 10,
    formation: [
        { row: 0, column: 0 },
        { row: 2, column: 0 },
        { row: 4, column: 0 },
        { row: 6, column: 0 },
        { row: 1, column: 2 },
        { row: 3, column: 2 },
        { row: 5, column: 2 },
        { row: 2, column: 4 },
        { row: 4, column: 4 },
        { row: 3, column: 6 }
    ]
}

export const DESPERATION = {
    value: 1,
    name: "Desperation Honeycomb",
    cups: 7,
    formation: [
        { row: 1, column: 2 },
        { row: 2, column: 0 },
        { row: 2, column: 4 },
        { row: 3, column: 2 },
        { row: 4, column: 0 },
        { row: 4, column: 4 },
        { row: 5, column: 2 }
    ]
}

export const THREETWOONE = {
    value: 2,
    name: "Three Two One",
    cups: 6,
    formation: [
        { row: 1, column: 0 },
        { row: 2, column: 2 },
        { row: 3, column: 0 },
        { row: 3, column: 4 },
        { row: 4, column: 2 },
        { row: 5, column: 0 }
    ]
}

export const THREETHREESTRAIGHT = {
    value: 3,
    name: "3-3 Offset Straight Line",
    cups: 6,
    formation: [
        { row: 2, column: 0 },
        { row: 2, column: 2 },
        { row: 2, column: 4 },
        { row: 4, column: 1 },
        { row: 4, column: 3 },
        { row: 4, column: 5 }
    ]
}

export const THREETWOSTRAIGHT = {
    value: 4,
    name: "3-2 Offset Straight Line",
    cups: 5,
    formation: [
        { row: 2, column: 0 },
        { row: 2, column: 2 },
        { row: 2, column: 4 },
        { row: 4, column: 1 },
        { row: 4, column: 3 }
    ]
}

export const DIAMOND = {
    value: 5,
    name: "Diamond",
    cups: 4,
    formation: [
        { row: 2, column: 2 },
        { row: 3, column: 0 },
        { row: 3, column: 4 },
        { row: 4, column: 2 }
    ]
}

export const TWOTWOSTRAIGHT = {
    value: 6,
    name: "2-2 Offset Straight Line",
    cups: 4,
    formation: [
        { row: 2, column: 0 },
        { row: 2, column: 2 },
        { row: 4, column: 1 },
        { row: 4, column: 3 }
    ]
}

export const TINYTRIANGLE = {
    value: 7,
    name: "Tiny Triangle",
    cups: 3,
    formation: [
        { row: 2, column: 0 },
        { row: 3, column: 2 },
        { row: 4, column: 0 }
    ]
}

export const PLAYBUTTON = {
    value: 8,
    name: "Play Button",
    cups: 3,
    formation: [
        { row: 2, column: 0 },
        { row: 2, column: 2 },
        { row: 4, column: 1 }
    ]
}

export const STOPLIGHT = {
    value: 9,
    name: "Stoplight",
    cups: 3,
    formation: [
        { row: 3, column: 0 },
        { row: 3, column: 2 },
        { row: 3, column: 4 }
    ]
}

export const GENTLEMENS = {
    value: 10,
    name: "Gentlemens",
    cups: 2,
    formation: [
        { row: 3, column: 0 },
        { row: 3, column: 2 }
    ]
}

export const SINGLECUP = {
    value: 11,
    name: "Single Cup",
    cups: 1,
    formation: [
        { row: 3, column: 0 }
    ]
}

export const FORMATIONS = [
    STANDARD,
    DESPERATION,
    THREETWOONE,
    THREETHREESTRAIGHT,
    THREETWOSTRAIGHT,
    DIAMOND,
    TWOTWOSTRAIGHT,
    TINYTRIANGLE,
    PLAYBUTTON,
    STOPLIGHT,
    GENTLEMENS,
    SINGLECUP
];