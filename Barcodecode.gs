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
  
  // get value from C1
  
  rowCounter = ss.getRange('C1').getValue();
  cell = 'A' + rowCounter  
  ss.getRange(cell).setValue(input);
  var currentTime = d.toLocaleTimeString(); // "12:35 PM", for instance
  cell = 'B' + rowCounter
  ss.getRange(cell).setValue(currentTime);
  rowCounter = rowCounter + 1 
  // increase counter by 1 and store it back into C1
  ss.getRange('C1').setValue(rowCounter);
  nameSearch()
  classListing()
  intro()
}

function resetFunction(){
  ss.getRange('C1').setValue(2);
  ss.getRange('A2:A1000').clearContent();
  ss.getRange('B2:B1000').clearContent();
}


function nameSearch(){
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
 if (Browser.msgBox("Hello "+ firstName +" "+ lastName + "! Please confirm that you are taking these class(es): "+ classStr, Browser.Buttons.YES_NO) == "no"){
   Browser.msgBox("Please speak to your instructor to update your records.");
 }
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
  if (ss.getRange('J'+ row).getValue() ==1){
    classStr = classStr + " Open Floor"
  }
}
