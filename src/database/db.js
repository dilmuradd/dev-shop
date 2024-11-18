import footbal from '/images/football.jpg'
import tShirt from '/images/tShirt.webp'
import hoodie from '/images/hoodie.webp'

export const db = [
    {id: 1, name: 'Futbol ushin', image: footbal,
            clubs: [
                {id: 1, name: "Real Madrid", image: ""},
                {id: 1, name: "Barcelona", image: ""},
                {id: 1, name: "Manchester City", image: ""},
                {id: 1, name: "Manchester United", image: ""},
            ]
    },
    {
        id: 2,
        name: 'Futbolkalarga',
        image: tShirt,
        clubs: null
    },
    {
        id: 3,
        name: 'Hoodielarga',
        image: hoodie,
        clubs: null
    }
]