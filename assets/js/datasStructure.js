get api/users/{id} :
    {
        name:'',
        surname:'',
        reservations:[
            {
                date:'',
                userSpot: '',
                reservationId:'',
                activeLicencePlate:''
            } * tiek kiek yra userio rezervaciju
        ],
        userAways:[
            {
                awayId: int,
                startDate: '',
                endDate: ''
            } * tiek kiek yra userAways
        ],
        notifications: [
            {
                name:'',
                surname:'',
                date:''
            } * tiek kiek notification
        ]
    }

get api/reservations :
    [
        {
            date:'',
            avalableSpots: int,
            usedSpots: int
        } *6 kiekvienai dienai
    ]

get api/users :
    [
        {
            name:'',
            surname:'',
            reservations: [
                {
                    date:'',
                    reservationId:''
                } * tiek kiek turi rezervaciju
            ]
        }
    ] * tiek kiek yra useriu