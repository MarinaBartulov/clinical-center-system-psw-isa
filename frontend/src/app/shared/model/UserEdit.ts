export class UserEdit {
    name:String;
    surname:String;
    address:String;
    city:String;
    country:String;
    phoneNumber:String;

    constructor(name:String,surname:String,address:String,city:String,country:String,phoneNumber:String){
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.city = city;
        this.country = country;
        this.phoneNumber = phoneNumber;
    }
}