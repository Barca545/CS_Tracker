import React, {useState,useEffect} from 'react';
import {get} from '../fetchers/fetchers';
import {MatchList,Match} from '../types/types';

export function useGetMatchList(props:any){
  const [ matches, setMatches] = useState<Match[]>([]); /// possibly make this a hook in the App.tsx
  
  const getMatches = async () => {
    const { list } = await get<MatchList>('/matchlist/Envoker/na1/1/');///test url
    ///const { list } = await get<MatchList>(`matchlist/${props.name}/${props.region}/${props.number}/`);///real url
    setMatches(list)
    console.log(matches)
  }

  useEffect(() => {
    getMatches()
  }, [])

  return matches;
}