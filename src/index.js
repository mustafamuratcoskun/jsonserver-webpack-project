import {Request} from "./requests";
import UI from "./ui";

// Elementler

const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");

let updateState = null;

const request = new Request("http://localhost:3000/employees");
const ui = new UI();

eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded",getAllEmployees);
    form.addEventListener("submit",addEmployee);
    employeesList.addEventListener("click",addUpdateOrDelete);
    updateEmployeeButton.addEventListener("click",updateEmployee);
}
function getAllEmployees(){
    request.get()
    .then(employees => {
        ui.addAllEmployeesToUI(employees);
        
    }).catch(err => console.log(err));
}
function addEmployee(e){
    const employeeName = nameInput.value.trim();
    const employeeDepartment = departmentInput.value.trim();
    const employeeSalary = salaryInput.value.trim();

    if (employeeName === "" || employeeDepartment === "" || employeeSalary === "") {
        alert("Lütfen Tüm Alanları Doldurun");
    }
    else {
        
        // Api'ya Ekleme
        request.post({name:employeeName,department:employeeDepartment,salary:employeeSalary})
        .then(employee => {
            ui.addEmployeeToUI(employee);
        })
        .catch(err => console.log(err));

    }
    ui.clearInputs();
    e.preventDefault();

}
function addUpdateOrDelete(e) {
    if (e.target.id === "delete-employee") {
        deleteEmployee(e.target);

    }
    else if (e.target.id === "update-employee") {
        updateEmployeeController(e.target.parentElement.parentElement);
    }
}
function deleteEmployee(targetEmployee) {
   
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;

    request.delete(id)
    .then(response => console.log(response))
    .catch(err => console.log(err));
    ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
}
function updateEmployeeController(parent) {
    ui.toggleUpdateButton(parent);
    if (updateState === null) {
        updateState = {
            updateId: parent.children[3].textContent,
            updateParent: parent
        }
    }
    else {
        updateState = null;
    }
}
function updateEmployee(){
    if (updateState) {
        const data = {name:nameInput.value,department:departmentInput.value,salary :salaryInput.value};
        request.put(updateState.updateId,data)
        .then(updatedEmployee => {
            ui.updateEmployeeOnUI(updatedEmployee,updateState.updateParent);
        })
        .catch(err => console.log(err));
    }   
}