import {createContext} from 'react';

///https://dev.to/nazmifeeroz/using-usecontext-and-usestate-hooks-as-a-store-mnm 
///use this function to get the matches and then use a state hook to display it in the box
///useState to set the name/puuid/region globally based on the value they search for.

export const Matchlistcontext = createContext('');