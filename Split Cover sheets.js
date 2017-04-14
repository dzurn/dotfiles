var smmdVersionDate    = "2010-04-19" ;
var myInputData    = "Blank AML import.txt";
var myNumberOfRows = 5 // Use 5 for testing, should be 165;
var myOldTitle = this.info.Title; 
var myLatestPDF;
var myFileCount = 0;
var smmdPrefix = (app.platform === "WIN") ? smmdWinPathPrefix : smmdMacPathPrefix ;
var smmdDEBUG       = true ;
try 
{
	for (var i = 0; i < myNumberOfRows; i += 1) 
	{
		this.importTextData("Blank AML import.txt", i);
		this.info.Title = "COV" + this.getField("PartNumber").value + ".pdf" ;
		var mySaveFolderPath = smmdPrefix + 'MACTODOS/DarrylZ/PDF/' ;
		myFileCount += 1;
		myLatestPDF =  mySaveFolderPath + this.info.Title;
		if (smmdDEBUG) { console.println( "Starting to extract " + myLatestPDF ); }
		smmd_extractPages( this, 0, myLatestPDF );
		this.info.Title = myOldTitle; //restore original Title
		} // End FOR each page
	} catch (e) 
	{
		app.alert ("Splitting pages failed. \r\rError code: " + e + " " + smmdVersionDate); 
		console.println ("Splitting pages failed: Error code " + e + ", " + smmdVersionDate); 
		} // End TRY loop

var myCountMsg = myFileCount + " new ";
myCountMsg += (myFileCount === 1) ? "PDF was created." : "PDFs were created." ;
app.alert(myCountMsg);
console.println(myCountMsg);
smmd_openPDF( myLatestPDF );
