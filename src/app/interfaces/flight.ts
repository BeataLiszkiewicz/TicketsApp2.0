export interface Passenger{
    name:string,
    surname:string,
    ticketClass:string,
    seat:string,
    luggage:string,
    price:number
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
    month:number,
    price:number,
    currency:string,
    passengersTotal:People,
    passengers:Array<Passenger>

}
