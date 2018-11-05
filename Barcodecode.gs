var input
var d = new Date();
var cell = 'A'
var rowCounter

function myFunction() {
  Browser.msgBox("Hello World! Welcome to my wonderful Barcode Program!");
}

function inputFunction(){
  input = Browser.inputBox("Scan Now");
  
  // get value from C1
  
  rowCounter = SpreadsheetApp.getActiveSheet().getRange('C1').getValue();
  cell = 'A' + rowCounter  
  SpreadsheetApp.getActiveSheet().getRange(cell).setValue(input);
  var currentTime = d.toLocaleTimeString(); // "12:35 PM", for instance
  cell = 'B' + rowCounter
  SpreadsheetApp.getActiveSheet().getRange(cell).setValue(currentTime);
  rowCounter = rowCounter + 1 
  // increase counter by 1 and store it back into C1
  SpreadsheetApp.getActiveSheet().getRange('C1').setValue(rowCounter);
  
  
}

function resetFunction(){
  SpreadsheetApp.getActiveSheet().getRange('C1').setValue(2);
}
