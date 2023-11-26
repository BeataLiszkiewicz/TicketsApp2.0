export interface Passenger{
    name:string,
    surname:string,
    ticketClass:string,
    seat:string,
    luggage:string
}

export interface People{
    adults:number,
    children:number,
    infants:number
}

export interface Flight {
    from:string,
    to:string,
    date:Date,
    price:number,
    currency:string,
    passengersTotal:People,
    passengers:Array<Passenger>

}
