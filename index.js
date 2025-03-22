// Your code here
// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Function to create a time-in event
function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return employee;
}

// Function to create a time-out event
function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);
    
    if (!timeIn || !timeOut) {
        throw new Error("Missing time in or time out event");
    }
    
    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

// Function to calculate total wages for an employee
function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
}

// Function to calculate payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}
