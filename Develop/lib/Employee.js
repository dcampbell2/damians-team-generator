// TODO: Write code to define and export the Employee class
const inquirer = require("inquirer")

class Employee {
    constructor(name, id, email){
        this.name = name
        this.id = id
        this.email = email
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
        this.role = "Employee"
        return this.role
    }
}

module.exports = Employee