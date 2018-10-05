export default class UI {

    constructor(){
        this.employeesList = document.getElementById("employees");
        this.updateButton = document.getElementById("update");
        this.nameInput = document.getElementById("name");
        this.deparmentInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");

    }
    addAllEmployeesToUI(employees){
        let result = "";
        employees.forEach((employee) => {
            result += `
            <tr>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
            </tr>
            
    
            `;
        });
        this.employeesList.innerHTML = result;

    }
    addEmployeeToUI(employee) {
        this.employeesList.innerHTML += `
        <tr>
        <td>${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>${employee.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>
    `;
    }
    clearInputs(){
        this.nameInput.value = "";
        this.salaryInput.value = "";
        this.deparmentInput.value = "";
    }
    deleteEmployeeFromUI(element) {
        element.remove();
    }
    toggleUpdateButton(targetEmployee){
        if (this.updateButton.style.display === "none") {

            this.updateButton.style.display = "block";
            this.addEmployeeInfoToInputs(targetEmployee);

        }else {
            this.updateButton.style.display = "none";
        }
    }
    addEmployeeInfoToInputs(target) {
        const children = target.children;
        this.nameInput.value = children[0].textContent;
        this.deparmentInput.value = children[1].textContent;
        this.salaryInput.value = children[2].textContent;
        
    }
    updateEmployeeOnUI(employee,parent) {
        parent.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>${employee.id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        `;
        this.clearInputs();
        this.toggleUpdateButton();
    }
    
}