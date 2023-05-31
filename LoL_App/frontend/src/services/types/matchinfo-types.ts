export interface timestamp {
    /*I think this is a string but I am not 100% sure how date time is returned
    I will need to make sure to return the results in date time format*/
    time:string,
    value:number,
}

export interface csResults{
    id: String,
    type:string,
    ///outcome:string,
    ///champion:string,
    cspm:number,
    cs15:number,
    all:Array<timestamp>,
    problem: Array<timestamp>,
}

export interface csResultsState{
    matchinfo:csResults|null,
    responseStatus:string|null,
}