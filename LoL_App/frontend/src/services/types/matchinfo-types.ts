export interface timestamp {
    /*I think this is a string but I am not 100% sure how date time is returned
    I will need to make sure to return the results in date time format*/
    time:string,
    value:number,
}

export interface csResults{
    id: String,
    gametype:string,
    outcome:string,
    champion:string,
    cspm:number,
    problem: Array<timestamp>,
    all:Array<timestamp>,
}

export interface csResultsState{
    matchinfo:csResults|null,
    responseStatus:string|null,
}