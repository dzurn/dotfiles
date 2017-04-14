/**
 * Create AML cover sheets from a text file into individual PDFs. PDFs are named with
 * "COV" and the part number, then tossed into the corresponding folder on the network. 
 * MENU COMMAND and BUTTON: "Import Coversheets"         </pre>
 */
function smmd_createCOVSheets () {

	if (smmdDEBUG) { console.println("Creating AML Coversheets "); }

	if ( !myHelp.splitHelp.bAfterValue ) {
		var myHelpMsg  = "Creating new AML Coversheets.  " ;
		myHelpMsg     += "\n\nThis command will prompt the user for a tab-delimited text file" ;
		myHelpMsg     += "which contains the data for new AML coversheets, using the file" ;
		myHelpMsg     += "Blank AML Form.pdf on Tech Services Dept share as the template." ;
		app.alert({ 
			cMsg:      myHelpMsg,
			nIcon:     alertIconStatus,
			cTitle:    "Help for " + smmdVersionDate,
			oDoc:      myDoc,
			nType:     alertTypeOK,
			oCheckbox: myHelp.splitHelp 
		});
	}

	// Make sure all fields and annots are scanned
	myDoc.syncAnnotScan();

	// Save the "dirty" status, since adding a script dirties the doc.
	myOldDirtStatus = myDoc.dirty;
	
	// FIXME: NotAllowedError trying to add the Disclosed property, even with all this security crap!
	// Need to raise privileges to set the "Disclosed" property in a script, JavaScript API p.288
//	app.beginPriv();
//	myDoc.addScript("Disclosed", "this.disclosed = true;");
//	app.endPriv();
	
	myDoc.dirty = myOldDirtStatus;
	
	// If more than one doc is open, ask which document you want
	if ( !(smmd_validate ('Blank AML Form.pdf')) ) {
	
		// Make the dialog text
		var myMsg = "Are you sure you want to split pages of document:\r\r    ";
		myMsg += myDoc.info.Title + "\r(" + myDoc.documentFileName + ") ";
		myMsg += "\r\rSave to " + mySaveFolder + " folder?";
	
		// Show the dialog
		var nButton = app.alert ({ 
			cMsg:   myMsg,
			nIcon:  alertIconQuestion,  // Question dialog icon
			nType:  alertTypeYesNo,     // Yes, No
			cTitle: "Split Labels " + smmdVersionDate,
			oDoc:   myDoc
		});
	
		if ( nButton === alertButtonNo ) {
			return;         // User pressed "No" so stop script
		
		// ... otherwise just continue splitting pages in frontmost doc
		}
	}

	// Check that required fields, if present, are filled in. Further checking of Part Number below.
	// Skip validating AML if one obscure field is not there
	// "False" return indicates more work is needed by user.
	if ( myDoc.getField("RevDescription.0") !== null ) {
		var myValResult = smmd_validateAML(myDoc);
		if (myValResult !== true) {
			return false;
		}
	}

	// Is this document "dirty"? (not saved)
	if (myDoc.dirty === true) {
	
		// Make the dialog text
		var myDirtyMsg  =  "Document has been changed.\r\r" ;
		    myDirtyMsg += "You should save this document before proceeding.\r\r" ;
		    myDirtyMsg += "Do you want to continue splitting this document?";
	
		// Show the dialog
		var nDirtyButton = app.alert ({ 
			cMsg:   myDirtyMsg,
			nIcon:  alertIconQuestion,  // Question dialog icon
			nType:  alertTypeYesNo,    // Yes, No
			cTitle: "Continue? " + smmdVersionDate,
			oDoc:   myDoc
		});
	
		if ( nDirtyButton === alertButtonNo ) {
			return;   // User pressed "No" so stop script
		
		// ... otherwise just continue 
		}
	}

	var myPageLabel;
	var myFileCount = 0;

	// Is this document already dirty? Reusing myOldDirtStatus
	myOldDirtStatus = myDoc.dirty;

	if (smmdDEBUG) { console.println("Checking Page Labels" ); }

	// Check to see if the first page label is "1". If so, offer to 
	// renumber the pages based on part number.
	if (myDoc.getPageLabel(0) === "1") {
		// We don't want 'untouched' page labels
		// Make the dialog text
		var myLblMsg  = "Document needs to have page labels match the Part Number.\r\r" ;
		myLblMsg     += "Automatically number pages?";

		// Show the dialog
		var nLButton = app.alert ({ 
			cMsg:   myLblMsg,
			nIcon:  alertIconQuestion,    // Question dialog icon
			nType:  alertTypeYesNoCancel, // Yes, No, Cancel options
			cTitle: "Page Labels " + smmdVersionDate,
			oDoc:   myDoc
		});

		if ( nLButton === alertButtonCancel ) {
			return;   // User pressed "Cancel" so stop script
		}
	
		if ( nLButton === alertButtonYes ) {
			// User pressed "Yes" so renumber labels

			// FIXME: Allow distribution to AML folders for ART files as well.

			// Check that PN field is in expected format
			var myPNField = myDoc.getField("PartNumber") ;
			var myGoodPN  = myPNField.value.match(smmdPNRegEx) ;
			if ( myGoodPN === null ) {

				// Nope, so make an alert to let them know 
				var myPNMsg = "Part Number is not in the expected format. Continue numbering?" ;

				// Show the dialog
				var nPNButton = app.alert ({ 
					cMsg:   myPNMsg,
					nIcon:  alertIconQuestion,  // Question dialog icon
					nType:  alertTypeOKCancel,  // OK or Cancel options
					cTitle: "Wrong Format " + smmdVersionDate,
					oDoc:   myDoc
				});

				if ( nPNButton === alertButtonCancel ) {
					this.getField("PartNumber").setFocus() ;
					return;   // User pressed "Cancel" so stop script after focusing on PN field

				// Otherwise keep going
				} 
			} 
		
			smmd_setPageLabelsRegExp ( myDoc, smmdPNRegEx );
			// Renumbering done, now just continue with rest of script
		
		// ... otherwise just continue 
		}
	}

	if (smmdDEBUG) { console.println("Saving current Doc title" ); }

	//save current document title
	var myOldTitle = myDoc.info.Title; 
	var myLatestPDF;

	try {
		// for each page in the document...
		for (var i = 0; i < myDoc.numPages; i += 1 ) {
		
			// Get the page's PageLabel
			myPageLabel = myDoc.getPageLabel(i);
		
			// Set the title of THIS doc to the desired new name
			// This is because the new doc takes on the title of the
			// existing document. Throw away old title for now.
			myDoc.info.Title = myPageLabel + myFilenameSuffix ;

			//One of {COV|AML|M2D} for Coversheet folder, AML Test Folder, or MACTODOS
			var mySaveFolderPath = smmdPrefix ;
			switch (mySaveFolder)  { 
				case "AML" :
					mySaveFolderPath += 'Tech Services Dept/Working/AML Test - Darryl/' ;
					break;
				case "M2D" :
					mySaveFolderPath += 'MACTODOS/DarrylZ/PDF/' ;
					break;
				case "COV" :
					mySaveFolderPath += 'Tech Services Dept/Working/Work Instructions/AML - Approved Master Label/' ;
					mySaveFolderPath += myPageLabel.substr(0,2) + "-XXXX/" + myPageLabel.match(/[P4][C0]-\d{4}-\d{2,3}/) ;
					// Adding 'COV' at the end of mySaveFolderPath will give the file the correct prefix
					mySaveFolderPath += '/' + myPageLabel + "/COV" ;
					break;
				default :
					app.alert ("Variable 'mySaveFolder' not recognized. Contact Darryl Zurn. " + smmdVersionDate );
					return false;
				}

			if (smmdDEBUG) { console.println( mySaveFolderPath + myPageLabel + myFilenameSuffix ); }
		
			// Now extract the pages and increment our count
			myFileCount += 1;
		
			// Keep track of the last PDF we split off
			myLatestPDF =  mySaveFolderPath + myDoc.getPageLabel(i) + myFilenameSuffix;

			if (smmdDEBUG) { console.println( "Starting to extract " + myLatestPDF ); }

			// Try to open the intended file first. 
			try {
				smmd_openExistingPDF (mySaveFolderPath + myDoc.getPageLabel(i) + myFilenameSuffix);
				} catch (e) {
			if (smmdDEBUG) { console.println ("No existing file " + mySaveFolderPath + myDoc.getPageLabel(i) + myFilenameSuffix); }
			}
			
			// Call our trusted function to do the actual extraction
			smmd_extractPages( myDoc, i, mySaveFolderPath + myDoc.getPageLabel(i) + myFilenameSuffix );

			myDoc.info.Title = myOldTitle; //restore original Title
		
		} // End FOR each page
	
	} catch (e) { 
		app.alert ("Splitting pages failed. \r\rError code: " + e + " " + smmdVersionDate); 
		console.println ("Splitting pages failed: Error code " + e + ", " + smmdVersionDate); 
	} // End TRY loop

	if (smmdDEBUG) { console.println( "Done with all pages" ); }

	// Restore the dirty status so our Title change is overlooked
	myDoc.dirty = myOldDirtStatus;

	// Report our count
	var myCountMsg = myFileCount + " new ";

	// 1 or more PDFs?...
	myCountMsg += (myFileCount === 1) ? "PDF was created." : "PDFs were created." ;

	//	if (myFileCount === 1) { 
	//		myCountMsg += "PDF was created." ;
	//	} else { 
	//		myCountMsg += "PDFs were created." ;
	//	}

	app.alert(myCountMsg);
	console.println(myCountMsg);

	// Open the last file in Acrobat using a trusted function
	smmd_openPDF( myLatestPDF );

} // End of function smmd_createCOVSheets
app.trustedFunction( smmd_createCOVSheets );
