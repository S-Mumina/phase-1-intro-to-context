// Define a global variable to hold employee records
const employeeRecords = [];

// Function to create an employee record from an array
function createEmployeeRecord(array) {
  const [firstName, familyName, title, payPerHour] = array;
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// Function to process an array of arrays into an array of employee records
function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(createEmployeeRecord);
}

// Function to add a timeIn event object to an employee's record of timeInEvents
function createTimeInEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employeeRecord.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date: date,
  });
  return employeeRecord;
}

// Function to add a timeOut event object to an employee's record of timeOutEvents
function createTimeOutEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employeeRecord.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date: date,
  });
  return employeeRecord;
}

// Function to calculate the hours worked by an employee for a specific date
function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find((event) => event.date === date);
  const timeOutEvent = employeeRecord.timeOutEvents.find((event) => event.date === date);

  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}

// Function to calculate the wages earned by an employee for a specific date
function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  const wagesEarned = hoursWorked * employeeRecord.payPerHour;
  return wagesEarned;
}

// Function to aggregate all the dates' wages for an employee and add them together
function allWagesFor(employeeRecord) {
  const dates = employeeRecord.timeInEvents.map((event) => event.date);
  const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
  return totalWages;
}

// Function to calculate the total payroll for an array of multiple employees
function calculatePayroll(employeesArray) {
  const totalPayroll = employeesArray.reduce((total, employee) => total + allWagesFor(employee), 0);
  return totalPayroll;
}

