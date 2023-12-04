import { Question } from "./question";

export interface Subject {
   name:string,
   questions:Question[]
   id?:number
}
