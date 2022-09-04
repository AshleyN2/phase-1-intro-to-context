// Your code here
function createEmployeeRecord(arr){
    return {
    firstName : arr[0],
    familyName : arr[1],
    title : arr[2],
    payPerHour : arr[3],
    timeInEvents : [],
    timeOutEvents : []
}
}
function createEmployeeRecords(employeeArray){
    return employeeArray.map(function(arr){
        return createEmployeeRecord(arr)
    })
}

function createTimeInEvent(employee, dateTime){
    let date = dateTime.split(' ', 1 ).join('')
    let time = dateTime.split(' ')[1];;
    employee.timeInEvents.push({
         type: "TimeIn",
        'hour':parseInt(time,10),
        'date': date,
    })
    return employee
}

function createTimeOutEvent(employee, dateTime){
    let date = dateTime.split(' ', 1 ).join('')
    let time = dateTime.split(' ')[1];
    employee.timeOutEvents.push({
        'type': "TimeOut",
        'date':date,
        'hour':parseInt(time,10)
    })
    return employee
}
function hoursWorkedOnDate(employee, workDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === workDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === workDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}
let wagesEarnedOnDate = function(employee, workDate){
    let rawWage = hoursWorkedOnDate(employee, workDate)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}