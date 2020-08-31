
export class CodebookItem { //klasa se koristi prilikom pravljenja nove dijagnoze ili leka
    id: number;
    code: String;
    description: String;

   // constructor(){}

    constructor(id: number, code: String, description: String)
    {
        this.id = id;
        this.code= code;
        this.description= description;
    }
}