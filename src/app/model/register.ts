export interface Register {
   "id": number;
   "name":string,
   "email":string,
   "password":string,
   "subjects":[{
      "subjectName": string,
      "subjectId": number,
      "degree": number
   }]

}
