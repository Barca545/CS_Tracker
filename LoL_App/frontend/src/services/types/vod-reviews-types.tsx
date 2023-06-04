export interface VODReviewComment{
    id:string,
    timestamp:number,///this might need to be a number
    text:string
}


export interface VODReviewCommentsState{
    comments: VODReviewComment[],
    edit: VODReviewComment|null|undefined, ///letting this be undefined might cause issues
    responseStatus: string|null,
}
