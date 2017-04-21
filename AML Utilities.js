/**
 * @fileoverview
 * AMLUtilities.js
 *  is Javascript code intended for use with Adobe Acrobat Professional version 6 through XI.      <br>
 * Copy this file into the Javascripts folder in the Acrobat User Data area of your               <br>
 * hard disk, then restart Acrobat.                                                               <br>
 * <p>
 * Written and maintained by Darryl Zurn, darryl.zurn@smiths-medical.com                          <br>
 * <p>
 * *** This documentation is designed to be generated automatically by JSDoc (see below) ***      <br>
 * <p>
 * The latest version can be found at                                                             <br>
 *    Tech Services Dept:Working:AML Test - Darryl:References:JavaScripts                         <br>
 *    for Acrobat:AML Utilities.js                                                                <br>
 * or at
 *    //MEDICAL.SMGPPLC.COM/DFS/work/MMSP Work_Files/Tech Services Dept/Working/                <br>
 *    AML Test - Darryl\References\JavaScripts for Acrobat\AML Utilities.js                       <br>
 * <p>
 * Put a shortcut to this file (for Acrobat X, copy the file) into Javascripts folder:            <br>
 * <code> app.getPath("user","javascript")                                                        <br>
 * &nbsp;&nbsp;   &rArr; ~/Library/Application Support/Adobe/Acrobat/10.0/JavaScripts/            <br>
 * &nbsp;&nbsp;   &rArr; /C/Documents and Settings/<MPAUUsername>/Application Data/Adobe/Acrobat/10.0/JavaScripts/
 * </code>
 * <p>
 * <code>
 * 2017-04-21 FIXME: Somehow Agile # had saved files to Desktop instead of network shares         <br>
 *                   ASPC10009629-00 -> ASPC10009629-001 -> ARTASPC10009629-001.pdf               <br>
 * 2014-07-30 FIXME: Multiple security violations due to saving and opening PDFs                  <br>
 * 2008-09-25 FIXME: PC Codes containing a 40- number use 40-, not the PC in the page label       <br>
 * 2008-09-18 FIXME: Allow distribution to AML folders for ART files as well.                     <br>
 * 2008-05-13 FIXME: Can't start from button to SaveAs new file or open resulting PDF.            <br>
 * 2008-05-13 TODO:  Not making folder structure under Windows.                                   <br>
 * 2008-05-13 FIXME: Remove Title pasting after splitting                                         <br>
 * 2008-05-13 TODO:  Second "pagelabels" help appears during coversheet split                     <br>
 * 2008-05-13 FIXME: Don't ask to save a read-only file!                                          <br>
 * <p>
 * 2017-04-05 D. Zurn: Added Agile to smedPNRegEx (above), added Agile button                     <br>
 * 2017-02-28 D. Zurn: Added local Dropbox location to SplitFolders                               <br>
 * 2017-02-27 D. Zurn: Refreshed server locations                                                 <br>
 * 2014-11-26 D. Zurn: Corrected user Javascript shortcut above                                   <br>
 * 2014-07-30 D. Zurn: Added Adobe's Device Independent FilePath Format link                      <br>
 * 2013-07-16 D. Zurn: Set Page Label fields to "visible"                                         <br>
 * 2013-03-28 D. Zurn: Removed commented code, changed smmd to smed globally                      <br>
 * 2012-08-21 D. Zurn: Massive code cleanup to EC5, removed _assert utilities                     <br>
 * 2012-08-13 D. Zurn: Added M2D Icon to toolbar button                                           <br>
 * 2012-03-15 D. Zurn: Trying to fix Acrobat Pro X problems                                       <br>
 * 2010-09-27 D. Zurn: Updated JSDoc documentation terminal command file                          <br>
 * 2009-07-27 D. Zurn: Added "Btn" to button names to distinguish from same menu items            <br>
 * 2009-06-12 D. Zurn: Fixed problems with non-100 revisions such as -24A                         <br>
 * 2009-05-27 D. Zurn: Clean up JSDoc paths, restored _assert() mechanism                         <br>
 * 2009-04-22 D. Zurn: Revisions start with 100, update page numbering to use 100 instead of 001  <br>
 * 2008-11-21 D. Zurn: Fixing Thermometer objects which were commented out earlier.               <br>
 * 2008-11-20 D. Zurn: Try to get Page Labels from hidden fields, re-Linted and mod jsdoc stuff   <br>
 * 2008-07-30 D. Zurn: "No Existing PDF" added as DEBUG only, turned SmmdDebug off.               <br>
 * 2008-07-23 D. Zurn: Try to open existing file before replacing!                                <br>
 * 2008-04-24 D. Zurn: Updated alert titles. Fixed path to AML Test - Darryl                      <br>
 * 2008-04-09 D. Zurn: Renamed a couple variables. Added version date to alerts.                  <br>
 * 2008-04-01 D. Zurn: Adding a script to set "disclosed" property dirties the document. Fixed.   <br>
 * 2008-03-26 D. Zurn: Fixed problem counting open docs due to different "disclosed" behaviors    <br>
 * 2008-03-19 D. Zurn: Started adding Help dialogs to menus and buttons, added Reset Help option  <br>
 * 2008-03-17 D. Zurn: Fixed the extractPages problem causing syntax errors                       <br>
 * 2008-03-14 D. Zurn: Created another trusted function to let toolbar button extract pages       <br>
 * 2008-03-13 D. Zurn: Add Toolbar buttons                                                        <br>
 * 2008-03-11 D. Zurn: Checks for existence of required fields in smed_validateAML                <br>
 * 2008-03-06 D. Zurn: Updated PDF Reference 1.7, updated HTML documentation, added version menu  <br>
 * 2008-03-05 D. Zurn: Add required-field checks for AML form                                     <br>
 * 2008-03-03 D. Zurn: Added Platform-sniffing for correct cPath identification, COV switch       <br>
 * 2008-02-29 D. Zurn: Found how Tim Hammond renamed my folder: AML Test -> AML Working           <br>
 * 2008-02-12 D. Zurn: Modify SDI Form page labels, add 0 → O last char                           <br>
 *                   : Add MACTODOS split menu command                                            <br>
 *                   : Mod Part Number RegEx to allow PC-9999-135A, PC- & 40- specifics           <br>
 * 2008-01-10 D. Zurn: Updated comments and function names                                        <br>
 * 2008-01-09 D. Zurn: Corrected AML PDF folder structure                                         <br>
 * 2007-11-21 D. Zurn: Added JSDoc comment structure, using this command:                         <br>
 *                                                                                                <br>
 *  source /Volumes/Tech\ Services\ Dept/Working/AML\ Test\ -\ Darryl/References/Acrobat\ scripting/GenerateDocForAMLUtils.sh </br> 
 *                                                                                                 <br>
 * <p></code><code>
 * 2007-08-15 D. Zurn: Added smed_RegExFound, removed length restriction from smed_calcPageLabel  <br>
 * 2007-07-27 D. Zurn: Add "SDI Form #" capability for Cozmo Configuration worksheets             <br>
 * 2007-02-19 D. Zurn: Added document count and option to open AML Test folder                    <br>
 * 2006-11-29 D. Zurn: Changed Coversheet location: Tech Services Dept/working/AML Test - Darryl  <br>
 * 2006-09-13 D. Zurn: Added comment for "Move to Approved" folder.                               <br>
 * 2006-09-05 D. Zurn: Modified smed_splitToAMLFolders to take more arguments                     <br>
 * 2006-08-28 D. Zurn: Updated naming conventions and network paths                               <br>
 * 2006-08-21 D. Zurn: Added list of menu changes, usage notes                                    <br>
 * 2006-08-16 D. Zurn: Added capability to search for REF instead of Part Number                  <br>
 * 2006-02-08 D. Zurn: Modified global.smed_AMLBasePath                                           <br>
 * 2006-08-25 D. Zurn: Updated naming conventions and network paths                               <br>
 * <p></code>
 * <h2>
 * Naming conventions for AML PDFs and their corresponding Folders:
 *    </h2>
 * <p>
 * <code> Part Proof, sent to vendor, eventually converted into AML PDF:                </code><br>
 * <code>&nbsp;&nbsp;&nbsp;                   "ART40-9999-24X.pdf"                      </code><br>
 * <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     &rArr; Tech Services Dept/Working/Work Instructions/AML - Approved Master</code><br>
 * <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Label/40-XXXX/40-9999-24/40-9999-24X/  </code><br>
 * <code>                                                                               </code><br>
 * <code> Vendor's proof for our approval:                                              </code><br>
 * <code>&nbsp;&nbsp;&nbsp;                   "40-9999-24X fm [Vendor].pdf"             </code><br>
 * <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     &rArr; (In same folder as original artwork files)    </code><br>
 * <code>                                                                               </code><br>
 * <code> Signed proof returned to vendor:                                              </code><br>
 * <code>&nbsp;&nbsp;&nbsp;                   "40-9999-24X Approved.pdf"                </code><br>
 * <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     &rArr; (In same folder as original artwork files)    </code><br>
 * <code>                                                                               </code><br>
 * <code> Single cover page of AML PDF:                                                 </code><br>
 * <code>&nbsp;&nbsp;&nbsp;                   "COV40-9999-24X.pdf"                      </code><br>
 * <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     &rArr; Tech Services Dept/Working/Work Instructions/AML - Approved Master</code><br>
 * <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Label/40-XXXX/40-9999-24/40-9999-24X/   </code><br>
 * <code>                                                                               </code><br>
 * <code> Certified AML PDF. First page is Label Review cover sheet, rest is Part Proof:</code><br>
 * <code>&nbsp;&nbsp;&nbsp;                   "AML40-9999-24X.pdf"                </code><br>
 * <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     &rArr; Tech Services Dept/Working/Work Instructions/AML - Approved Master</code><br>
 * <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Label/40-XXXX/40-9999-24/40-9999-24X/   </code><br>
 * <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (Previous versions stay in the Rev folder) </code><br>
 * <p>
 *    **_NOTE_**  Due to permissions problems, the Macs can't write files                           <br>
 *    **********  directly to the controlled drive. Instead, save to                                <br>
 *    **********  Tech Services Dept/Working/AML Test - Darryl/Move to Approved                     <br>
 *    **********  and then use Virtual PC or a Windows computer to transfer.                        <br>
 * <p>
 * <h2>
 * Menu items added   </h2>
 * Installs several new menus with functionality used for creating and                              <br>
 * signing Electronic AML documents for Regulatory Affairs.                                         <br>
 * Add a menu item labeled "Smiths Medical AML" for AML menu items to follow                        <br>
 * <h2>
 * TOOLS menu    </h2>
 * Add new menu "Smiths Medical AML"
 * <table border="1">
 * <thead><td><b> Submenu </b>                    <td><strong> Command </strong></thead>
 * <tr><td> Use Part Number as page number        <td> smed_setPageLabelsRegExp ( smedPNRegEx   )
 * <tr><td> Use REF Number as page number         <td> smed_setPageLabelsRegExp ( smedREFRegEx  )
 * <tr><td> Use SDI Form as page number           <td> smed_setPageLabelsRegExp ( smedFormRegEx )
 * <tr><td> Use PC Code as page number            <td> smed_setPageLabelsRegExp ( smedPCRegEx   )
 * <tr><td> Use Agile number as page number       <td> smed_setPageLabelsRegExp ( smedAgileRegEx)
 * <tr><td> Use 40- number as page number         <td> smed_setPageLabelsRegExp ( smed40RegEx   )
 * <tr><td> Split to AML Test folder              <td> smed_splitToAMLFolders (AML Folder, "-actual.pdf")
 * <tr><td> Split to MACTODOS folder              <td> smed_splitToAMLFolders (MACTODOS PDF, ".pdf"     )
 * <tr><td> Add Page Label fields                 <td> smed_addAllPLFields
 * <tr><td> Use hidden fields for page labels     <td> smed_restorePageLabels
 * <tr><td> Add AML Signature and Copy fields &nbsp;&nbsp;<td> smed_addTemplateAsWatermark
 * </table>
 * <h2>
 * HELP menu
 * </h2>
 * Add new menu "JavaScript Help",
 * <table border="1">
 * <thead><td><b> Submenu </b>                <td><strong> Document </strong></thead>
 * <tr><td> JavaScript Guide                  <td> AcroJSGuide.pdf
 * <tr><td> JavaScript Reference &nbsp;&nbsp; <td> AcroJS7.pdf
 * <tr><td> Core JavaScript 1.6               <td> jslangguide.pdf
 * <tr><td> PDF Reference 1.6                 <td> PDFReference16.pdf
 * </table>
 * <p>
 * <h2>
 * Toolbar Buttons added   </h2>
 * Installs several buttons corresponding to the above menu items.
 * <h2>
 * ADD-INs toolbar   </h2>
 * <table border="1">
 * <thead><td><b> Submenu </b>                    <td><strong> Command </strong></thead>
 * <tr><td> Use Part Number as page number        <td> smed_setPageLabelsRegExp ( smedPNRegEx   )
 * <tr><td> Use REF Number as page number         <td> smed_setPageLabelsRegExp ( smedREFRegEx  )
 * <tr><td> Use SDI Form as page number           <td> smed_setPageLabelsRegExp ( smedFormRegEx )
 * <tr><td> Use PC Code as page number            <td> smed_setPageLabelsRegExp ( smedPCRegEx   )
 * <tr><td> Use Agile number as page number       <td> smed_setPageLabelsRegExp ( smedAgileRegEx)
 * <tr><td> Use 40- number as page number         <td> smed_setPageLabelsRegExp ( smed40RegEx   )
 * <tr><td> Split to AML folder                   <td> smed_splitToAMLFolders (AML Folder, "-actual.pdf")
 * <tr><td> Split to MACTODOS folder              <td> smed_splitToAMLFolders (MACTODOS PDF, ".pdf"     )
 * <tr><td> Add Page Label fields                 <td> smed_addAllPLFields
 * <tr><td> Use hidden fields for page labels     <td> smed_restorePageLabels
 * <tr><td> Add AML Signature and Copy fields &nbsp;&nbsp;<td> smed_addTemplateAsWatermark
 * </table>
 * <h2>
 * HELP menu
 * </h2>
 * Add new menu "JavaScript Help",
 * <table border="1">
 * <thead><td><b> Submenu </b><td><strong> Document </strong></thead>
 * <tr><td> JavaScript Guide                  <td> AcroJSGuide.pdf
 * <tr><td> JavaScript Reference &nbsp;&nbsp; <td> AcroJS7.pdf
 * <tr><td> Core JavaScript 1.6               <td> jslangguide.pdf
 * <tr><td> PDF Reference 1.6                 <td> PDFReference16.pdf
 * </table>
 * <p>
 *
 * <h2>
 * JavaScript references   </h2>
 * <ul>
 * <li>/Applications/Adobe Acrobat 7.0 Professional/Extending Acrobat/
 * <li>AcroJSGuide.pdf
 * <li>AcroJS7.pdf
 * <li>jslangguide.pdf
 * <li>PDFReference16.pdf
 * </ul>
 * <h2>
 * Useful URLs   </h2>
 * JSDoc Toolkit website: <a href="http://jsdoctoolkit.org/"> http://jsdoctoolkit.org/   </a><br>
 * <a href="http://www.JSLint.com/"> http://www.JSLint.com/                              </a><br>
 * <a href="http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference">
 *     http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference                </a><br>
 * <a href="http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Guide">
 *     http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Guide                    </a><br>
 *
 * @author Darryl Zurn, darryl.zurn@smiths-medical.com, daz-javascript@zzzurn.com

 */

/////////////////
//             //
//  CONSTANTS  //
//             //
/////////////////

// "use strict";

	/** JSLint directive from http://www.jslint.com/lint.html#devel
		to allow "console.println" and "app.alert" without errors */
/*global global: false, alert: false, console: false, prompt: false */

	/** Adobe Acrobat predefined methods/properties */
/*global util: false, app: false, display: true, position: true, security: false, this: true */
/*properties
    HelpWanted, LabelHelpWanted, Title, activeDocs, addField, addMenuItem,
    addSubMenu, addToolButton, alert, bAfterValue, bHidden, bOverlay, bRename,
    bStrip, begin, beginPriv, bringToFront, cEnable, cExec, cFieldType, cLabel,
    cMarked, cMsg, cName, cParent, cPath, cTitle, cTooltext, cUser, cancelled,
    ceil, charAt, charCodeAt, closeDoc, contents, createTemplate, defaultValue,
    delay, deletePages, dirty, display, documentFileName, duration, end, endPriv,
    extractPages, getAnnots, getField, getIcon, getNthFieldName, getPageLabel,
    getPageNthWord, getPageNumWords, hidden, hiddenTrueFalse, iconStreamFromIcon,
    info, insertPages, launchURL, length, match, myPDFtoOpen, nEnd, nIcon, nPage,
    nPageNum, nPos, nStart, nType, nWord, numFields, numPages, oCheckbox,
    oCoords, oDoc, oIcon, openDoc, page, pageHelp, path, platform, printf,
    println, random, removeField, removeTemplate, replace, search, setFocus,
    setPageLabels, setPersistent, spawn, splitHelp, substr, syncAnnotScan, text,
    thermometer, toUpperCase, trustedFunction, utilHelp, value
*/

/*jslint  continue: true, eqeq: false, es5: true, evil: false, nomen: true */
/*jslint  plusplus: false, undef: false, unparam: false, sloppy: true      */
/*jslint  sub: false, todo: true, vars: false, white: true, stupid: false */

/** Version string for the AML Utilities.js, appears in the menu  */
var smedVersionDate    = "2017-04-06" ;
var smedAMLUtilVersion = "AML Utilities.js " + smedVersionDate ;

var smedDEBUG       = true ;
var myOldDirtStatus = false ;

// var smedHelpWanted = true;

/** Group of constants for Alerts, js_api_reference.pdf, pages 101-102 */
var alertButtonOK     = 1;
var alertButtonCancel = 2;
var alertButtonNo     = 3;
var alertButtonYes    = 4;

var alertIconError    = 0; // Default
var alertIconWarn     = 1;
var alertIconQuestion = 2; // Same as Warning in Mac OS
var alertIconStatus   = 3; // Used for Help alerts

var alertTypeOK          = 0;
var alertTypeOKCancel    = 1;
var alertTypeYesNo       = 2;
var alertTypeYesNoCancel = 3;

// Create a new object named myHelp.
var myHelp = {} ;

myHelp.utilHelp = {
    cMsg: "Don't show help when starting AML Utilities",
    bAfterValue: false };  // Initially leave help screens on

myHelp.pageHelp = {
    cMsg: "Don't show help on Page Label commands",
    bAfterValue: false };  // Initially leave help screens on

myHelp.splitHelp = {
    cMsg: "Don't show help on Splitting commands",
    bAfterValue: false };  // Initially leave help screens on

//  app.alert({oCheckbox:myHelp.pageHelp});
//  myHelp.pageHelp.bAfterValue;


// Constants for regular expressions and field names
/** Name for fields added to pages */
var smedPgLabelPrefix = "smed_PageLabel.";
/** RegEx to detect fields added to pages */
var smedPLRegEx       = /smed_PageLabel\./;
/** Name for fields added to pages */
var smedPartNumPrefix = "smed_PartNumber.";
/** RegEx for Part Numbers like PC-4321-01A, 40-5678-137B, PC10003064-001 or 10003064-002 */
var smedPNRegEx       = /([P4][C0]-\d{4}-\d{2,3}[a-zA-Z]|P{0,1}C{0,1}10\d{6}-\d{3})/ ;

/** Regular Expression to detect 40- Part Numbers  */
var smed40RegEx       = /40-\d{4}-\d{2,3}[a-zA-Z]/ ;
/** Regular Expression to detect PC- Part Numbers  */
var smedPCRegEx       = /PC-\d{4}-\d{2,3}[a-zA-Z]/ ;

/** Regular Expression to detect Agile Part Numbers like PC10003064-001 or 10003064-002 */
var smedAgileRegEx    = /P{0,1}C{0,1}10\d{6}-\d{3}/ ;

/** Regular Expression to detect Reorder Numbers like 21-9876-01 or 21-1805-135 */
var smedREFRegEx      = /21-\d{4}-\d{2,3}/ ;
/** Regular Expression to detect SDI Form Numbers like SDI 1734 Rev. 001  */
var smedFormRegEx     = /SDI (\d{4}) Rev\. (\d{3})/ ;
/** Convert "SDI 1734 Rev. 001" to "SDI1734.001"                          */
var smedFormResult    = "SDI$1.$2" ;

/** Add WIN prefix to paths  */
/** Adobe's Device Independent File Path Format: */
/** http://www.acrobatusers.com/tutorials/file-paths-acrobat-javascript */
var smedWinPathPrefix = "/medical.smgpplc.com/dfs/work/MMSP Work_Files/";
/** Add Mac prefix to paths, set prefix for this platform  */
  var smedMacPathPrefix = "";
//var smedMacPathPrefix = "/Volumes/";
/** Set prefix for corresponding platform  */
/** Adobe's Device Independent File Path Format: */
/** http://www.acrobatusers.com/tutorials/file-paths-acrobat-javascript */
var smedPrefix = (app.platform === "WIN") ? smedWinPathPrefix : smedMacPathPrefix ;

/** Path to the Javascript references in Tech Services Dept dfs drive */
var smedAcroPath  = smedPrefix + "Tech Services Dept/Working/AML Test - Darryl/";
smedAcroPath     += "References/Acrobat scripting/";

/** Error text for "not allowed" error. */
var smedNotAllowed = "NotAllowedError: Security settings prevent access to this property or method.";

if (smedDEBUG) { console.println("Initializing Functions"); }


/////////////////
//             //
//   METHODS   //
//             //
/////////////////


/**
 * Function used in the AML PDF form to check that all required fields are filled in
 * and at least one of the Variable Data fields is clicked (even if just to say "N/A")
 * Checks to see that required fields are present, if present they are required.
 * @param {doc}      myAMLPDF          Document to check
 */
function smed_validateAML ( myAMLPDF ) {

	var requiredField, atLeastOneField, i = 0, myAllOK = false,
		myAtLeastOne = false, ii, myValField, myATField;

	if (smedDEBUG) { console.println("Validating " + myAMLPDF ); }

	// Specify a list of required field names:
	requiredField  = ["PartNumber", "Description", "RAName", "RADate", "DocName", "DocDate", "Rev.0",
			"Effectivity.0", "RevDescription.0", "LabelReview.0"] ;

	// Specify the group of fields wherein at least ONE is true
	atLeastOneField  = ["VariableData", "variable.LotNo", "variable.MfgDate", "variable.REFNo",
			"variable.SerialNo", "variable.UseBy"] ;

	// Loop through the array of REQUIRED field names:
	for (i = 0;  i < requiredField.length ; i+=1 ) {

		myValField = myAMLPDF.getField(requiredField[i]);

		// Is the required field even on the form? 
		if (myValField !== null ) {
			if (myValField.value === "" ) {
				app.alert( "The " + requiredField[i] + " field must be entered." ) ;
				// myAllOK is still false
				myValField.setFocus();
				break;
			} else if (i === (requiredField.length - 1)) {
				// We made it through, all required fields are OK
				myAllOK = true;
			}
		}
	}

	// Stop and fail if the above check didn't work
	if (myAllOK !== true) {
		return false;
	}

	// Loop through the array of AT LEAST ONE field names:
	for ( ii = 0;  ii < atLeastOneField.length ; ii += 1 ) {

		// Find at least one TRUE item
		myATField = myAMLPDF.getField( atLeastOneField[ii] );
		if (myATField.value === true || myATField.value === "On") {
			// This field is true, so at least one is true
			myAtLeastOne = true;
			break;
		}
	}

	// If at least one is not true,
	if ( myAtLeastOne !== true && this.getField("VariableData") !== true) {
		app.alert( "If no Variable Data is needed, click 'N/A'" ) ;
		myAMLPDF.getField("VariableDataDisplay").setFocus();
		return false;
	}

	// Everything checks out
	return true;
}


/**
 * Open the passed file as a trusted function. Otherwise the openDoc
 *   won't work from a toolbar button.
 * @param {doc}      myPDFtoOpen   Document to open
 */
function smed_openPDF ( myPDFtoOpen, hiddenTrueFalse ) {
	if (smedDEBUG) { console.println("Opening PDF " + myPDFtoOpen); }
	var returnDoc = false;

	// Raises the execution privilege of the current stack frame such that
	//   methods marked "secure" can execute without security exceptions
	app.beginPriv();

	// Puts the openDoc call in a try/catch structure
	try {
		returnDoc = app.openDoc({
						cPath:	myPDFtoOpen,
						bHidden: hiddenTrueFalse
		});
	} catch (e) {
		app.alert(      "Can't open PDF " + myPDFtoOpen + "\r\rError: " + e + ", " + smedVersionDate);
		console.println("Can't open PDF " + myPDFtoOpen + ", Error: "   + e + ", " + smedVersionDate);
	}
	app.endPriv();
	return returnDoc;
}
app.trustedFunction( smed_openPDF );


/**
 * Open the passed file as a trusted function. Otherwise the openDoc
 *   won't work from a toolbar button.
 * @param {doc}      myPDFtoOpen   Document to open
 */
function smed_openExistingPDF ( myPDFtoOpen ) {

	if (smedDEBUG) { console.println("Trying to open existing PDF " + myPDFtoOpen); }

	// Raises the execution privilege of the current stack frame such that
	//   methods marked secure can execute without security exceptions
	app.beginPriv();

	// Puts the openDoc call in a try/catch structure
	try {
		app.openDoc( myPDFtoOpen );
	} catch (e) {
		if (smedDEBUG) {
			app.alert(      "Error (no existing PDF?) for " + myPDFtoOpen + "\r\r" + smedVersionDate);
			console.println("Error (no existing PDF?) for " + myPDFtoOpen + ", "   + smedVersionDate);
			}
	}
	app.endPriv();
}
app.trustedFunction( smed_openExistingPDF );


/**
 * Open the passed URL as a trusted function. Otherwise launchURL
 *   won't work from a toolbar button.
 * @param {doc}      myURLtoOpen   Document to open
 */
function smed_launchURL ( myURLtoOpen ) {

	if (smedDEBUG) { console.println("Opening URL: " + myURLtoOpen ); }

	// Raises the execution privilege of the current stack frame such that
	//   methods marked secure can execute without security exceptions
	app.beginPriv();

	// Puts the openDoc call in a try/catch structure
	try {
		app.launchURL( myURLtoOpen );
	} catch (e) {
		// app.alert("Can't open URL " + myURLtoOpen + "\r\rError: " + e + ", " + smedVersionDate);
		console.println("Can't open URL " + myURLtoOpen + ", Error: " + e + ", " + smedVersionDate);
	}
	app.endPriv();
}
app.trustedFunction( smed_launchURL );


/**
 * Returns value of Help Wanted global as a trusted function. Otherwise it
 *   won't work from a toolbar button.
 * @return {string}        Nothing if not set, otherwise returns value of global.HelpWanted
 */
function smed_HelpWantedP ( ) {

	if (smedDEBUG) { console.println("Getting Help Wanted "); }

	// Raises the execution privilege of the current stack frame such that 
	//   methods marked secure can execute without security exceptions
	app.beginPriv();

	// Puts the openDoc call in a try/catch structure
	try {
		var myReturn = global.HelpWanted;
		return myReturn ;
	} catch (e) {
		app.alert("Can't get global variable \r\r Error: " + e + ", " + smedVersionDate);
		console.println("Can't get global variable \r\r Error: " + e + ", " + smedVersionDate);
		return ;  // Return nothing
	}
	app.endPriv();
}
app.trustedFunction( smed_HelpWantedP );


/**
 * Set global help variable as a trusted function. Otherwise it
 *   won't work from a toolbar button.
 * @param {string}      myHelpWanted   Value to set for Help Wanted
 */
function smed_setLabelHelpWanted ( myLabelHelpWanted ) {

	if (smedDEBUG) { console.println("Setting Help Wanted to " + myLabelHelpWanted); }

	// Raises the execution privilege of the current stack frame such that
	//   methods marked secure can execute without security exceptions
	app.beginPriv();

	// Puts the openDoc call in a try/catch structure
	try {
		global.LabelHelpWanted = myLabelHelpWanted ;
		global.setPersistent( "LabelHelpWanted", true );
	} catch (e) {
		app.alert("Can't set global Help Wanted to " + myLabelHelpWanted + "\r\r Error: " + e + ", " + smedVersionDate);
		console.println("Can't set global Help Wanted to " + myLabelHelpWanted + "\r\r Error: " + e + ", " + smedVersionDate);
	}

	app.endPriv();
}
app.trustedFunction( smed_setLabelHelpWanted );


/**
 * Add a unique field name to MyPage, alerts if already exists w/different content.    <br>
 * Build up unique field names. Use 'random' so that fields don't have exactly the 
 * same name (and thus same value) on every page                                       <br>
 * Example smedFieldName : "smed_PageLabel_7748929798274864"                           <br>
 * @param {doc}         thisDoc    Document to perform calculations ins
 * @param {string}      myPage     Page to add field to
 * @param {number}      myPrefix   Text to add before field name
 * @param {RegEx}       myRegEx    Page Label Regular Expression
 * @param {string}      myValue    Content of new field
 * @returns {string} Nothing if no fields, but adds (normally invisible) fields to the PDF document.
 */
function smed_addUniqueField(thisDoc, myPage, myPrefix, myRegEx, myValue) {

	var smedFieldName, myTryName, myTryThis, existingValue, myPLField, i = 0;

	smedFieldName =  myPrefix + util.printf( "%04d", myPage ) + "_";
	smedFieldName += util.printf( "%09d", ( Math.ceil ( Math.random() * 1000000000 )) ) ;

	for ( i = 0; i < thisDoc.numFields; i += 1) {

		myTryName = thisDoc.getNthFieldName(i);
		myTryThis = thisDoc.getField( myTryName );

		if ( ! myTryName) {
			app.alert (thisDoc.numFields+" fields in doc, but no field found.\r\r" + myTryName + " "+ i + ", " + smedVersionDate);
			return; // No fields in document
		}

		// Check field if it's on our desired page
		if ( myTryThis.page === myPage ) {

			if ( ! myTryName.match ( myRegEx ) ) {
				break; // Not a match, try next field in FOR loop
			}

			// Field already exists on myPage
			existingValue = myTryThis.value;

			if ( existingValue === myValue ) {

				// Field exists and value matches, so don't do anything else and exit
				return existingValue;
			}

			// Don't ask, just remove previous conflicting field
			thisDoc.removeField ( myTryName );
		}
	}

	// Add corresponding unique field
	myPLField = thisDoc.addField ({
		cName: smedFieldName,
		nPageNum: myPage,
		cFieldType: "text",
		oCoords: [5, 5, 200, 50]
	});

	// Set field properties
	myPLField.delay   = true;
	myPLField.display = display.visible;
	myPLField.value   = myValue;
	myPLField.delay   = false;
	return;
}


/**
 * Sets page labels. Javascripts for Acrobat cannot set a Page Label
 * (aka a page number) with a prefix only, there must be a
 * number style. (Doing it by hand you can select "none"
 * but that doesn't work in JavaScript.)
 * <p>
 * The theory here is that we are trying to assign a Page Label such
 * as "40-4043-24B" or "PC-9876-135A" to a page so we can split
 * them all off later using the page label as the filename
 * for that page. So we set the starting alphabetic page
 * number as the last character of the label.
 * <p>
 * MODIFIED 2017-04-05 D. Zurn: Added Agile-compliant Regular Expression
 * MODIFIED 2009-04-22 D. Zurn: If revision starts with 100 (default), use this as page number
 * MODIFIED 2008-02-11 D. Zurn: Turn "SDI 9999 Rev. 001" into "SDI9999.001" for page label, removed alert <br>
 * MODIFIED 2007-08-15 D. Zurn: Length restriction commented out             <br>
 * MODIFIED 2006-08-16 D. Zurn: Allow Page Labels like "21-1701-51"          <br>
 * @param {doc}      myCalcDoc      Document to perform calculations in
 * @param {string}   myPageLabel    Label portion to add
 * @param {number}   myPageNumber   Page to incorporate into page label
 * @param {boolean}  [bAddField]    If TRUE it adds extra fields, assumed false if not passed
 * @return {string}  Empty string if wrong length, character if not alphabetic,
 * or finished page label if successful
 */
function smed_calcPageLabel(myCalcDoc, myPageLabel, myPageNumber, bAddField) {

	var myOrigLabel, myLength, myLastChar, myLast3Chars, myAllButLast3Chars, myAllButLastChar,
		myAcharCode, myUpperLastChar, myNumber;

	if (smedDEBUG) { console.println("Calculating Page Labels for " + myPageLabel + myPageNumber); }

	myOrigLabel = myPageLabel ;

	// Turn "SDI 9999 Rev. 001" into "SDI9999.001" for page label
	myPageLabel = myOrigLabel.replace( /SDI (\d{4}) Rev\. (\d{3})/ , "SDI$1.$2" );

	myLength     = myPageLabel.length;
	myLastChar   = myPageLabel.charAt(myLength - 1);
	myLast3Chars = myPageLabel.substr(myLength - 3, 3);

	// If bAddField wasn't passed as argument, then it's false
	if ( ! bAddField ) {
		bAddField = false;
	}

//testing
//var my4="-01C"
//var my4="256C"
//var my4=".100"
//my4=my4.replace("-","").replace(".","")
//if (my4.match(/[0-9]{2,3}[A-Za-z]/)) {my4 +" matches"} else{my4+" nomatch"}
//if (my4.match(/[0-9]{3}/)) {my4 +" matches"} else {my4 + " nomatch"}

	// CHANGED 2009-06-12 D. Zurn
	if ( myLast3Chars.match(/[0-9]{3}/) ) {

		// We have a numeric revision between 1-999 so use it directly as the page number.

		// if (smedDEBUG) { app.alert ("Last3: \r\r" + parseInt(myLast3Chars)); }

		myAllButLast3Chars = myPageLabel.substr (0, myLength - 3);

		// No prefix needed, just use the form number
		myCalcDoc.setPageLabels ( myPageNumber, [ "D", myPageLabel.substr (0, myLength - 1), myLastChar ] );

		// Add hidden Page Label field only if bAddField is true
		if ( bAddField ) {
			smed_addUniqueField ( myCalcDoc, myPageNumber, smedPgLabelPrefix, smedPLRegEx, myPageLabel );
		}

		// Success, return actual page label
		return myCalcDoc.getPageLabel (myPageNumber);
	}

	// Not all numeric, so use our earlier "last-character" action
	// Check first to see if the new Page Label is a number
	if (  myLastChar === "0" ) {

		// Change the last character to a "O" (oh) for the page number.
		// This crude hack is necessary because Acrobat won't let a page
		// be page "0", which it needs to be if the revision is "000"

		myLastChar = "O" ; // This is a letter "O", NOT zero!
	}

	// Check to see if the new Page Label is a number
	if ( "1" <= myLastChar && myLastChar <= "9" ) {

		// app.alert ("REF: \r\r"+myPageLabel);
		myAllButLastChar = myPageLabel.substr (0, myLength - 1);

		// Set the Page Label as prefix, and last digit is the page number
		myCalcDoc.setPageLabels ( myPageNumber, ["D", myAllButLastChar, myLastChar] );

		// Add hidden Page Label field only if bAddField is true
		if ( bAddField ) {
			smed_addUniqueField ( myCalcDoc, myPageNumber, smedPgLabelPrefix, smedPLRegEx, myPageLabel );
		}

		// Success, return actual page label
		return myCalcDoc.getPageLabel (myPageNumber);
	}

	// Is Page Label the right length for a Part Number (ex. PC-4321-24B)?
	// if (myPageLabel.length !== 11) {
	//    app.alert ("Wrong length page label: \r\r"+myPageLabel+"\r\r"+myPageLabel.length);
	//    console.println ("Wrong length " + myPageLabel + " " + myPageLabel.length);
	//
	//    // Don't change Page Label
	//    return "Wrong length " + myPageLabel + " " + myPageLabel.length;
	// }

	// Calculate the character code for the last character
	// We do this to figure out the starting 'page' number
	// as an alphabetic character.
	myAcharCode = "A".charCodeAt();

	if (myLastChar.search(/[a-zA-Z]/) === -1) {
		console.println("Last character is not alphanumeric: " + myLastChar);
		return myLastChar;
	}

	// We only care about the character code for myLastChar
	// relative to the character code for "A". So A=0,
	// B=1, C=2 etc. and we'll use myNumber as the starting
	// point for the page label assignment.
	myUpperLastChar = myLastChar.toUpperCase();

	myNumber = 1 + myUpperLastChar.charCodeAt() - myAcharCode;

	if (myPageLabel === "NoPartFound") {
		// Set the actual page number if NoPartFound
		app.beginPriv();
		myCalcDoc.setPageLabels (myPageNumber, ["D", "no part ", myPageNumber]);
		app.endPriv();
	} else {

		// Type "A" is upper case alphabetic. Use the substr to get
		// all but the last character, which is set by myNumber
		app.beginPriv();
		myCalcDoc.setPageLabels (myPageNumber, ["A", myPageLabel.substr (0, myLength - 1), myNumber]);
		app.endPriv();
	}
	// Add hidden Page Label field only if bAddField is true
	if ( bAddField ) {
		smed_addUniqueField ( myCalcDoc, myPageNumber, smedPgLabelPrefix, smedPLRegEx, myPageLabel );
	}
	// success, return actual page label
	return myCalcDoc.getPageLabel (myPageNumber);
}
app.trustedFunction( smed_calcPageLabel );


/**
 * Add all possible Page Label fields in this doc   <p>
 * MENU COMMAND: "Add Page Label fields"
 * @param {doc}    thisDoc    The current document
 * @returns    Nothing, but adds (normally invisible) fields to the PDF document.
 */
function smed_addAllPLFields(thisDoc) {

	var myTherm, i = 0;

	// Set up a progress bar (thermometer)
	myTherm = app.thermometer;
	myTherm.duration = thisDoc.numPages;
	myTherm.begin();
	for ( i = 0; i < thisDoc.numPages; i += 1 ) {
		myTherm.value = i;
		myTherm.text = "Adding PageLabel field to page " + (i + 1);
		if (myTherm.cancelled) {
			break;
		}
		smed_addUniqueField (thisDoc, i, smedPgLabelPrefix, smedPLRegEx, thisDoc.getPageLabel(i));
	}
	myTherm.text = "Finished adding PageLabel fields...";
	myTherm.end ();
}


/**
 * Restore page labels for each page based on 'smed_PageLabel...' field   <p>
 * MENU COMMAND: "Use hidden fields for page labels"
 * CHANGED 2008-11-21 D. Zurn: Changed menu item, get defaultValue first, fixed thermometer?   <br>
 * @param {doc}     thisDoc     The current document
 * @returns         Nothing, but sets Page Label in PDF document.
 */
function smed_restorePageLabels(thisDoc) {

	var tempPLRegEx, myTherm, myPage = 0, i = 0, myTryName, myTryThis;

	// RegEx for matching fields
	tempPLRegEx = /smed_PageLabel/;

	// Set up a progress thermometer
	myTherm = app.thermometer; 
	myTherm.duration = thisDoc.numPages - 1; 
	myTherm.begin(); 

	// For each page in thisDoc
	for ( myPage = 0; myPage < thisDoc.numPages; myPage += 1) {

		myTherm.value = myPage;
		myTherm.text = "Adding page label from hidden field on page " + (myPage + 1); 
		if (myTherm.cancelled) {
			break;
		}

		// Find PageLabel field for this page
		for ( i = 0; i < thisDoc.numFields; i += 1 ) {

			myTryName = thisDoc.getNthFieldName ( i );  // Field name
			myTryThis = thisDoc.getField ( myTryName ); // Field object itself

			// Check whether this field is on our current page
			if ( myTryThis.page === myPage ) {

				// If field name doesn't match, check next field in FOR loop
				if ( !myTryName.match ( tempPLRegEx ) ) {
					continue;
				}

				// IF we have a value, use that, otherwise try the field's DefaultValue
				if ( myTryThis.defaultValue ) {

					// Change Page Label based on the PageLabel field defaultValue
					smed_calcPageLabel(thisDoc, myTryThis.defaultValue, myPage, false);

					// We found a good field, skip to next page
					break;
				}
				else if ( myTryThis.value )  {
					// Change Page Label based on the PageLabel field value
					smed_calcPageLabel(thisDoc, myTryThis.value, myPage, false);

					// We found a good field, skip to next page
					break;

				}
				else {
					// Nothing found to work with here, just skip to next page
					if (smedDEBUG) { console.println("No hidden-field value for page " + myPage); }
					break;
				}
			}
		}
	}
	myTherm.text = "Finished adding page labels from hidden fields...";
	myTherm.end();

}


/**
 * Go through each page and find the Page Label.   <pre>
 * MENU COMMAND: "Use Part Number as page number"
 * MENU COMMAND: "Use REF Number as page number"
 * MENU COMMAND: "Use SDI Form as page number"
 * MENU COMMAND: "Use PC Code as page number"
 * MENU COMMAND: "Use 40 number as page number"    </pre>
 * @param     {doc}   myDoc           The current document
 * @param     {RegEx} smedRegExToFind The Regular Expression to use to find Part Number
 * @returns   Nothing, but sets Page Label(s) in PDF document.
 */
function smed_setPageLabelsRegExp (myDoc, smedRegExToFind) {

	"use strict";

	var myHelpMsg, myMsg, nButton, myMaxPages, myTherm, pg = 0, myPageNotDone, myString,
		aWord = 0, myMatch, myAnnots, nPgButton, i = 0, myAnnotContents, myAnnotMatch;

	if (smedDEBUG) { console.println("Setting page labels from PN "); }

	if ( !myHelp.pageHelp.bAfterValue ) {
		myHelpMsg  = "Setting all Page Labels for document " + myDoc.documentFileName ;
		myHelpMsg += "\n\nThis command will set the page labels (page numbers) for this document" ;
		myHelpMsg += " by searching for Part Number, Reorder number or SDI form numbers in the PDF." ;
		app.alert({
			cMsg:      myHelpMsg,
			nIcon:     alertIconStatus,
			cTitle:    "Help for " + smedVersionDate,
			oDoc:      myDoc,
			nType:     alertTypeOK,
			oCheckbox: myHelp.pageHelp
		});
	}

	// Save and restore the "dirty" status, since adding a script dirties the doc.
	myOldDirtStatus = myDoc.dirty;

	//	myDoc.addScript("Disclosed", "this.disclosed = true;");   // FIXME: Disclosed property
	myDoc.dirty = myOldDirtStatus;

	if (app.activeDocs.length > 1) {
		myMsg = "Are you sure you want to set page labels for document:\r\r" + myDoc.documentFileName ;
		nButton = app.alert ({
			cMsg: myMsg,
			nIcon: alertIconQuestion, // Question dialog icon
			nType: alertTypeYesNo,    // Yes, No
			cTitle: "Set Page Labels " + smedVersionDate,
			oDoc: myDoc
		});
		if ( nButton === alertButtonNo ) {
			return;    // User pressed "Cancel" so stop script
		}
	}

	myMaxPages = myDoc.numPages;

	// set up a progress thermometer
	myTherm          = app.thermometer;
	myTherm.duration = myMaxPages;
	myTherm.begin();

	for ( pg = 0; pg < myMaxPages; pg += 1 ) {

		// Is the current page done yet?
		myPageNotDone = true;

		myTherm.value = pg;
		myTherm.text = "Setting Page Labels for page " + (pg + 1);
		if (myTherm.cancelled) {
			break;
		}

		// Collect all words on this page into myString
		myString = "";

		for ( aWord = 0; aWord < myDoc.getPageNumWords ({ nPage: pg }); aWord += 1 ) {
			myString += myDoc.getPageNthWord ({ nPage:pg, nWord:aWord, bStrip:false});
		}

		// Is the Part Number RegEx somewhere in the page contents?
		myMatch = myString.match ( smedRegExToFind );

		// Found a match, so set page label and add PN field
		if ( myMatch ) {
			smed_calcPageLabel (myDoc, myMatch[0], pg);
		//	smed_addUniqueField ( myDoc, pg, smedPartNumPrefix, smedRegExToFind, myMatch[0] );
			console.println(myDoc.getPageLabel(pg));

			// Go to next page, this one's done
			continue;
		}

		// No PartNumber found in page contents, now check annotations (comments)
		// First make sure all annots in the document are sync'ed
		myDoc.syncAnnotScan();

		// Get an array of all annots on this page
		myAnnots = myDoc.getAnnots ({ nPage:pg });

		// If no annots on the page, then we have nothing to work with.
		if ( !myAnnots) {
			smed_calcPageLabel ( myDoc, "NoPartFound", pg );

			// This page is now done processing
			//myPageNotDone = false;

			// Continue with next page in page FOR loop
			continue;
		}

		// For all annots found on the page...
		for ( i = 0; i < myAnnots.length; i += 1 ) {
			myAnnotContents = myAnnots[ i ].contents;
			myAnnotMatch = myAnnotContents.match(smedRegExToFind);

			// If we found a matching page annotation, use it for Page Label
			// Don't need another Part Number field
			if ( myAnnotMatch ) {
				smed_calcPageLabel (myDoc, myAnnotMatch[0], pg);
				console.println(myDoc.getPageLabel(pg));

				// This page is done processing
				myPageNotDone = false;
				// Break out of the Annots FOR loop
				break;
			}

		} // Annot FOR loop

		// If PN not found in this annot, just set Page Label
		if ( myPageNotDone ) {
			smed_calcPageLabel(myDoc, "NoPartFound", pg);
		} // if myPageNotDone

	} // Page FOR loop

	// Done with all pages, clean up progress bar
	myTherm.text = "Finished adding Page Labels...";
	myTherm.end();

	nPgButton = app.alert ({
		cMsg: "Also add Page Label fields to document?",
		nIcon: alertIconQuestion,  // Question dialog icon
		nType: alertTypeYesNo,     // Yes, No
		cTitle: "Add Fields " + smedVersionDate,
		oDoc: myDoc
	});

	if ( nPgButton === alertButtonYes ) {
		// User pressed "Yes"
		smed_addAllPLFields ( myDoc );
	}
}


/**
 * Utility function to manually test Regular Expression to see if
 * the corresponding string is found in a document.
 * @param    {RegEx}  smedRegExToFind   The Regular Expression to use to find Part Number
 * @returns  {string} Returns any found matches
 */
function smed_RegExFound ( smedRegExToFind ) {

	var myMaxPages = this.numPages, myFoundInDoc = 0, pg = 0, myString = "", aWord = 0, myMatch;

	for ( pg = 0; pg < myMaxPages; pg += 1) {
		myString = "";
		for ( aWord = 0; aWord < this.getPageNumWords({nPage:pg}); aWord += 1) {
			myString += this.getPageNthWord({nPage:pg, nWord:aWord, bStrip:false});
		}
		myMatch = myString.match(smedRegExToFind);
		if (myMatch) {
			myFoundInDoc += 1;
			console.println("Found RegEx..." + myMatch + " on page " + pg + ".");
		}
	}
	return("Matches found: " + myFoundInDoc);
}


/**
* @param {doc}      myDoc        Document to perform calculations in
* @param {string}   myPgNo       Page index to extract
* @param {string}   myPath       Path and filename for file to save
* @returns	Nothing, but saves extracted page to passed Path
 */
function smed_extractPages ( myDoc, myPgNo, myPath) {

	// Raises the execution privilege of the current stack frame such that 
	//   methods marked secure can execute without security exceptions
	app.beginPriv();

	myDoc.extractPages({
		nStart: myPgNo,
		nEnd:   myPgNo, // Extract a single page at a time
		cPath:  myPath
	});

	// Done with Extract so cancel Priv escalation
	app.endPriv();
}
app.trustedFunction( smed_extractPages );


/**
 * Explodes AML cover sheets into individual page PDFs. PDFs are named with
 * the recovered part number on that page, and tossed into the corresponding folder. 
 * Now calculates correct folder based on mySaveFolder. <pre>
 * MENU COMMAND and BUTTON: "Split to AML Folder"
 * MENU COMMAND and BUTTON: "Split to Dropbox Folder"
 * MENU COMMAND and BUTTON: "Split to Coversheet Folder"
 * MENU COMMAND and BUTTON: "Split to MACTODOS Folder"      </pre>
 * @param {doc}      myDoc              Document to split
 * @param {string}   mySaveFolder       One of {COV|Drop|AML|M2D} for Coversheet folder, Dropbox, AML Test Folder, or DZ PDF
 * @param {string}   myFilenameSuffix   Prefix to append to PDF file, usually .pdf or -actual.pdf
 */
function smed_splitToFolders (myDoc, mySaveFolder, myFilenameSuffix) {

	var myHelpMsg, myMsg, nButton, myValResult, myDirtyMsg, nDirtyButton, myPageLabel,
		myFileCount = 0, myLblMsg, nLButton, myPNField, myGoodPN, myPNMsg, nPNButton,
		myOldTitle, myLatestPDF, i = 0, mySaveFolderPath, myCountMsg;

	if (smedDEBUG) { console.println("Split to Folders Function " + mySaveFolder + ": " + myFilenameSuffix); }

	if ( !myHelp.splitHelp.bAfterValue ) {
		myHelpMsg  = "Splitting all pages of " + myDoc.documentFileName ;
		myHelpMsg += " to " + mySaveFolder + " folder(s).";
		myHelpMsg += "\n\nThis command will split (extract) all pages of this document to individual" ;
		myHelpMsg += " single-page PDF files. They will be put into the designated folder, BUT if the" ;
		myHelpMsg += " Coversheet option is used, the corresponding subfolders will be created. " ;
		myHelpMsg += "\n\nExisting files will be overwritten. The last PDF file will be opened when done." ;
		// myHelpMsg += "\n\n(NOTE: If the Coversheet option is used, but the Part # is NOT a PC code or 40-" ;
		// myHelpMsg += " number, then splitting will not work properly: so split page to MACTODOS, create the";
		// myHelpMsg += " MISC folder structure 'by hand', and drag the coversheet there.) " ;
		app.alert({
			cMsg:      myHelpMsg,
			nIcon:     alertIconStatus,
			cTitle:    "Help for " + smedVersionDate,
			oDoc:      myDoc,
			nType:     alertTypeOK,
			oCheckbox: myHelp.splitHelp
		});
	}

	// Make sure all fields and annots are scanned
	myDoc.syncAnnotScan();

	// Set Disclosed to true. Restore the "dirty" status, since adding a script dirties the doc.
	myOldDirtStatus = myDoc.dirty;

	// FIXME: NotAllowedError trying to add the Disclosed property, even with all this security crap!
	// Need to raise privileges to set the "Disclosed" property in a script, JavaScript API p.288
		//	app.beginPriv();
		//	myDoc.addScript("Disclosed", "desolcsid.siht = true;");
		//	app.endPriv();

	myDoc.dirty = myOldDirtStatus;

	// If more than one doc is open, ask which document you want
	if (app.activeDocs.length > 1) {

		// Make the dialog text
		myMsg = "Are you sure you want to split pages of document:\r\r    ";
		myMsg += myDoc.info.Title + "\r(" + myDoc.documentFileName + ") ";
		myMsg += "\r\rSave to " + mySaveFolder + " folder?";

		// Show the dialog
		nButton = app.alert ({
			cMsg:   myMsg,
			nIcon:  alertIconQuestion,  // Question dialog icon
			nType:  alertTypeYesNo,     // Yes, No
			cTitle: "Split Labels " + smedVersionDate,
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
		myValResult = smed_validateAML(myDoc);
		if (myValResult !== true) {
			return false;
		}
	}

	// Is this document "dirty"? (not saved)
	if (myDoc.dirty === true) {

		// Make the dialog text
		myDirtyMsg  = "Document has been changed.\r\r" ;
		myDirtyMsg += "You should save this document before proceeding.\r\r" ;
		myDirtyMsg += "Do you want to continue splitting this document?";

		// Show the dialog
		nDirtyButton = app.alert ({
			cMsg:   myDirtyMsg,
			nIcon:  alertIconQuestion,  // Question dialog icon
			nType:  alertTypeYesNo,    // Yes, No
			cTitle: "Continue? " + smedVersionDate,
			oDoc:   myDoc
		});

		if ( nDirtyButton === alertButtonNo ) {
			return;   // User pressed "No" so stop script

		// ... otherwise just continue
		}
	}


	// Is this document already dirty? Reusing myOldDirtStatus
	myOldDirtStatus = myDoc.dirty;

	if (smedDEBUG) { console.println("Checking Page Labels" ); }

	// Check to see if the first page label is "1". If so, offer to
	// renumber the pages based on part number.
	if (myDoc.getPageLabel(0) === "1") {

		// We don't want 'untouched' page labels
		// Make the dialog text
		myLblMsg  = "Document needs to have page labels match the Part Number.\r\r" ;
		myLblMsg += "Automatically number pages?";

		// Show the dialog
		nLButton = app.alert ({
			cMsg:   myLblMsg,
			nIcon:  alertIconQuestion,    // Question dialog icon
			nType:  alertTypeYesNoCancel, // Yes, No, Cancel options
			cTitle: "Page Labels " + smedVersionDate,
			oDoc:   myDoc
		});

		if ( nLButton === alertButtonCancel ) {
			return;   // User pressed "Cancel" so stop script
		}

		if ( nLButton === alertButtonYes ) {
			// User pressed "Yes" so renumber labels

			// WONTFIX: Allow distribution to AML folders for ART files as well.

			// Check that PN field is in expected format
			myPNField = myDoc.getField("PartNumber") ;
			myGoodPN  = myPNField.value.match(smedPNRegEx) ;
			if ( myGoodPN === null ) {

				// Nope, so make an alert to let them know
				myPNMsg = "Part Number is not in the expected format. Continue numbering?" ;

				// Show the dialog
				nPNButton = app.alert ({
					cMsg:   myPNMsg,
					nIcon:  alertIconQuestion,  // Question dialog icon
					nType:  alertTypeOKCancel,  // OK or Cancel options
					cTitle: "Wrong Format " + smedVersionDate,
					oDoc:   myDoc
				});

				if ( nPNButton === alertButtonCancel ) {
					this.getField("PartNumber").setFocus() ;
					return;   // User pressed "Cancel" so stop script after focusing on PN field

				// Otherwise keep going
				}
			}

			smed_setPageLabelsRegExp ( myDoc, smedPNRegEx );
			// Renumbering done, now just continue with rest of script

		// ... otherwise just continue
		}
	}

	if (smedDEBUG) { console.println("Saving current Doc title" ); }

	//save current document title
	myOldTitle = myDoc.info.Title;

	try {
		// for each page in the document...
		for ( i = 0; i < myDoc.numPages; i += 1 ) {

			// Get the page's PageLabel
			myPageLabel = myDoc.getPageLabel(i);

			// Set the title of THIS doc to the desired new name
			// This is because the new doc takes on the title of the
			// existing document. Throw away old title for now.
			myDoc.info.Title = myPageLabel + myFilenameSuffix ;

			//One of {COV|Drop|AML|M2D} for Coversheet folder, AML Test Folder, or DZ PDF
			mySaveFolderPath = smedPrefix ;

			/** Adobe's Device Independent File Path Format: */
			/** http://www.acrobatusers.com/tutorials/file-paths-acrobat-javascript */
			switch (mySaveFolder)  {
				case "AML" :
//					mySaveFolderPath += 'Tech Services Dept/Working/AML Test - Darryl/' ;
					break;
				case "M2D" :
					mySaveFolderPath += '/MACTODOS/DarrylZ/PDF/' ;
					break;
				case "Drop" :
					mySaveFolderPath += '/MPAUD6234/Users/dzurnlocal/Dropbox/PDF/' ;
					break;
			//	case "COV" :
			//		mySaveFolderPath += 'Tech Services Dept/Working/Work Instructions/AML - Approved Master Label/' ;
			//		mySaveFolderPath += myPageLabel.substr(0,2) + "-XXXX/" + myPageLabel.match(/[P4][C0]-\d{4}-\d{2,3}/) ;
					// Adding 'COV' at the end of mySaveFolderPath will give the file the correct prefix
			//		mySaveFolderPath += '/' + myPageLabel + "/COV" ;
			//		break;
				default :
					app.alert ("Variable 'mySaveFolder' not recognized. Contact Darryl Zurn. " + smedVersionDate );
					return false;
				}

			if (smedDEBUG) { console.println( mySaveFolderPath + myPageLabel + myFilenameSuffix ); }

			// Now extract the pages and increment our count
			myFileCount += 1;

			// Keep track of the last PDF we split off
			myLatestPDF =  mySaveFolderPath + myDoc.getPageLabel(i) + myFilenameSuffix;

			if (smedDEBUG) { console.println( "Starting to extract " + myLatestPDF ); }

			// Try to silently open the intended file first.
//			try {
//				smed_openExistingPDF (mySaveFolderPath + myDoc.getPageLabel(i) + myFilenameSuffix);
//				} catch (e) {
//				if (smedDEBUG) {
//					console.println ("No existing file " + mySaveFolderPath + myDoc.getPageLabel(i) + myFilenameSuffix);
//					}
//			}

			// Call our trusted function to do the actual extraction
			smed_extractPages( myDoc, i, mySaveFolderPath + myDoc.getPageLabel(i) + myFilenameSuffix );

			myDoc.info.Title = myOldTitle; //restore original Title

		} // End FOR each page

	} catch (splitErr) {
		app.alert       ("Splitting pages failed. \r\rError code: " + splitErr + " "  + smedVersionDate);
		console.println ("Splitting pages failed: Error code "      + splitErr + ", " + smedVersionDate);
	} // End TRY loop

	if (smedDEBUG) { console.println( "Done with all pages" ); }

	// Restore the dirty status so our Title change is overlooked
	myDoc.dirty = myOldDirtStatus;

	// Report our count
	myCountMsg = myFileCount + " new ";

	// 1 or more PDFs?...
	myCountMsg += (myFileCount === 1) ? "PDF was created." : "PDFs were created." ;

	app.alert(myCountMsg);
	console.println(myCountMsg);

	// Open the last file in Acrobat using a trusted function
	smed_openPDF({ myPDFtoOpen:myLatestPDF, hiddenTrueFalse:false });

} // End of function smed_splitToFolders
app.trustedFunction( smed_splitToFolders );


/**
 * Adds a watermark template named AML_Template.pdf                             <br>
 * Partly from a demo file by http://www.byteryte.nl                            <br>
 *   Overlay first page (template) onto second page. This will copy
 *   all existing fields on page 0 to page 1.
 *   The signature fields don't overlay, so make page 0 be the template
 *   and page 1 be the base! Crazy.                                             <br>
 * MENU COMMAND: "Add AML Signature and Copy fields"
 * @returns   Nothing, but adds signature fields and hidden-but-printing fields
 */
function smed_addTemplateAsWatermark ( myTemplateDoc ) {

	var myMsg, nButton, myTempMsg, nTempButton, myInsertMsg, myAMLPath, myAlert, myAMLTemplate;

	// Set Disclosed to true. Restore the "dirty" status, since adding a script dirties the doc.
	myOldDirtStatus = myTemplateDoc.dirty;
//	myDoc.addScript("Disclosed", "this.disclosed = true;");   // FIXME: Disclosed property
	myTemplateDoc.dirty = myOldDirtStatus;

	//	Fire off an alert if more than one doc is open. Confirm with user.
	if (app.activeDocs.length > 1) {
		myMsg  = "Are you sure you want to add signature field and " ;
		myMsg += "stamps to document:\r\r" ;
		myMsg += myTemplateDoc.info.Title + "\r(" + myTemplateDoc.documentFileName + ")";

		nButton = app.alert ({
			cMsg: myMsg,
			nIcon: alertIconWarn,  //Warning icon
			nType: alertTypeYesNo, // Yes, No
			cTitle: "Add Fields " + smedVersionDate,
			oDoc: myTemplateDoc
		});

		if ( nButton === alertButtonNo ) {
			// User pressed "No" so stop script
			return myTemplateDoc.info.Title;
		}
	}

	if (myTemplateDoc.numPages < 2) {
		myTempMsg  = "There is only one page in this AML document. You should " ;
		myTempMsg += "locate and append a PDF proof file now" ;

		nTempButton = app.alert ({
			cMsg: myTempMsg,
			nIcon: alertIconWarn,  //Warning icon
			nType: alertTypeOKCancel, // Type 1 has OK, Cancel
			cTitle: "Append " + smedVersionDate,
			oDoc: myTemplateDoc
		});

		// nTempButton is 4 = Yes, 3 = No, 2 = Cancel
		if ( nTempButton === 2 ) {
			return "smed_addTemplateAsWatermark User Cancelled";	// User pressed "Cancel" so stop script
		}
		if ( nTempButton === 3 ) {
			return "smed_addTemplateAsWatermark User Cancelled";	// User pressed "No" so stop script
		}
		if ( nTempButton === 4 ) { // User pressed "Yes" so add pages to end of document

			// TODO: Later when we fix the page numbering, we can automatically append the docs here.

			myInsertMsg  = "The 'Insert pages' command doesn't retain page numbering. " ;
			myInsertMsg += "Use 'smed_addAllPLFields', combine the PDFs manually, and then ";
			myInsertMsg += "run 'smed_restorePageLabels' to use hidden fields for page #. " + smedVersionDate ;
			app.alert ( myInsertMsg );

			return "smed_addTemplateAsWatermark Halted";
		}
	}

	/** Adobe's Device Independent File Path Format: */
	/** http://www.acrobatusers.com/tutorials/file-paths-acrobat-javascript */
	myAMLPath = smedPrefix + "Tech Services Dept/Working/AML Test - Darryl/References/AML_Template.pdf";

	try {
		myTemplateDoc.insertPages ({
			nPage: 0, // Insert after the first page
			cPath: myAMLPath
		});

	} catch (e) {

		myAlert  = "AML_Template.pdf must be openable in Acrobat. Looking here:";
		myAlert += "\r\r" + myAMLPath ;
		app.alert ( myAlert + e + ", " + smedVersionDate);
		console.println ( myAlert + e + ", " + smedVersionDate );
		return "smed_addTemplateAsWatermark "+ e; // Error, we can't do anything without the template page!
	}

	// Convert the first page to a template
	myAMLTemplate = myTemplateDoc.createTemplate ({
		cName: "smed_AMLTemplate",
		nPage: 0 
	});

	// Overlay first page (template) onto second page. This will copy
	// all existing fields on page 0 to page 1.
	// The signature fields don't overlay, so make page 0 be the template
	// and page 1 be the base! Crazy.
	myAMLTemplate.spawn ({
		nPage: 1,
		bRename: false,
		bOverlay: true 
	});

	// Remove the template page when finished
	myTemplateDoc.removeTemplate ("smed_AMLTemplate");

	// Remove the template page leaving our composite
	myTemplateDoc.deletePages ({
		nStart: 0
	});
}


/////////////////
//             //
//    SMALL    //
//  UTILITIES  //
//             //
/////////////////


/**
 * Gets name of front doc
 * @returns     {string}  Name of frontmost doc
 */
// function _smed_frontDoc() {
//   return path.split('/').pop();
// }


/**
 * Check if any docs are open AND this.disclosed=true.
 * Folder-level JavaScripts can't find undisclosed docs, while
 * document-level JavaScripts from menu buttons can find them all.
 * @returns   {boolean}    TRUE if more than one doc is open
 */
// function _smed_docsPresent() {
//   return app.activeDocs.length > 0;
// }


/**
 * From among all open docs, get the Doc object
 * handle for a particular disclosed doc (by name)
 * @param     {string}  docName   Document name
 * @returns   {doc}     Document Object
 */
// function _smed_getDocObjectFromName(docName) {
//	for ( var i = 0, d=app.activeDocs; i < d.length; i += 1 ) {
//		if (d[i].path.split("/").pop() === docName) {
//			return d[i];
//		}
//	}
//	return null;
// }
//

/**
 * Gets Document from disclosed filename regular expression:
 * @param	{RegEx} docNameRegEx	The Regular Expression to use to find the document name
 * @returns	{doc}	Document Object
 */
function _smedGetHandle(docNameRegEx) {
	var myDocs = app.activeDocs, i = 0;
	for ( i = 0; i < myDocs.length; i += 1 ) {
		if ( myDocs[i].path.match ( docNameRegEx ) ) {
			return myDocs[i];
		}
	}
	return null;
}


/**
 * Brings any AML PDFs forward
 */
function _smed_bringAMLForward() {
	var myDoc = _smedGetHandle(".{3}[P4][C0]-\d{4}-\d{2,3}[a-zA-Z]\.pdf");

	// If an AML PDF is open, bring it to front:
	if ( myDoc ) {
		myDoc.bringToFront();
	}
}


//////////////////
//              //
//  MENU ITEMS  //
//              //
//////////////////


/**
 * Checks whether the menu items are enabled or not.
 * @param      {Doc}   myDoc    Document to validate
 * @returns    False if "myDoc" is in the list of open documents
 */
function smed_validate( myDoc ) {
	var d = app.activeDocs, m = true, i = 0;

	for (i = 0; i < d.length; i+=1) {
		if ( d[i].info.Title === myDoc ) {
			m = false;
		}
	}
	return m;
}


/**
 * Handy container function to add all menu items
 * CHANGED 2017-04-05 D. Zurn: Added Agile to smedPNRegEx (above), added Agile button
 * UPDATE, 2012-03-15 D. Zurn: In Acro X, menu items are in "Plug-in Add-on Tools" pane.
 * CHANGED 2008-03-13 D. Zurn: Add toolbar button
 */
function smed_addMenus() {

	// Add a menu item labeled "Smiths Medical AML" for AML menu items to follow
	app.addSubMenu ({
		cName:   "AML",
		cUser:   "Smiths Medical AML",
		cParent: "Tools",
		nPos:    0
		} );

	// Add separator after our AML menu
	app.addMenuItem ({
		cParent: "Tools",
		cName:   "-",
		cExec:   "",
		nPos:    0
		});

	// Add menu items
	app.addMenuItem ({
		cName:   "UsePNForPage",
		cUser:   "Use Part Number as page number",
		cParent: "AML",
		cEnable: "event.rc = (event.target !== null);",
		cExec:   "smed_setPageLabelsRegExp ( this, smedPNRegEx );",
		nPos:    0
		});

	app.addMenuItem ({
		cName:   "UseREFForPage",
		cUser:   "Use REF Number as page number",
		cParent: "AML",
		cEnable: "event.rc = (event.target !== null);",
		cExec:   "smed_setPageLabelsRegExp ( this , smedREFRegEx );",
		nPos:    1
		});

	app.addMenuItem ({
		cName:   "UseAgileForPage",
		cUser:   "Use Agile number as page number",
		cParent: "AML",
		cEnable: "event.rc = (event.target !== null);",
		cExec:   "smed_setPageLabelsRegExp ( this , smedAgileRegEx );",
		nPos:    2
		});

	app.addMenuItem ({
		cName:   "UsePCForPage",
		cUser:   "Use PC Code as page number",
		cParent: "AML",
		cEnable: "event.rc = (event.target !== null);",
		cExec:   "smed_setPageLabelsRegExp ( this, smedPCRegEx );",
		nPos:    3
		});

	app.addMenuItem ({
		cName:   "Use40ForPage",
		cUser:   "Use 40- number as page number",
		cParent: "AML",
		cEnable: "event.rc = (event.target !== null);",
		cExec:   "smed_setPageLabelsRegExp ( this, smed40RegEx );",
		nPos:    4
		});

	app.addMenuItem ({
		cName:   "RestorePageLabels",
		cUser:   "Use hidden fields for page labels",
		cParent: "AML",
		cEnable: "event.rc = (event.target !== null);",
		cExec:   "smed_restorePageLabels ( this );",
		nPos:    5
		});

	app.addMenuItem ({
		cName:   "-",
		cParent: "AML",
		cExec:   "",
		nPos:    6
		});

	app.addMenuItem ({
		cName:   "SplitToAMLFolder",
		cUser:   "Split to 'AML Test' folder",
		cParent: "AML",
		cEnable: "event.rc = (event.target !== null);",
		cExec:   "smed_splitToFolders ( this, 'AML', '-actual.pdf' );",
		nPos:    7
	});

	app.addMenuItem ({
		cName:   "SplitToM2DPDFFolder",
		cUser:   "Split to M2D PDF folder",
		cParent: "AML",
		cEnable: "event.rc = (event.target !== null);",
		cExec:   "smed_splitToFolders ( this, 'M2D', '.pdf' );",
		nPos:    8
	});

	app.addMenuItem ({
		cName:   "SplitToCoversheetFolder",
		cUser:   "Split to Coversheet folder",
		cParent: "AML",
		cEnable: "event.rc = (event.target !== null);",
		cExec:   "smed_splitToFolders ( this, 'COV', '.pdf' );",
		nPos:    9
	});

	app.addMenuItem ({
		cName:   "ValidateAMLPDF",
		cUser:   "Validate AML PDF",
		cParent: "AML",
		cEnable: "event.rc = !(smed_validate ('Blank AML Form.pdf'));",
		cExec:   "smed_validateAML ( this );",
		nPos:    10
	});

	app.addMenuItem ({
		cName:   "-",
		cParent: "AML",
		cExec:   "",
		nPos:    11
		});

	app.addMenuItem ({
		cName:   "AddPLFields",
		cUser:   "Add Page Label fields",
		cParent: "AML",
		cEnable: "event.rc = (event.target !== null);",
		cExec:   "smed_addAllPLFields ( this );",
		nPos:    12
	});

	app.addMenuItem ({
		cName:   "AddTemplateAsWatermark",
		cUser:   "Add AML Signature and Copy fields",
		cParent: "AML",
		cEnable: "event.rc = (event.target !== null);",
		cExec:   "smed_addTemplateAsWatermark ( this );",
		nPos:    13
	});

	app.addMenuItem ({
		cName:   "AMLCoversheet",
		cUser:   "Blank AML Form",
		cParent: "AML",
		nPos:    14,
		cEnable: "event.rc = !smed_validate ( 'Blank AML Form.pdf' );",
		cExec:   "app.openDoc(smedPrefix + '/Tech Services Dept/Working/Work Instructions/AML - Approved Master Label/Blank AML Form.pdf');"
	});

	app.addMenuItem ({
		cName:   "CreateAMLCoversheets",
		cUser:   "Create AML coversheets",
		cParent: "AML",
		nPos:    15,
		cEnable: "event.rc = true",
		cExec:   "smed_createCOVSheets() ;"
	});

	app.addMenuItem ({
		cName:   "SignAsCertified",
		cUser:   "Sign as Certified Document",
		cParent: "AML",
		cEnable: "event.rc = (event.target !== null && event.target.getField('AMLSignature') !== null);",
		cExec:   "smed_signAsCertifiedDoc ( this );",
		nPos:    16
	});

	app.addMenuItem ({
		cName:   "-",
		cParent: "AML",
		cExec:   "",
		nPos:    17
	});

	app.addMenuItem ({
		cName:   "AMLVersion",
		cUser:   smedAMLUtilVersion,
		cParent: "AML",
		cEnable: "event.rc = false",
		cExec:   "",
		nPos:    18
	});

	app.addMenuItem ({
		cName:   "ResetHelp",
		cUser:   "Reset Help Dialogs",
		cParent: "AML",
		cEnable: "event.rc = (myHelp.pageHelp.bAfterValue || myHelp.splitHelp.bAfterValue )",
		cExec:   "myHelp.pageHelp.bAfterValue = false; myHelp.splitHelp.bAfterValue = false ; " ,
		nPos:    19
	});


	// Add various Javascript and PDF reference documents to Help menu
	app.addSubMenu ({
		cName:   "JSHelp",
		cUser:   "JavaScript Help",
		cParent: "Help",
		nPos:    1
	});

	app.addMenuItem ({
		cName:   "JSGuide",
		cUser:   "JavaScript Guide",
		cParent: "JSHelp",
		nPos:    0,
		cEnable: "event.rc = smed_validate ('Acrobat JavaScript Scripting Guide');",
		cExec:   "app.openDoc(smedAcroPath + 'AcroJSGuide.pdf');"
	});

	app.addMenuItem ({
		cName:   "JSRef",
		cUser:   "JavaScript Reference",
		cParent: "JSHelp",
		nPos:    1,
		cEnable: "event.rc = smed_validate ('JavaScript for Acrobat  API Reference');",
		cExec:   "app.openDoc(smedAcroPath + 'js_api_reference.pdf');"
	});

	app.addMenuItem({
		cName:   "PDFRef",
		cUser:   "PDF Reference 1.7",
		cParent: "JSHelp",
		nPos:    2,
		cEnable: "event.rc = smed_validate ('PDF Reference, version 1.7');",
		cExec:   "app.openDoc( smedAcroPath + 'pdf_reference17-extract.pdf' );"
	});

	app.addMenuItem({
		cName:   "CoreJS",
		cUser:   "Core JavaScript 1.6",
		cParent: "JSHelp",
		nPos:    3,
		cEnable: "event.rc = smed_validate ('Core JavaScript Guide');",
		cExec:   "app.openDoc(smedAcroPath + 'jslangguide.pdf');"
	});

	/** URL for AML Utilities documentation, to open in a browser */
	app.addMenuItem ({
		cName:   "LaunchAMLHelp",
		cUser:   "Documentation for AML Utilities",
		cParent: "JSHelp",
		cExec:   "smed_launchURL('file:///' + smedAcroPath + '/documentation/_01.html');",
		nPos:    4
	});

}


/**
 * 2012-08-13 D. Zurn: Added M2D Icon to toolbar button
 * 2009-07-27 D. Zurn: Added "Btn" to button names to distinguish from menu items
 * 2008-11-20 D. Zurn: Changed "Restore" to "Hidden field" menu item
 * 2008-03-13 D. Zurn: Add all toolbar items
 */
function smed_addButtons() {

	// Add menu items
	app.addToolButton ({
		cName:     "UsePNForPageBtn",
		cLabel:    "PC,40->pg#",
		cTooltext: "PC- or 40- part # -> page labels",
		cEnable:   "event.rc = (event.target !== null);",
		cExec:     "smed_setPageLabelsRegExp ( this, smedPNRegEx );",
		nPos:      0
		});

	app.addToolButton ({
		cName:     "UseREFForPageBtn",
		cLabel:    "REF->pg#",
		cTooltext: "Reorder # -> page labels",
		cEnable:   "event.rc = (event.target !== null);",
		cExec:     "smed_setPageLabelsRegExp ( this , smedREFRegEx );",
		nPos:      1
		});

	app.addToolButton ({
		cName:     "UseAgileForPageBtn",
		cLabel:    "Agile->pg#",
		cTooltext: "Agile PN -> page labels",
		cEnable:   "event.rc = (event.target !== null);",
		cExec:     "smed_setPageLabelsRegExp ( this , smedAgileRegEx );",
		nPos:      2
		});

	app.addToolButton ({
		cName:     "UsePCForPageBtn",
		cLabel:    "PC->pg#",
		cTooltext: "PC Code -> page labels",
		cEnable:   "event.rc = (event.target !== null);",
		cExec:     "smed_setPageLabelsRegExp ( this, smedPCRegEx );",
		nPos:      3
		});

	app.addToolButton ({
		cName:     "Use40ForPageBtn",
		cLabel:    "40-xxxx ->pg#",
		cTooltext: "40- number -> page labels",
		cEnable:   "event.rc = (event.target !== null);",
		cExec:     "smed_setPageLabelsRegExp ( this, smed40RegEx );",
		nPos:      4
		});

	app.addToolButton ({
		cName:     "RestorePageLabelsBtn",
		cLabel:    "Restore pg#",
		cTooltext: "Hidden fields -> page labels",
		cEnable:   "event.rc = (event.target !== null);",
		cExec:     "smed_restorePageLabels ( this );",
		nPos:      5
		});

	app.addToolButton ({
		cName:     "SplitToAMLFolderBtn",
		cLabel:    "Split->AML",
		cTooltext: "Split to 'AML Test' Folder",
		cEnable:   "event.rc = (event.target !== null);",
		cExec:     "smed_splitToFolders ( this, 'AML', '-actual.pdf' );",
		nPos:      6
	});

	var myM2DIconDoc, oM2DIcon;

	// Open M2D Icon PDF
	//myM2DIconDoc = smed_openPDF({ myPDFtoOpen: smedAcroPath + 'M2D.pdf', hiddenTrueFalse: true});

	// import icon (20x20 pixels) from the file specified
	//this.importIcon("myM2DIcon", smedAcroPath + "M2D 20x20.png", 0);

	// convert the icon to a stream from "myM2DIcon" already in M2D Icon PDF
	//oM2DIcon = util.iconStreamFromIcon(myM2DIconDoc.getIcon('myM2DIcon'));

	// close the temp doc now that we have grabbed the icon stream
	//app.beginPriv();
	//myM2DIconDoc.closeDoc(true);
	//app.endPriv();

	app.addToolButton ({
		cName:     "SplitToM2DFolderBtn",
		cLabel:    "Split->M2DPDF",
//		oIcon:     oM2DIcon,
		cTooltext: "Split to M2D PDF Folder",
		cEnable:   "event.rc = (event.target !== null);",
		cExec:     "smed_splitToFolders ( this, 'M2D', '.pdf' );",
		nPos:      7
	});
	app.addToolButton ({
		cName:     "SplitToDropFolderBtn",
		cLabel:    "Split->Dropbox",
//		oIcon:     oM2DIcon,
		cTooltext: "Split to DZ Dropbox PDF Folder",
		cEnable:   "event.rc = (event.target !== null);",
		cExec:     "smed_splitToFolders ( this, 'Drop', '.pdf' );",
		nPos:      8
	});

	app.addToolButton ({
		cName:     "SplitToCoversheetFolderBtn",
		cLabel:    "Split->COV",
		cTooltext: "Split to corresponding Coversheet folder",
		cEnable:   "event.rc = (event.target !== null);",
		cExec:     "smed_splitToFolders ( this, 'COV', '.pdf' );",
		nPos:      9
	});

	app.addToolButton ({
		cName:     "ValidateAMLPDFBtn",
		cLabel:    "ValidateAML",
		cTooltext: "Run the AML Validation on this PDF",
		cEnable:   "event.rc = !(smed_validate ('Blank AML Form.pdf'));",
		cExec:     "smed_validateAML ( this );",
		nPos:      10
	});

	app.addToolButton ({
		cName:     "AddPLFieldsBtn",
		cLabel:    "Add Pg fields",
		cTooltext: "Add all Page Label fields",
		cEnable:   "event.rc = (event.target !== null && this.getField('smedPageLabel'));",
		cExec:     "smed_addAllPLFields ( this );",
		nPos:      11
	});

	/** URL for AML Utilities documentation, to open in a browser */
	app.addToolButton ({
		cName:     "LaunchAMLHelpBtn",
		cLabel:    "Docs",
		cTooltext: "Web page to document and explain the AML Utilities",
		cExec:     "smed_launchURL('file:///' + smedAcroPath + '/documentation/_01.html');",
		nPos:      12
	});

	app.addToolButton ({
		cName:     "ResetHelpBtn",
		cLabel:    "Reset Help",
		cTooltext: "Reset the Help dialogs to explain commands",
		cEnable:   "event.rc = (myHelp.pageHelp.bAfterValue || myHelp.splitHelp.bAfterValue )",
		cExec:     "myHelp.pageHelp.bAfterValue = false; myHelp.splitHelp.bAfterValue = false ; " ,
		nPos:      13
	});

	app.addToolButton ({
		cName:     "AMLVersionBtn",
		cLabel:    smedVersionDate,
		cMarked:   "event.rc = true",
		cTooltext: "Version of AML Utilities loaded",
		cEnable:   "event.rc = false",
		cExec:     "",
		nPos:      14
	});

}

if (smedDEBUG) { console.println( "Adding Menus..." ); }
// Now add all the menu commands
smed_addMenus();

if (smedDEBUG) { console.println( "Adding Toolbar buttons..." ); }
// Now add all the toolbar buttons
smed_addButtons();

if (smedDEBUG) { console.println( "Startup finished." ); }
