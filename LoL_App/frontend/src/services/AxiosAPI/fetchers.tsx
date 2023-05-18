import axios from "axios"

//https://www.typescriptlang.org/docs/handbook/2/generics.html
export async function get<T> (url: string): Promise <T> {
  const {data} = await axios.get(url)
  return data
} 
