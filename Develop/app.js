const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const questions = [
  {
    type: "input",
    message: "What's the Employees name?",
    name: "employeeName",
  },
  {
    type: "input",
    message: "What's the employees email address?",
    name: "employeeEmail",
  },
  {
    type: "input",
    message: "What's the employees ID?",
    name: "employeeID",
  },
  {
    type: "list",
    message: "What's the Employees role?",
    name: "employeeRole",
    choices: ["Intern", "Engineer", "Manager"],
    default: "Employee",
  },
  {
    type: "input",
    message: "What's the Engineers github username?",
    name: "github",
    when: (answers) => answers.employeeRole === "Engineer",
  },
  {
    type: "input",
    message: "What school is the Intern from?",
    name: "school",
    when: (answers) => answers.employeeRole === "Intern",
  },
  {
    type: "input",
    message: "What's the Managers office number location?",
    name: "officeNumber",
    when: (answers) => answers.employeeRole === "Manager",
  },
];

let newEmployees = [];

function addEmployee(newEmployees) {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Would you like to add another employee?",
        name: "addEmployee",
      },
    ])
    .then((val) => {
      if (val.addEmployee) {
        createEmployee();
      } else {
        console.log(newEmployees)
        const renderedHTML = render(newEmployees);
        // console.log(renderedHTML);
        fs.appendFile(outputPath, renderedHTML, "utf8", (err) => {
          if (err) throw err;
          console.log("You're team file is ready!");
        });
      }
    });
}

function createEmployee() {
  inquirer.prompt(questions).then((response) => {
    console.log(response);
    console.log("===================");
    if (response.employeeRole === "Engineer") {
        let newDev = new Engineer(
        response.employeeName,
        response.employeeID,
        response.employeeEmail,
        response.github
      );
      newDev.getRole();
      console.log(newDev);
      newEmployees.push(newDev);
      console.log(newEmployees);
      addEmployee(newEmployees);
    } else if (response.employeeRole === "Intern") {
        let newIntern = new Intern(
        response.employeeName,
        response.employeeID,
        response.employeeEmail,
        response.school
      );
      newIntern.getRole();
      console.log(newIntern);
      newEmployees.push(newIntern);
      console.log(newEmployees);
      addEmployee(newEmployees);
    } else if (response.employeeRole === "Manager") {
        let newManager = new Manager(
        response.employeeName,
        response.employeeID,
        response.employeeEmail,
        response.officeNumber
      );
      newManager.getRole();
      console.log(newManager);
      newEmployees.push(newManager);
      console.log(newEmployees);
      addEmployee(newEmployees);
    }
  });
}

createEmployee();
