export class RejectRequestObject {
    email : String;
    message: String;
    name: String;
    surname: String;

    constructor(email:String,message:String,name:String,surname:String){
        this.email = email;
        this.message = message;
        this.name = name;
        this.surname = surname;
    }
}