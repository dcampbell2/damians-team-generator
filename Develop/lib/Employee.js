// TODO: Write code to define and export the Employee class

class Employee {
    constructor(name, id, email){
        this.name = name
        this.id = id
        this.email = email
        this.role = "Employee"
    }
    getName(){
        this.name = this.name
        return this.name
    }
    getId(){
        this.id = this.id
        return this.id
    }
    getEmail(){
        this.email = this.email
        return this.email
    }
    getRole(){
        return this.role
    }
}

module.exports = Employee