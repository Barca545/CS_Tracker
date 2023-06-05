export interface VODReviewComment{
    id:string,
    timestamp:number,///this might need to be a number
    text:string
}

export interface VODReviewCommentsState{
    comments: VODReviewComment[],
    responseStatus: string|null,
}
