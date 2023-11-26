export interface Passenger{
    name:string,
    surname:string,
    ticketClass:string,
    seat:string,
    luggage:string
}

export interface Flight {
    from:string,
    to:string,
    date:Date,
    price:number,
    currency:string,
    passengers:Array<Passenger>

}
