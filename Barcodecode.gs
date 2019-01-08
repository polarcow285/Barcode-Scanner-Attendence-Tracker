var input
var d = new Date();
var cell = 'A'
var rowCounter
var firstName
var lastName
var class
var ss = SpreadsheetApp.getActiveSpreadsheet();
var row
var classStr
var app = UiApp.createApplication().setHeight('100').setWidth('300');
//var theCurrentTime
var sheet = SpreadsheetApp.getActiveSpreadsheet();

function getName() {
 ss.setActiveSheet(ss.getSheetByName("Roster")); 
 firstName = ss.getRange('B'+ row).getValue();
 lastName = ss.getRange('C'+ row).getValue();
}

function inputFunction(){
  
  input = Browser.inputBox("Scan Now");
  
  ss.setActiveSheet(ss.getSheetByName("Attendance Data"));
  //ss.hideSheet();
  
  //find out where to start storing data
  rowCounter = ss.getRange('F1').getValue();
  
  //Which cell the serial number is stored, and stores serial number
  cell = 'A' + rowCounter  
  ss.getRange(cell).setValue(input);
  
  serialNumberSearch()
  getName()
  
  ss.setActiveSheet(ss.getSheetByName("Attendance Data"));
  //ss.hideSheet();
  //firstname
  cell = 'B' + rowCounter
  ss.getRange(cell).setValue(firstName);
  
  //lastname
  cell = 'C' + rowCounter
  ss.getRange(cell).setValue(lastName);
  
  //find out the current time
  var currentTime = d.toLocaleTimeString(); // "12:35 PM", for instance
  
  //which cell the time is stored, and stores time
  cell = 'D' + rowCounter
  ss.getRange(cell).setValue(currentTime);
  
  //which cell the date is stored, and stores date
  cell = 'E' + rowCounter
  ss.getRange(cell).setValue(currentDate());
  
  rowCounter = rowCounter + 1 
  // increase counter by 1 and store it back into F1
  ss.getRange('F1').setValue(rowCounter);
  classListing()
  intro()
  classChecker()
  ss.setActiveSheet(ss.getSheetByName("Welcome Screen"));
}

function currentDate(){
  var currentMonth = d.getMonth();
  var currentDate = d.getDate();
  var currentYear = d.getYear();
  return((currentMonth + 1)+ "/" + currentDate + "/" + currentYear);
}


function resetFunction(){
  if (Browser.msgBox("Are you sure you want to clear data?", Browser.Buttons.YES_NO) == "yes"){
   ss.getRange('F1').setValue(2);
   ss.getRange('A2:A1000').clearContent();
   ss.getRange('B2:B1000').clearContent();
   ss.getRange('C2:C1000').clearContent();
   ss.getRange('D2:C1000').clearContent();
   ss.getRange('E2:C1000').clearContent();
  }
}


function serialNumberSearch(){
  //finds row of serial number on roster
  ss.setActiveSheet(ss.getSheetByName("Roster"));
  row = 1
  do{
    var serialNumber = ss.getRange('A'+ row).getValue();
    row = row+1
  } while(serialNumber != input)
  row = row-1
  
}

function intro(){
 //firstName = SpreadsheetApp.getActiveSheet().getRange('A'+ row).getValue();
 firstName = ss.getRange('B'+ row).getValue();
 lastName = ss.getRange('C'+ row).getValue();
  
 //Browser.msgBox("Hello " + firstName +  " " + lastName) 
 //if (Browser.msgBox("Hello "+ firstName +" "+ lastName + "! Please confirm that you are taking these class(es): "+ classStr, Browser.Buttons.YES_NO) == "no"){
   //Browser.msgBox("Please speak to your instructor to update your records.");
// }
}

function classListing(){
  classStr = ""
  if (ss.getRange('D'+ row).getValue() == 1){
   classStr = classStr + "Beginner Class"
  }
  if (ss.getRange('E'+ row).getValue() ==1){
    classStr = classStr + " Intermediate Class"
  }
  if (ss.getRange('F'+ row).getValue() ==1){
    classStr = classStr + " Advanced Class"
  }
  if (ss.getRange('G'+ row).getValue() ==1){
    classStr = classStr + " Open"
  }
}
function classCheckerHelper(classType){
  var column
  var timeRow
  ss.setActiveSheet(ss.getSheetByName("Roster"));
  var classLetter 
  if (classType == "Beginner" ){
    classLetter = "D"
  }
  if (classType =="Intermediate" ){
    classLetter = "E"
  }
  if (classType == "Advanced" ){
    classLetter = "F"
  }
  if (classType == "Open" ){
    classLetter = "G"
  }
  if (ss.getRange(classLetter + row).getValue() == 1){
    //check if there is a beginner class today
    ss.setActiveSheet(ss.getSheetByName("Schedule(Pasadena)"));
    //gets current day
    var day = d.getDay()
    //finds right column to search
    if (day == 1){
      column = 'B'
    }
    if (day == 2){
      column = 'C'
    }
    if (day == 3){
      column = 'D'
    }
    if (day == 4){
      column = 'E'
    }
    if (day == 5){
      column = 'F'
    }
    if (day == 6){
      column = 'G'
    }
    if (day == 0){
      column = 'H'
    }
    //checks if there is a beginner class on that day
    timeRow = 1

    do{
      var class = ss.getRange(column + timeRow).getValue();
      timeRow = timeRow+1
    } while((timeRow < 27) && (class != classType))

    //search all the way until 27
    timeRow = timeRow - 1
    if (timeRow >= 26){
     Browser.msgBox("Sorry " + firstName + " " + lastName + "! No "+ classType + " class today!") 
    }
    else {
     getName()
     ss.setActiveSheet(ss.getSheetByName("Schedule(Pasadena)"));
     Browser.msgBox("Hello " + firstName + " " + lastName + "!" + " You are in the " + classType + " Class today at " + ss.getRange( 'A' + timeRow).getValue() + ".")
    } 
  }
   
}

function classChecker(){
 //check if the person is signed up for beginner class on roster  
  serialNumberSearch();
  classCheckerHelper("Beginner");
  classCheckerHelper("Intermediate");
  classCheckerHelper("Advanced");
  classCheckerHelper("Open");
 
}

function showAttendanceData(){
  ss.setActiveSheet(ss.getSheetByName("Attendance Data"));
}

function backToWelcomeScreen(){
  ss.setActiveSheet(ss.getSheetByName("Welcome Screen"));
}

function newStudentEnrollmentButton(){
  if (Browser.msgBox("Are you a new student in Swords Fencing Studio?", Browser.Buttons.YES_NO) == "yes"){
  showurl();
  //newStudentRowCounter();
  //theCurrentTime = d.toLocaleTimeString();
  //ss.setActiveSheet(ss.getSheetByName("New Student Enrollment Responses"));
  //everytime a new response comes in, add one to the counter to tell where to start saving data
  //save firstname and lastname and classes in variables
  //go to roster sheet
  //iterate through rows until reaching empty rows / if there is an easier way to find the first empty row
  //add firstname, lastname, class
  
}
}
  
function showurl() {
  var app = UiApp.createApplication().setHeight('100').setWidth('300');
  app.setTitle("New Student Enrollment");
  var panel = app.createPopupPanel()
  var link = app.createAnchor('Please fill out this form:', 'https://goo.gl/forms/eptCaaoT4vrhI2rG3');
  panel.add(link);
  app.add(panel);
  var doc = SpreadsheetApp.getActive();
  doc.show(app);    
}
  
/*function onFormSubmit(){
  //compare current time with form button submit
  //get value of form button submit
  var responseRow = 2
  do {
   ss.setActiveSheet(ss.getSheetByName("New Student Enrollment Responses"));
   var responseTime = ss.getRange('A'+ row).getValue()
   responseRow = responseRow + 1
    } while responseTime < theCurrentTime
   Browser.msgBox(reponseTime);
  }
*/

/*function checkForNewStudent(){
  ss.setActiveSheet(ss.getSheetByName("New Student Enrollment Responses"));
  var newstudentcounter = 0;
  while (1){
    if(newstudentcounter == 0){
      continue;
    }
    else{
      var s = ss.getActiveSheet();
      var dataRange = s.getDataRange();
      var lastrow = dataRange.getLastRow();
      //var newfirstname = ss.getRange('B' + )
      }
  }
}
*/
function newStudentRowCounter(){
  ss.setActiveSheet(ss.getSheetByName("New Student Enrollment Responses"));
  
  //when form is submitted, finds value in E1 and adds 1 to go to next row
  var responseRow = ss.getRange('E1').getValue()
  responseRow = responseRow + 1
  
  var studentFirstName = ss.getRange('B' + responseRow).getValue();
  var studentLastName = ss.getRange('C' + responseRow).getValue();
  var studentClasses = ss.getRange('D' + responseRow).getValue();
  
  //Value in E1 is updated
  ss.getRange('E1').setValue(responseRow);
  
  ss.setActiveSheet(ss.getSheetByName("Roster"));
  
  //rosterRow is the row where new student info is going to be on
  var rosterRow = ss.getRange('H1').getValue()
  
  //updates rosterRow since it is a new student
  rosterRow = rosterRow + 1
  
  //New student serial number
  ss.getRange('A' + rosterRow).setValue(rosterRow - 2);
  ss.getRange('B' + rosterRow).setValue(studentFirstName);
  ss.getRange('C' + rosterRow).setValue(studentLastName);
  
  ss.getRange('H1').setValue(rosterRow)
  //sets which classes the new student takes
  if (studentClasses == "Beginning"){
    ss.getRange('D' + rosterRow).setValue(1);
  }
  if (studentClasses == "Beginning, Intermediate"){
    ss.getRange('D' + rosterRow).setValue(1);
    ss.getRange('E' + rosterRow).setValue(1);
  }
  if (studentClasses == "Beginning, Intermediate, Advanced"){
    ss.getRange('D' + rosterRow).setValue(1);
    ss.getRange('E' + rosterRow).setValue(1);
    ss.getRange('F' + rosterRow).setValue(1);
  }
  if (studentClasses == "Beginning, Intermediate, Advanced, Open"){
    ss.getRange('D' + rosterRow).setValue(1);
    ss.getRange('E' + rosterRow).setValue(1);
    ss.getRange('F' + rosterRow).setValue(1);
    ss.getRange('G' + rosterRow).setValue(1);
  }
  if (studentClasses == "Beginning, Open"){
    ss.getRange('D' + rosterRow).setValue(1);
    ss.getRange('G' + rosterRow).setValue(1);
  }
  if (studentClasses == "Intermediate"){
    ss.getRange('E' + rosterRow).setValue(1);
  }
  if (studentClasses == "Intermediate, Advanced"){
    ss.getRange('E' + rosterRow).setValue(1);
    ss.getRange('F' + rosterRow).setValue(1);
  }
  if (studentClasses == "Intermediate, Advanced, Open"){
    ss.getRange('E' + rosterRow).setValue(1);
    ss.getRange('F' + rosterRow).setValue(1);
    ss.getRange('G' + rosterRow).setValue(1);
  }
  if (studentClasses == "Intermediate, Open"){
    ss.getRange('E' + rosterRow).setValue(1);
    ss.getRange('G' + rosterRow).setValue(1);
  }
  if (studentClasses == "Advanced"){
    ss.getRange('F' + rosterRow).setValue(1);
  }
  if (studentClasses == "Advanced, Open"){
    ss.getRange('F' + rosterRow).setValue(1);
    ss.getRange('G' + rosterRow).setValue(1);
  }
  if (studentClasses == "Open"){
    ss.getRange('G' + rosterRow).setValue(1);
  }
  
}

