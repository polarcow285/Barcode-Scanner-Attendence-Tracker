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

function myFunction() {
  Browser.msgBox("Hello World! Welcome to my wonderful Barcode Program!");
}

function inputFunction(){
  input = Browser.inputBox("Scan Now");
  
  //find out where to start storing data
  rowCounter = ss.getRange('D1').getValue();
  
  //Which cell the name is stored, and stores name
  cell = 'A' + rowCounter  
  ss.getRange(cell).setValue(input);
  
  //find out the current time
  var currentTime = d.toLocaleTimeString(); // "12:35 PM", for instance
  
  //which cell the time is stored, and stores time
  cell = 'B' + rowCounter
  ss.getRange(cell).setValue(currentTime);
  
  //which cell the date is stored, and stores date
  cell = 'C' + rowCounter
  ss.getRange(cell).setValue(currentDate());
  
  rowCounter = rowCounter + 1 
  // increase counter by 1 and store it back into D1
  ss.getRange('D1').setValue(rowCounter);
  nameSearch()
  classListing()
  intro()
  classChecker()
}

function currentDate(){
  var currentMonth = d.getMonth();
  var currentDate = d.getDate();
  var currentYear = d.getYear();
  return((currentMonth + 1)+ "/" + currentDate + "/" + currentYear);
}


function resetFunction(){
  ss.getRange('D1').setValue(2);
  ss.getRange('A2:A1000').clearContent();
  ss.getRange('B2:B1000').clearContent();
  ss.getRange('C2:C1000').clearContent();
}


function nameSearch(){
  //finds row of name on roster
  ss.setActiveSheet(ss.getSheetByName("Roster"));
  row = 1
  do{
    var name = ss.getRange('A'+ row).getValue();
    row = row+1
  } while(name != input)
  row = row-1
  
}

function intro(){
 //firstName = SpreadsheetApp.getActiveSheet().getRange('A'+ row).getValue();
 firstName = ss.getRange('A'+ row).getValue();
 lastName = ss.getRange('B'+ row).getValue();
  
 Browser.msgBox("Hello " + firstName +  " " + lastName) 
 //if (Browser.msgBox("Hello "+ firstName +" "+ lastName + "! Please confirm that you are taking these class(es): "+ classStr, Browser.Buttons.YES_NO) == "no"){
   //Browser.msgBox("Please speak to your instructor to update your records.");
// }
}

function classListing(){
  classStr = ""
  if (ss.getRange('C'+ row).getValue() == 1){
   classStr = classStr + "Beginner Class"
  }
  if (ss.getRange('D'+ row).getValue() ==1){
    classStr = classStr + " Intermediate Class"
  }
  if (ss.getRange('E'+ row).getValue() ==1){
    classStr = classStr + " Advanced Class"
  }
  if (ss.getRange('F'+ row).getValue() ==1){
    classStr = classStr + " Open"
  }
}
function classCheckerHelper(classType){
  var column
  var timeRow
  ss.setActiveSheet(ss.getSheetByName("Roster"));
  var classLetter 
  if (classType == "Beginner" ){
    classLetter = "C"
  }
  if (classType =="Intermediate" ){
    classLetter = "D"
  }
  if (classType == "Advanced" ){
    classLetter = "E"
  }
  if (classType == "Open" ){
    classLetter = "F"
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
     Browser.msgBox("Sorry! No "+ classType + " class today!") 
    }
    else {
     Browser.msgBox("You are in the " + classType + " Class today at " + ss.getRange( 'A' + timeRow).getValue())
    } 
  }
   
}

function classChecker(){
 //check if the person is signed up for beginner class on roster  
  nameSearch();
  classCheckerHelper("Beginner");
  classCheckerHelper("Intermediate");
  classCheckerHelper("Advanced");
  classCheckerHelper("Open");
 
}
