#!/bin/zsh

#
# ________/\\\\\\\\\\\\\\\_____/\\\\\\\\\\\____/\\\________/\\\_____________________________
#  _______\////////////\\\____/\\\/////////\\\_\/\\\_______\/\\\_____________________________
#   _________________/\\\/____\//\\\______\///__\/\\\_______\/\\\_____________________________
#    _______________/\\\/_______\////\\\_________\/\\\\\\\\\\\\\\\__/\\/\\\\\\\______/\\\\\\\\_
#     _____________/\\\/____________\////\\\______\/\\\/////////\\\_\/\\\/////\\\___/\\\//////__
#      ___________/\\\/_________________\////\\\___\/\\\_______\/\\\_\/\\\___\///___/\\\_________
#       _________/\\\/____________/\\\______\//\\\__\/\\\_______\/\\\_\/\\\_________\//\\\________
#        __/\\\__/\\\\\\\\\\\\\\\_\///\\\\\\\\\\\/___\/\\\_______\/\\\_\/\\\__________\///\\\\\\\\_
#         _\///__\///////////////____\///////////_____\///________\///__\///_____________\////////__
#

# .zshrc Portable
# for zsh 3.1.6 and newer (may work OK with earlier versions)
#
# by Darryl Zurn
#
# Best viewed in TextMate Shell folding mode.
# (That's what all the
# {{{ and # }}} are for.)
#
# FIXME: figure out directory completion test in a script for function WICO
# FIXME: Create a unified version for both Cygwin and Mac paths.
#
# Modified 2022-01-09 D. Zurn: Yay, MacBook! Added Sublime alias
# Modified 2015-08-20 D. Zurn: Promoted Portable version to .zshrc cross-platform
#                              Massive change to use $OSTYPE for correct path to network shares.
# Modified 2015-07-28 D. Zurn: New version for Cygwin and Mac OS portability
# Modified 2015-05-29 D. Zurn: Fixed the CASE statement in LLS function
# Modified 2015-03-19 D. Zurn: Added function retrieving Ashford's Label Layout Sheets based on WICO function.
# Modified 2015-01-12 D. Zurn: Remove _actual from end of basename with %% construct
# Modified 2015-01-07 D. Zurn: Added Xfer Docs location for pending WICOs
# Modified 2014-04-28 D. Zurn: Changed /6_Work_Instructions to /06_Work_Instructions **throughout**
#                              Same for 07_WICO...
# Modified 2014-03-04 D. Zurn: alias c='checkamldir'
# Modified 2014-01-02 D. Zurn: Add WICO/ECO decoder
# Modified 2013-11-11 D. Zurn: Replace em-dash with regular dash
# Modified 2013-03-21 D. Zurn: Clarified ##ART# comments throughout, checked that _Rev102 works as expected.
# Modified 2013-01-28 D. Zurn: Added Red color to all 'Not Found' errors
# Modified 2013-01-09 D. Zurn: Updated artfiles text to 'Art folder located' instead of 'created'
# Modified 2012-11-30 D. Zurn: Added make_alias function, tnx to hayne.net. Added Bold/red to print statements
# Modified 2012-10-02 D. Zurn: Added OPENART function
# Modified 2012-09-06 D. Zurn: Changed "ART Files" to "Art Files"
# Modified 2012-04-13 D. Zurn: CHECKAMLDIR will now CD to last valid directory
# Modified 2012-01-09 D. Zurn: Added "figlet -o -f isometric2 zsh"
# Modified 2011-12-22 D. Zurn: Added Big ZSH when done.
# Modified 2011-10-24 D. Zurn: Updated wording for "ARTFILES"
# Modified 2011-10-14 D. Zurn: "amlcheck" restored to original operation
# Modified 2011-09-14 D. Zurn: Updated ARTFILES to add "--recursive" flag to cp command, added zstyle coloring
# Modified 2011-07-20 D. Zurn: Added CHECKAMLDIR command
# Modified 2011-06-07 D. Zurn: Help text updated
# Modified 2011-05-03 D. Zurn: Updated AMLART help text
# Modified 2011-03-24 D. Zurn: Added FDK paths
# Modified 2010-11-29 D. Zurn: Fixed for R: drive changing to Y: drive, without warning
# Modified 2010-09-29 D. Zurn: Added interactive check to AMLART.
# Modified 2010-09-23 D. Zurn: Added "zstyle" special-folder completions
# Modified 2010-09-17 D. Zurn: Added openAMLFolder, worked first time ;)  Added ZLE coloring
# Modified 2010-08-23 D. Zurn: Fixed $newdir problem in AMLCHECK
# Modified 2010-08-19 D. Zurn: Added ARTFILES, modified other funcs to remove extra stuff after " " in filenames
# Modified 2010-08-02 D. Zurn: AMLART now reports if ART file exists instead of overwriting.
# Modified 2010-07-28 D. Zurn: Added "amlopen" function to display all listed AMLs
# Modified 2010-07-13 D. Zurn: alias isodate='date --rfc-3339=seconds '
# Modified 2010-04-20 D. Zurn: Added "coversheets" function
# Modified 2010-03-30 D. Zurn: Added smarts to dt function
# Modified 2010-03-11 D. Zurn: Fixed usage lines
# Modified 2010-02-24 D. Zurn: Added DiskTracker CD command
# Modified 2010-02-23 D. Zurn: to add better TIME format and PUSHD automation
# Modified 2010-02-02 D. Zurn: Added "--human-readable" to 'lsa'
# Modified 2009-08-31 D. Zurn: Added FDK path
# Modified 2009-08-05 D. Zurn: cut at cifs instead of nodev for Leopard
# Modified 2009-06-26 D. Zurn: Expanded AMLDIR and AMLART. Wrote out PATH and MANPATH
# Modified 2009-06-25 D. Zurn: Fixed cd command in AMLDIR and AMLART to follow basename definition!
# Modified 2009-05-01 D. Zurn: Modified AMLDIR and AMLART to allow 40- or PC- directories
# Modified 2009-04-24 D. Zurn: Updated amlart to preserve attributes and interact before overwriting
# Modified 2009-02-16 D. Zurn: Added color to function usage
# Modified 2009-02-12 D. Zurn: Added "amlart" function, updated "amldir"
# Modified 2008-09-26 D. Zurn: Added cdpath, amldir function
# Modified 2008-09-23 D. Zurn: Increased history sizes to 12000 commands
# Modified 2008-08-04 D. Zurn: Expanded HISTORY sizes, other additions from Adam Spiers .zshrc
# Modified 2008-07-29 D. Zurn: exiftool
# Modified 2008-02-27 D. Zurn: aliases for gcalcli
# Modified 2008-02-22 D. Zurn: add Python path info so gcalcli can work.

# {{{ Loading status
function zshrc_load_status () {
  echo -n "\r.zshrc load: $* ... \e[0K"
}

# }}}

if [[ $OSTYPE = cygwin ]] ;
then
	zshrc_load_status 'cygwin'
	myFiles="/cygdrive/w/Medical/" 
elif [[ $OSTYPE =~ ^darwin ]] ;
then
	zshrc_load_status 'Darwin'
fi

zshrc_load_status 'setting options'

# Modified 2010-08-20 D. Zurn: If path is a directory, CD to there, otherwise to the parent. Enhanced error msg.
# Modified 2010-03-30 D. Zurn: Allow backslashes as well as colons
# Modified 2010-02-24 D. Zurn: Added DiskTracker CD command
# Input is            "Tech Services Dept:Working:Work Instructions: ... :PC-2906-24C_Rev100:ARTPC-2906-24C_Rev100.pdf"
# cd goes to "/Volumes/Tech Services Dept/Working/Work Instructions/ ... /PC-2906-24C_Rev100/"
# zsh p41:  "${name//pattern/repl}"  Replace the longest possible match of "pattern" by string "repl", all occurrences
# zsh p37:  ":h" Removes a trailing pathname component, leaving the head. This works like ëdirnameí.
function dt () {
	scriptname=$terminfo[bold]$fg[${(L)RED}]$0:t:r$terminfo[sgr0]

	if [[ -z $1 ]] ;
	then
		print $scriptname' "Tech Services Dept:Working:Work Instructions:PC-2906-24C_Rev100:ARTPC-2906-24C_Rev100.pdf"'
	elif [[ $OSTYPE = cygwin ]] ;
	then
		print $scriptname' not working on Windows.'
	else
		#  ${1//[\\:]/\/}  Replace all occurrences of a colon or a backslash with a regular slash.
		# backslash has to be escaped ("\\") in the search field, but not in the replace field.
		try_this='/Volumes/'${1//[\\:]/\/}

		if [[ -d $try_this ]] ;
		then
			cd ${try_this}
		elif [[ -d ${try_this:h} ]];
		then
			cd ${try_this:h}
		else
			print $scriptname': [Parent directory not found or volume not mounted:] '$try_this
		fi
	fi
}


# Added 2010-02-23 D. Zurn, to add better TIME format and PUSHD automation

export TIMEFMT=$'\nreal\t%E\nuser\t%U\nsys\t%S'

setopt  auto_cd      \
        no_clobber    \
        list_types     \
        auto_pushd      \
        pushd_to_home    \
        pushd_ignore_dups \


# Added 2008-02-22 D. Zurn to add Python path info so gcalcli can work.
# Still can't figure out if I need to symlink "python" to "python2.5"
export PYTHONPATH=$PYTHONPATH:/home/mpaudzurnlocal/svn/gdata-python-client/src

setopt CORRECT AUTO_MENU AUTO_LIST

export CLICOLOR=1
export LSCOLORS="ExGxFxdxCxDxDxhbadExEx"
#ExGxFxdxCxDxDxhbadExEx

# {{{ ZLE coloring

zshrc_load_status 'zle coloring'

# ------------------------------------------------------------------------------
# Fish style live command coloring.
# http://ethercodes.com/zDUmDAuWiV
# ------------------------------------------------------------------------------

ZLE_RESERVED_WORD_STYLE='fg=magenta,bold'
ZLE_ALIAS_STYLE='fg=cyan,bold'
ZLE_BUILTIN_STYLE='fg=yellow,bold'
ZLE_FUNCTION_STYLE='fg=green,bold'
ZLE_COMMAND_STYLE='fg=blue,bold'
ZLE_COMMAND_UNKNOWN_TOKEN_STYLE='fg=red,bold'

function colorize-zle-buffer() {
	colorize=true
	start_pos=0
	for arg in ${(z)BUFFER}; do
		((end_pos=$start_pos+${#arg}+1))
		if $colorize; then
			colorize=false
			res=$(LC_ALL=C builtin type $arg 2>/dev/null)
			case $res in
				*'reserved word'*)  style=$ZLE_RESERVED_WORD_STYLE;;
				*'an alias'*)       style=$ZLE_ALIAS_STYLE;;
				*'shell builtin'*)  style=$ZLE_BUILTIN_STYLE;;
				*'shell function'*) style=$ZLE_FUNCTION_STYLE;;
				*"$cmd is"*)        style=$ZLE_COMMAND_STYLE;;
				*)                  style=$ZLE_COMMAND_UNKNOWN_TOKEN_STYLE;;
			esac
			region_highlight+=("$start_pos $end_pos $style")
		fi
		if [[ $arg = '|' ]] || [[ $arg = 'sudo' ]]; then
			colorize=true
		fi
		start_pos=$end_pos
	done
}

function colorize-hook-self-insert() { builtin zle  .self-insert  &&  colorize-zle-buffer }

function colorize-hook-backward-delete-char() { builtin zle  .backward-delete-char  &&  colorize-zle-buffer }

## zle -N  self-insert  colorize-hook-self-insert
## zle -N  backward-delete-char  colorize-hook-backward-delete-char
# }}}

# {{{ zsh completions

zshrc_load_status 'completion system'

autoload -U compinit
compinit

zstyle ':completion:*' special-dirs true
# From zsh-users list to show completions in reverse-video
zstyle -e ':completion:*:default' list-colors 'reply=("=(#b)${words[CURRENT]:t}(*)=0=7")'

# }}}

# {{{ zsh mime setup

zshrc_load_status 'mime setup'

autoload -U zsh-mime-setup
zsh-mime-setup

# }}}

# {{{ Path

zshrc_load_status 'setting paths'


# Added 2011-03-24 D. Zurn
# Initialization for FDK command line tools. Thu Mar 24 11:53:59 2011
export FDK_EXE="/Users/dzurnlocal/bin/FDK/Tools/osx"

# Added 2009-08-31 FDK path
# Added 2011-09-15 GIT path
export PATH="/usr/local/git/bin:/bin/FDK/Tools/osx:/usr/local/bin:/usr/local/sbin:/sw/bin:/sw/sbin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/X11/bin:/usr/X11R6/bin:$HOME/bin/FDK/Tools/osx"
export MANPATH="/usr/local/man:/sw/share/man:/usr/share/man:/usr/local/share/man:/usr/X11/man:/sw/lib/perl5/5.8.8/man:/usr/X11R6/man"

# Added 2008-09-23 cdpath
# Modified 2015-08-10 Removed MACTODOS
cdpath=(. ~/Documents )
export cdpath

# }}}

# {{{ Aliases

zshrc_load_status 'defining aliases'

# Added 2022-01-09 D. Zurn, Add Sublime Text command-line
alias sublime='/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl'

# Added 2015-07-28 D. Zurn, add alias for CYGWIN equivalent OPEN command
#   https://github.com/akiva/dotfiles/blob/7bd2133d9918179cb22c287d8ebbf114e4462544/bash/aliases
if [[ $OSTYPE == cygwin ]]; then
  alias open='cygstart'
fi

# Set Grep to output with colours.
#  https://github.com/akiva/dotfiles/blob/7bd2133d9918179cb22c287d8ebbf114e4462544/bash/aliases
alias grep='grep --color=auto'

# ----------------------------------------------------------------------
# Safety features
# ----------------------------------------------------------------------

# Interactive everyday commands
alias cp='cp -i'
alias mv='mv -i'
alias rm='rm -I'
alias ln='ln -i'

# Fail to operate recursively on '/'
alias chown='chown --preserve-root'
alias chmod='chmod --preserve-root'
alias chgrp='chgrp --preserve-root'


alias ls='ls --classify --color=always --sort=time --no-group'
alias lsa='ls --color --format=long --human-readable --almost-all --sort=time --no-group --classify'
alias dztab="cd /Volumes/RGAFAML/LOFTWARE/LABELS/ ; awk -F, -v OFS=\t '{print substr(FILENAME,1,length(FILENAME)-4)}' *.tab >~/Desktop/Tabs-to-FM.txt"
alias manopen='openman'

# Updated 2009-08-05 D. Zurn, cut at cifs instead of nodev for Leopard
alias dzmount="mount | grep Volumes | sed 's/^.*Volumes.//;s/.[ch]i*fs.*$//' | sort"
alias rgafcrush='/sw/bin/pngcrush -m 4 -directory /Volumes/RGAFAML/LOFTWARE/IMAGES/png/crush /Volumes/RGAFAML/LOFTWARE/IMAGES/png/*.png'

# Added 2008-02-27 D. Zurn, aliases for gcalcli
alias g='python2.4 /usr/local/bin/gcalcli --border-color=blue '
alias q='python2.4 /usr/local/bin/gcalcli quick '
alias agenda='python2.4 /usr/local/bin/gcalcli agenda '

# Added 2008-07-29
alias alldates='exiftool -alldates -filemodifydate -d "%b %d %Y %I:%M %p %Z"'
alias allgps='exiftool -alldates -filemodifydate -d "%b %d %Y %I:%M %p %Z" -GPSLatitude -GPSLatitudeRef -GPSLongitude -GPSLongitudeRef -GPSAltitude -GPSAltitudeRef -GPSDateStamp -GPSTimeStamp -XMP:Geotime -XMP:GPSLatitude -XMP:GPSLongitude -XMP:GPSAltitude -XMP:GPSAltitudeRef -XMP:GPSDateTime'
alias modifydate='exiftool "-DateTimeOriginal>FileModifyDate"'

# Modified 2011-09-14
alias isodate='date --rfc-3339=seconds '
alias isoD='date --rfc-3339=seconds '
# }}}

# {{{ Functions

zshrc_load_status 'defining functions'

# Modified 2011-10-14 D. Zurn: remove AML check
# Modified 2011-08-03 D. Zurn: now will check multiple AMLs on the same command line
# Modified 2010-09-30 D. Zurn: If found, will report existence of AML in "Document Control/AML"
# Modified 2010-08-20 to check intermediate directories, will CD as close as it can.
#   ":t:r" will remove the extension and remove the filepath from the filename.
#   "[(ws: :)1]" will split the argument at the space and select the first word.
#     This cuts off extra text after the PC code.
# ##ART# will remove ART from the filename if it appears.
# Written  2010-03-22 D. Zurn
function amlcheck () {
	if [[ -z $1 ]];
	then
		print 'Usage: '$terminfo[bold]$fg[${(L)RED}]$0' \[/Volumes/path/to/PC-xxxx-yyyA[_Rev101].pdf\]' $terminfo[sgr0]
		print ' Will cd to an existing AML directory, but will NOT create a directory. Will report if AML also'
		print ' exists in Document Control/06_Work_Instructions/AML folder'
		return 0
	fi

	scriptname=$terminfo[bold]$fg[${(L)RED}]$0:t:r$terminfo[sgr0]

	if   [[ $OSTYPE = cygwin ]] ; 
	then
		myTSD="/cygdrive/w/Medical/MPAU/Tech Services Dept"
		myDocControl="/cygdrive/w/Medical/MPAU2/Document Control"
	elif [[ $OSTYPE =~ ^darwin ]] ; 
	then
		myTSD="/Volumes/Tech Services Dept"
		myDocControl="/Volumes/Document Control"
	fi

	if [[ -d $myTSD'/Working/Work Instructions/AML - Approved Master Label/' ]] ;
	then
		while [[ -n $1 ]] ;
		do
			newfile=$1
			# This collects JUST the filename without suffix or path, and takes off "COV" or "ART" at the start of the filename
			#   ":t:r" will remove the extension and remove the filepath from the filename.
			#   "[(ws: :)1]" will split the argument at the space and select the first word.
			#     This cuts off extra text after the PC code.
			# ##ART# will remove ART from the filename if it appears. Same with ##COV#.
			basename=${${${${newfile:t:r}[(ws: :)1]}##ART#}##COV#}
			checkme=$myTSD'/Working/Work Instructions/AML - Approved Master Label/'$basename[1,2]'-XXXX'

			if [[ -d $myTSD'/Working/Work Instructions/AML - Approved Master Label/' ]]; then
				if [[ -d $checkme ]]; then
					# cd to the proper XXXX upper-level directory
					cd $checkme
					newparent=${${basename[(ws:_:)1]}[1,-2]}'/'

					if [[ -d $newparent ]]; then
						cd $newparent
						if [[ -d $basename ]]; then
							cd $basename
						else
							print $scriptname': Directory '$terminfo[bold]$fg[${(L)RED}]'not found'$terminfo[sgr0]': ['$basename']'
						fi
					else
						print $scriptname': Directory '$terminfo[bold]$fg[${(L)RED}]'not found'$terminfo[sgr0]': ['$newparent']'
					fi

				# Failed the checkme test
				else
					print $scriptname': Not a PC code or 40- number: ['$1']'
				fi

			# Failed the AML directory check
			else
				print $scriptname': AML directory not available on "Tech Services Dept/Working/Work Instructions/AML..."'
			fi

			if [[ -d $myDocControl'/06_Work_Instructions/AML/' ]]; then

				checkmeTS=$myDocControl'/06_Work_Instructions/AML/'$basename[1,2]'-XXXX'
				if [[ -d $checkmeTS ]]; then
					# cd to the proper XXXX upper-level directory
					cd $checkmeTS
					AMLtoOpenTS='AML'$basename'.pdf'

					if [[ -a $AMLtoOpenTS ]];
					then
						print $scriptname': AML exists in Document Control/06_Work_Instructions/AML: ['$AMLtoOpenTS']'
					else
						print $scriptname': AML '$terminfo[bold]$fg[${(L)RED}]'not found'$terminfo[sgr0]' in Document Control/06_Work_Instructions/AML: ['$AMLtoOpenTS']'
					fi
				fi

			# Failed the Tech Services AML directory check
			else
				print $scriptname': AML directory not available on "Document Control/06_Work_Instructions/AML/..."'
			fi
			shift 1
		done
	else
		print $scriptname': AML directory not available on "Tech Services Dept/Working/Work Instructions/AML..."'
	fi
}

# Modified 2010-09-30 D. Zurn, Try to open AML on Document Control/06_Work_Instructions/AML
# Modified 2010-09-24 D. Zurn, fixed directory problem
# Modified 2010-08-20 D. Zurn, Remove extra text after PC code
# Written  2010-07-28 D. Zurn
function amlopen () {
	if [[ -z $1 ]];
	then
		print 'Usage: '$terminfo[bold]$fg[${(L)RED}]$0' \[/Volumes/path/to/PC-xxxx-yyyA[_Rev101].pdf\]' $terminfo[sgr0]
		print ' CD to and reports if there is an existing AML in "Tech Services Dept/Working/Work Instructions/AML...".'
		return 0
	fi

	scriptname=$terminfo[bold]$fg[${(L)RED}]$0:t:r$terminfo[sgr0]

	if   [[ $OSTYPE = cygwin ]] ;
	then
		myTSD="/cygdrive/w/Medical/MPAU/Tech Services Dept"
	elif [[ $OSTYPE =~ ^darwin ]] ;
	then
		myTSD="/Volumes/Tech Services Dept"
	fi

	newfile=$1
	# This collects JUST the filename without suffix or path, and takes off "COV" or "ART" at the start of the filename
	basename=${${${${newfile:t:r}[(ws: :)1]}##ART#}##COV#}
	checkme=$myTSD'/Working/Work Instructions/AML - Approved Master Label/'$basename[1,2]'-XXXX'

	if [[ -d $myTSD'/Working/Work Instructions/AML - Approved Master Label/' ]]; then
		while [[ -n $1 ]]; do
			if [[ -d $checkme ]]; then
				# cd to the proper XXXX upper-level directory
				cd $checkme
				# (ws:_:)
				newparent=${${basename[(ws:_:)1]}[1,-2]}'/'
				if [[ -d $newparent ]]; then
					newdir=$newparent$basename
					if [[ -d $newdir ]]; then
						cd $newdir
						AMLtoOpen='AML'$basename'.pdf'
						if [[ -a $AMLtoOpen ]]; then
							print $scriptname': AML in AML folder being opened: ['$AMLtoOpenTS']'
							open $AMLtoOpen
						else
							print $scriptname': AML '$terminfo[bold]$fg[${(L)RED}]'not found'$terminfo[sgr0]': ['$basename'.pdf]'
						fi
					else
						print $scriptname': Directory '$terminfo[bold]$fg[${(L)RED}]'not found'$terminfo[sgr0]': ['$basename']'
					fi
				else
					print $scriptname': Directory '$terminfo[bold]$fg[${(L)RED}]'not found'$terminfo[sgr0]': ['$newparent']'
				fi

			# Failed the checkme test
			else
				print $scriptname': Not a PC code or 40- number: ['$1']'
			fi
			shift 1
		done

	# Failed the AML directory check
	else
		print $scriptname': AML directory not available on "Tech Services Dept/Working/Work Instructions/AML..."'
	fi

	if [[ -d $myDocControl'/06_Work_Instructions/AML/' ]]; then

		checkmeTS=$myDocControl'/06_Work_Instructions/AML/'$basename[1,2]'-XXXX'
		if [[ -d $checkmeTS ]]; then
			# cd to the proper XXXX upper-level directory
			cd $checkmeTS

			AMLtoOpenTS='AML'$basename'.pdf'
			if [[ -a $AMLtoOpenTS ]];
			then
				print $scriptname': AML in Document Control/06_Work_Instructions/AML being opened: ['$AMLtoOpenTS']'
				open $AMLtoOpenTS
			else
				print $scriptname': AML '$terminfo[bold]$fg[${(L)RED}]'not found'$terminfo[sgr0]': ['$AMLtoOpenTS']'
			fi
		fi

	# Failed the Tech Services AML directory check
	else
		print $scriptname': AML directory not available on "Document Control/06_Work_Instructions/AML/..."'
	fi

}

# Function to open WICO in corresponding Doc control Directory.
# Written 2014-04-28 D. Zurn
# Sample: wico "/Volumes/Document Control/07_Change_ Orders_Completed/WICOs 2013/PAU13-0286.pdf"
# /Volumes/Document Control/07_Change_ Orders_Completed/ECOs-1992/92-0001.pdf       ** First one with YY in ECO name **
# /Volumes/Document Control/07_Change_ Orders_Completed/ECOs-2012/12-0524.pdf       ** Last one with just YY **
# /Volumes/Document Control/07_Change_ Orders_Completed/ECOs-2012/PAUPCO12-0526.pdf ** 2012 finished with 0526.. **
# /Volumes/Document Control/07_Change_ Orders_Completed/WICOs 2013/PAU13-0003.pdf   ** 2013+ **
function wico () {
	if [[ -z $1 ]];
	then
		print 'Usage: '$terminfo[bold]$fg[${(L)RED}]$0' \[WICOorECONum\]' $terminfo[sgr0]
		print ' Opens WICO or ECO on Document Control corresponding to the text field passed as argument.'
		return 0
	fi

	if   [[ $OSTYPE = cygwin ]] ;
	then
		myTSD="/cygdrive/w/Medical/MPAU/Tech Services Dept"
		myDocControl="/cygdrive/w/Medical/MPAU2/Document Control"
		myTSP="/cygdrive/w/Medical/MPAU/Tech Services Public"
	elif [[ $OSTYPE =~ ^darwin ]] ;
	then
		myTSD="/Volumes/Tech Services Dept"
		myDocControl="/Volumes/Document Control"
		myTSP="/Volumes/Tech Services Public"
	fi

	wicoLocation=$myDocControl'/07_Change_ Orders_Completed/'

	scriptname=$terminfo[bold]$fg[${(L)RED}]$0:t:r$terminfo[sgr0]

	newfile=$1
	# This collects JUST the WICO number without suffix or path, and takes off "PAU" or "PAUPCO" at the start of the filename
	basename=${${${${newfile:t:r}[(ws: :)1]}##PAU#}##PCO#}

	# Determine $newfolder and $newprefix
	checkyear=$basename[1,2]
	newprefix=''
	if [[ $checkyear == 12 ]]; then
		newfolder='ECOs 1988 - 2012/ECOs-20'$checkyear
		newprefix=''
		if [[ $basename > '12-0524' ]]; then
			newprefix='PAUPCO'
		fi
	fi

	case $checkyear in
		(92|93|94|95|96|97|98|99)
				newfolder='ECOs 1988 - 2012/ECOs-19'$checkyear
				;;
		(00|01|02|03|04|05|06|07|08|09|10|11)
				newfolder='ECOs 1988 - 2012/ECOs-20'$checkyear
				;;
		(12)
		# Already determined in previous IF chain
				;;
		(13|14|15|16)
				newfolder='WICOs 20'$checkyear
				newprefix='PAU'
				;;
		(*)
				print $scriptname': YEAR not between 1992 and 2016 ['$basename']'
				return 0
	esac

	checkme=$wicoLocation$newfolder'/'$newprefix$basename


	if [[ -d $wicoLocation ]]; then
		# The WICO/ECO parent directory is available so figure out the proper filename
		while [[ -n $1 ]]; do
			if [[ -d $wicoLocation$newfolder ]]; then
				# Open the WICO/ECO
				cd $wicoLocation$newfolder
				WICOtoOpen=$newprefix$basename'.pdf'
				if [[ -a $WICOtoOpen ]]; then
					print $scriptname': WICO in WICO folder being opened: ['$WICOtoOpen']'
					open $WICOtoOpen
				else

					# Now try the pending WICO folder
					XferPath=$myTSP'/Xfer Docs/'$newprefix$basename

					# print 'debug: '$XferPath
					if [[ -d $XferPath* ]]; then
						# Open the pending folder on Xfer Docs
						print $scriptname': Pending WICO folder in '$terminfo[bold]$fg[${(L)RED}]'Xfer Docs'$terminfo[sgr0]' being opened: ['$newprefix$basename']'
						open $XferPath
						else
							# FIXME: Until I can figure out directory completion test in a script...
							open $XferPath*

							# Really failed
							print $scriptname': WICO '$terminfo[bold]$fg[${(L)RED}]'not found'$terminfo[sgr0]' near: ['$basename'.pdf]'
						fi
				fi

			# Failed the $wicoLocation$newfolder test
			else
				print $scriptname': WICO/ECO number not found: ['$1']'
			fi
			shift 1
		done

	# Failed the WICO directory check
	else
		print $scriptname': WICO directory not available at "Document Control/07_Change_ Orders_Completed/..."'
	fi

}

# Function to open Ashford Label Layout Sheets in corresponding MASH Directory.
# Written 2015-03-18 D. Zurn
# Sample: lls "/Volumes/Labelling/Label Layout Sheets/L2500 - L2999/L2768.pdf"
# /Volumes/Labelling/Label Layout Sheets/L2500 - L2999/L2768.pdf                    ** Divided into 500 parts per folder **
function lls () {
	if [[ -z $1 ]];
	then
		print 'Usage: '$terminfo[bold]$fg[${(L)RED}]$0' \[LLSNum\]' $terminfo[sgr0]
		print ' Opens Label Layout Sheet on Ashford Labeling share for the text field passed as argument.'
		return 0
	fi

	if   [[ $OSTYPE = cygwin ]] ;
	then
		myLBL="/cygdrive/w/Medical/MASH/Labelling"
	elif [[ $OSTYPE =~ ^darwin ]] ;
	then
		myLBL="/Volumes/Labelling"
	fi

	
	# W:\Medical\MASH\Labelling
	LLSLocation=$myLBL'/Label Layout Sheets/'

	scriptname=$terminfo[bold]$fg[${(L)RED}]$0:t:r$terminfo[sgr0]

	newfile=$1
	# This collects JUST the LLS number without suffix or path
	basename=${${newfile:t:r}[(ws: :)1]}

	# Determine $newfolder and $newprefix
	checkNumber=$basename[1,3]
	case $checkNumber in
		(L85|L86|L87|L88|L89)
				newfolder='L8500 - L8999'
				;;
		(L80|L81|L82|L83|L84)
				newfolder='L8000 - L8499'
				;;
		(L75|L76|L77|L78|L79)
				newfolder='L7500 - L7999'
				;;
		(L70|L71|L72|L73|L74)
				newfolder='L7000 - L7499'
				;;
		(L65|L66|L67|L68|L69)
				newfolder='L6500 - L6999'
				;;
		(L60|L61|L62|L63|L64)
				newfolder='L6000 - L6499'
				;;
		(L55|L56|L57|L58|L59)
				newfolder='L5500 - L5999'
				;;
		(L50|L51|L52|L53|L54)
				newfolder='L5000 - L5499'
				;;
		(L45|L46|L47|L48|L49)
				newfolder='L4500 - L4999'
				;;
		(L40|L41|L42|L43|L44)
				newfolder='L4000 - L4499'
				;;
		(L35|L36|L37|L38|L39)
				newfolder='L3500 - L3999'
				;;
		(L30|L31|L32|L33|L34)
				newfolder='L3000 - L3499'
				;;
		(L25|L26|L27|L28|L29)
				newfolder='L2500 - L2999'
				;;
		(L20|L21|L22|L23|L24)
				newfolder='L2000 - L2499'
				;;
		(L15|L16|L17|L18|L19)
				newfolder='L1500 - L1999'
				;;
		(L10|L11|L12|L13|L14)
				newfolder='L1000 - L1499'
				;;
		(L05|L06|L07|L08|L09)
				newfolder='L0500 - L0999'
				;;
		(L00|L01|L02|L03|L04)
				newfolder='L0000 - L0499'
				;;
		(*)
				print $scriptname': LLS NUMBER not between L0001 and L7999 ['$basename']'
				return 0
	esac

	if [[ -d $LLSLocation ]]; then
		# The LLS parent directory is available so figure out the proper filename
		while [[ -n $1 ]]; do
			if [[ -d $LLSLocation$newfolder ]]; then
				# Open the LLS
				cd $LLSLocation$newfolder
				LLStoOpen=$basename'.pdf'
				if [[ -a $LLStoOpen ]]; then
					print $scriptname': LLS in LLS folder being opened: ['$LLStoOpen']'
					open $LLStoOpen
				else
					# Really failed
					print $scriptname': LLS '$terminfo[bold]$fg[${(L)RED}]'not found'$terminfo[sgr0]' near: ['$basename'.pdf]'
				fi

			# Failed the $LLSLocation$newfolder test
			else
				print $scriptname': LLS number not found: ['$1']'
			fi
			shift 1
		done

	# Failed the WICO directory check
	else
		print $scriptname': LLS directory not available at "/Volumes/Labelling/Label Layout Sheets/..."'
	fi

}


# Modified 2011-06-07 D. Zurn: Help text updated
# Written  2010-04-20 D. Zurn
function coversheets () {
	if [[ -z $1 ]];
	then
		print 'Usage: '$terminfo[bold]$fg[${(L)RED}]$0' \[/Volumes/path/to/PC-xxxx-yyyA[_Rev101].pdf\]' $terminfo[sgr0]
		print ' Will cd to corresponding AML folder, creating parent folders only as necessary.'
		print ' Rename PDF file (if needed) as '$terminfo[bold]$fg[${(L)RED}]'COVPC-xxxx-yyyA.pdf' $terminfo[sgr0]'in that directory.'
		print ' You will be prompted when existing files would be overwritten!'
		print ' Be careful of mistyping, since new directories are being created.'
		print ' For multiple files, use '$terminfo[bold]$fg[${(L)RED}]$0' /Full/Path/To/PC-*.*'

	scriptname=$terminfo[bold]$fg[${(L)RED}]$0:t:r$terminfo[sgr0]

	if   [[ $OSTYPE = cygwin ]] ;
	then
		myTSD="/cygdrive/w/Medical/MPAU/Tech Services Dept"
	elif [[ $OSTYPE =~ ^darwin ]] ;
	then
		myTSD="/Volumes/Tech Services Dept"
	fi

	elif [[ -d $myTSD'/Working/Work Instructions/AML - Approved Master Label/' ]];
	then
		while [[ -n $1 ]];
		do
			newfile=$1
			# This collects JUST the filename without suffix or path, and takes off "COV" or "ART" at the start of the filename
			#   ":t:r" will remove the extension and remove the filepath from the filename.
			#   "[(ws: :)1]" will split the argument at the space and select the first word.
			#     This cuts off extra text after the PC code.
			# ##ART# will remove ART from the filename if it appears. Same with ##COV#.
			basename=${${${${newfile:t:r}[(ws: :)1]}##ART#}##COV#}
			cd $myTSD'/Working/Work Instructions/AML - Approved Master Label/'$basename[1,2]'-XXXX'
			newdir=${${basename[(ws:_:)1]}[1,-2]}'/'$basename
			mkdir --verbose --parents $newdir
			cd $newdir
			cp --interactive --preserve $newfile 'COV'$basename'.pdf'
			shift 1
		done
	else
	print $scriptname': AML directory not available on "Tech Services Dept/Working/Work Instructions/AML..."'
	fi
}

# Modified 2009-06-26 D. Zurn: Split newdir on words in basename using "_" to split before "_Rev"
# Modified 2009-06-25 D. Zurn: Fixed cd command in AMLDIR and AMLART to follow basename definition!
function amldir () {
	scriptname=$terminfo[bold]$fg[${(L)RED}]$0:t:r$terminfo[sgr0]

	if   [[ $OSTYPE = cygwin ]] ;
	then
		myTSD="/cygdrive/w/Medical/MPAU/Tech Services Dept"
	elif [[ $OSTYPE =~ ^darwin ]] ;
	then
		myTSD="/Volumes/Tech Services Dept"
	fi

	if [[ -z $1 ]];
	then
		print 'Usage: '$terminfo[bold]$fg[${(L)RED}]$0' \[/Volumes/path/to/PC-xxxx-yyyA[_Rev101].pdf\]' $terminfo[sgr0]
		print ' Will cd to an existing AML folder, creating parent folders only as necessary.'
		print ' Be careful of mistyping, since new directories are being created.'

	elif [[ -d $myTSD'/Working/Work Instructions/AML - Approved Master Label/' ]];
	then
		newfile=$1
		# This collects JUST the filename without suffix or path, and takes off "COV" or "ART" at the start of the filename
		basename=${${${${newfile:t:r}[(ws: :)1]}##ART#}##COV#}
		cd $myTSD'/Working/Work Instructions/AML - Approved Master Label/'$basename[1,2]'-XXXX'
		newdir=${${basename[(ws:_:)1]}[1,-2]}'/'$basename
		mkdir --verbose --parents $newdir
		cd $newdir
	else
	print $scriptname': AML directory not available on "Tech Services Dept/Working/Work Instructions/AML..."'
	fi
}

# Written 2011-07-20 D. Zurn, adapted from AMLDIR function
# Modified 2012-04-13 D. Zurn, will CD to last valid directory
# Modified 2013-11-11 D. Zurn, replace em-dash with regular dash
function checkamldir () {
	scriptname=$terminfo[bold]$fg[${(L)RED}]$0:t:r$terminfo[sgr0]

	if   [[ $OSTYPE = cygwin ]] ;
	then
		myTSD="/cygdrive/w/Medical/MPAU/Tech Services Dept"
	elif [[ $OSTYPE =~ ^darwin ]] ;
	then
		myTSD="/Volumes/Tech Services Dept"
	fi

	if [[ -z $1 ]];
	then
		print 'Usage: '$terminfo[bold]$fg[${(L)RED}]$0' \[/Volumes/path/to/PC-xxxx-yyyA[_Rev101].pdf\]' $terminfo[sgr0]
		print ' Will cd to an existing AML folder. No folders are created, traversed only.'

	elif [[ -d $myTSD'/Working/Work Instructions/AML - Approved Master Label/' ]];
	then
		okdir="";
		while [[ -n $1 ]];
		do
			# Replace em-dash with regular dash
			newfile=$1:gs/—/-/
			# This collects JUST the filename without suffix or path, and takes off "COV" or "ART" at the start of the filename
			#   ":t:r" will remove the extension and remove the filepath from the filename.
			#   "[(ws: :)1]" will split the argument at the space and select the first word.
			#     This cuts off extra text after the PC code.
			# ##ART# will remove ART from the filename if it appears. Same with ##COV#.
			# %%_actual will remove _actual from the END of the filename if it appears.
			basename=${${${${${newfile:t:r}[(ws: :)1]}##ART#}##COV#}%%_actual}
			fulldir=$myTSD'/Working/Work Instructions/AML - Approved Master Label/'$basename[1,2]'-XXXX'
			cd $fulldir
			desireddir=${${basename[(ws:_:)1]}[1,-2]}'/'$basename
			if [[ -d $desireddir ]];
			then
				# The directory exists, keep saving only the most recent directory
				okdir=$fulldir/$desireddir;
			else
				# The directory does NOT exist, so throw an error message
				print $scriptname': [Dir '$terminfo[bold]$fg[${(L)RED}]'not found'$terminfo[sgr0]' for:] '$newfile
			fi
			shift 1
		done
		if [[ $okdir != "" ]];
		then
			print $scriptname': [Changing dir to:] '${${okdir:t}};
			cd $okdir;
		fi

	else
		print $scriptname': AML directory not available on "'$myTSD'/Working/Work Instructions/AML..."'
	fi
}

alias c='checkamldir'

# Written 2012-10-02 D. Zurn, adapted from CHECKAMLDIR function
function openart () {
	scriptname=$terminfo[bold]$fg[${(L)RED}]$0:t:r$terminfo[sgr0]

	if   [[ $OSTYPE = cygwin ]] ;
	then
		myTSD="/cygdrive/w/Medical/MPAU/Tech Services Dept"
	elif [[ $OSTYPE =~ ^darwin ]] ;
	then
		myTSD="/Volumes/Tech Services Dept"
	fi

	if [[ -z $1 ]];
	then
		print 'Usage: '$terminfo[bold]$fg[${(L)RED}]$0' \[/path/to/PC-xxxx-yyyA[_Rev101].pdf\]' $terminfo[sgr0]
		print ' Will cd to an existing AML folder and open the ART file if found. No folders are created, traversed only.'

#	elif [[ $# -ge 10]];
#	then
#		print $scriptname': Total '$#' files. Do you want to continue [Y,N]?'
#		if ( read -q );
#		then
#		else
#			return 0;
#		fi

	elif [[ -d $myTSD'/Working/Work Instructions/AML - Approved Master Label/' ]];
	then
		okdir="";
		while [[ -n $1 ]];
		do
			newfile=$1
			# This collects JUST the filename without suffix or path, and takes off "COV" or "ART" at the start of the filename
			#   ":t:r" will remove the extension and remove the filepath from the filename.
			#   "[(ws: :)1]" will split the argument at the space and select the first word.
			#     This cuts off extra text after the PC code.
			# ##ART# will remove ART from the filename if it appears. Same with ##COV#.
			# %%_actual will remove _actual from the END of the filename if it appears.
			basename=${${${${${newfile:t:r}[(ws: :)1]}##ART#}##COV#}%%_actual}
			fulldir=$myTSD'/Working/Work Instructions/AML - Approved Master Label/'$basename[1,2]'-XXXX'
			cd $fulldir
			desireddir=${${basename[(ws:_:)1]}[1,-2]}'/'$basename
			if [[ -d $desireddir ]];
			then
				# The directory exists, keep saving only the most recent directory
				okdir=$fulldir/$desireddir;
			else
				# The directory does NOT exist, so throw an error message
				print $scriptname': [Dir '$terminfo[bold]$fg[${(L)RED}]'not found'$terminfo[sgr0]' for:] '$newfile
			fi
			if [[ $okdir != "" ]];
			then
				print $scriptname': [Changing dir to:] '${${okdir:t}};
				cd $okdir;

				ARTtoOpenTS='ART'$basename'.pdf'
				if [[ -a $ARTtoOpenTS ]];
				then
					print $scriptname': AML in Document Control/06_Work_Instructions/AML being opened: ['$ARTtoOpenTS']'
					open $ARTtoOpenTS
				else
					print $scriptname': AML '$terminfo[bold]$fg[${(L)RED}]'not found'$terminfo[sgr0]': ['$ARTtoOpenTS']'
				fi
			fi
			shift 1
		done

	else
		print $scriptname': AML directory not available on "'$myTSD'/Working/Work Instructions/AML..."'
	fi
}

# Written 2011-07-20 D. Zurn, adapted from AMLDIR function
#function loftwarecheck () {
#	if [[ -z $1 ]];
#	then
#		print 'Usage: '$terminfo[bold]$fg[${(L)RED}]$0' \[/Volumes/path/to/PC-xxxx-yyyA[_Rev101].pdf\]' $terminfo[sgr0]
#		print ' Check to see if: [1] PNG files exist in LOFTWARE, [2] LWL files exist, and [3] if ART files exist yet.'
#
#	elif    [[ -d $myTSD'/Working/Work Instructions/AML - Approved Master Label/' ]]
#		&& [[ -d '/Volumes/RGAFAML/LOFTWARE/' ]];
#	then
#		while [[ -n $1 ]];
#		do
#			newfile=$1
#			# This collects JUST the filename without suffix or path, and takes off "COV" or "ART" at the start of the filename
#			basename=${${${${newfile:t:r}[(ws: :)1]}##ART#}##COV#}
#
#			# Check for Loftware PNG file
#			cd '/Volumes/RGAFAML/LOFTWARE/IMAGES'
#			if [[ -f $basename'.png' ]] || [[ -f '/BCI/'$basename'.png' ]];
#			then
#			else
#				print '[No Loftware PNG file:] '$basename'.png'
#			fi
#			# Check for Loftware PNG file
#			cd $myTSD'/Working/Work Instructions/AML - Approved Master Label/'$basename[1,2]'-XXXX'
#			desireddir=${${basename[(ws:_:)1]}[1,-2]}'/'$basename
#			if [[ -d $desireddir ]];
#			then
#			else
#				print '[Dir not found for:] '$newfile
#			fi
#
#			# Check for Loftware PNG file
#			cd $myTSD'/Working/Work Instructions/AML - Approved Master Label/'$basename[1,2]'-XXXX'
#			desireddir=${${basename[(ws:_:)1]}[1,-2]}'/'$basename
#			if [[ -d $desireddir ]];
#			then
#			else
#				print '[Dir not found for:] '$newfile
#			fi
#			shift 1
#		done
#
#	else
#		print 'AML or LOFTWARE directories not available.'
#	fi
#}

# Modified 2011-06-07 D. Zurn: Help text updated
# Modified 2010-09-29 D. Zurn: Gives option of overwriting using "read -q" which inputs 1 character only
# Modified 2010-08-02 D. Zurn: AMLART now reports if ART file exists instead of overwriting.
# Modified 2009-06-26 D. Zurn: Split newdir on words in basename using "_" to split before "_Rev"
# Modified 2009-06-25 D. Zurn: Fixed cd command in AMLDIR and AMLART to follow basename definition!
function amlart () {
	scriptname=$terminfo[bold]$fg[${(L)RED}]$0:t:r$terminfo[sgr0]

	if   [[ $OSTYPE = cygwin ]] ;
	then
		myTSD="/cygdrive/w/Medical/MPAU/Tech Services Dept" 
	elif [[ $OSTYPE =~ ^darwin ]] ;
	then
		myTSD="/Volumes/Tech Services Dept" 
	fi

	if [[ -z $1 ]];
	then
		print 'Usage: '$terminfo[bold]$fg[${(L)RED}]$0' \[/path/to/PC-xxxx-yyyA[_Rev101].pdf\]' $terminfo[sgr0]
		print ' Will cd to corresponding AML folder, creating parent folders only as necessary.'
		print ' Then copy PDF file, renaming as '$terminfo[bold]$fg[${(L)RED}]'ARTPC-xxxx-yyyA.pdf' $terminfo[sgr0]'in that directory.'
		print ' You will be prompted when existing files would be overwritten!'
		print ' Be careful of mistyping, since new directories are being created.'
		print ' For multiple files, use '$terminfo[bold]$fg[${(L)RED}]$0' /Full/Path/To/PC-*.*'

	elif [[ -d $myTSD'/Working/Work Instructions/AML - Approved Master Label/' ]];
	then
		while [[ -n $1 ]];
		do
			newfile=$1
			# This collects JUST the filename without suffix or path, and takes off "COV" or "ART" at the start of the filename
			#   ":t:r" will remove the extension and remove the filepath from the filename.
			#   "[(ws: :)1]" will split the argument at the space and select the first word.
			#     This cuts off extra text after the PC code.
			# ##ART# will remove ART from the filename if it appears. Same with ##COV#.
			# %%_actual will remove _actual from the END of the filename if it appears.
			basename=${${${${${newfile:t:r}[(ws: :)1]}##ART#}##COV#}%%_actual}
			cd $myTSD'/Working/Work Instructions/AML - Approved Master Label/'$basename[1,2]'-XXXX'
			newdir=${${basename[(ws:_:)1]}[1,-2]}'/'$basename
			mkdir --verbose --parents $newdir
			cd $newdir
			ARTtoOpen='ART'$basename'.pdf'
			if [[ -a $ARTtoOpen ]];
			then
				# Ask user if we should skip or overwrite
				print -n '['$ARTtoOpen' exists, overwrite? Y/N]: '
				if ( read -q );
				then
					cp --preserve $newfile $ARTtoOpen
					print $scriptname': ART being copied:     ['$ARTtoOpen']'
				else
					print $scriptname': ART exists, skipping: ['$ARTtoOpen']'
				fi
			else
				cp --interactive --preserve $newfile $ARTtoOpen
				print $scriptname': ART being copied:     ['$ARTtoOpen']'
			fi
			shift 1
		done
	else
	print $scriptname': AML directory not available on "Tech Services Dept/Working/Work Instructions/AML..."'
	fi
}

# Written 2010-08-19 D. Zurn
# cp command added "--recursive" flag, 2011-09-14 D. Zurn
function artfiles () {
	scriptname=$terminfo[bold]$fg[${(L)RED}]$0:t:r$terminfo[sgr0]

	if   [[ $OSTYPE = cygwin ]] ;
	then
		myTSD="/cygdrive/w/Medical/MPAU/Tech Services Dept"
	elif [[ $OSTYPE =~ ^darwin ]] ;
	then
		myTSD="/Volumes/Tech Services Dept"
	fi

	if [[ -z $1 ]];
	then
		print 'Usage: '$terminfo[bold]$fg[${(L)RED}]$0' \[/Volumes/path/to/PC-xxxx-yyyA[_Rev101].pdf\]' $terminfo[sgr0]
		print ' Creates "Art Files" directory and copies passed files and directories'
		print ' to "Tech Services Dept/Working/Work Instructions/AML...".'
		print ' Leaves the working directory at the last "Art Files" directory.'

	elif [[ -d $myTSD'/Working/Work Instructions/AML - Approved Master Label/' ]];
	then
		while [[ -n $1 ]];
		do
			newfile=$1
			# This collects JUST the filename without suffix or path, and takes off "COV" or "ART" at the start of the filename
			#   ":t:r" will remove the extension and remove the filepath from the filename.
			#   "[(ws: :)1]" will split the argument at the space and select the first word.
			#     This cuts off extra text after the PC code.
			# ##ART# will remove ART from the filename if it appears. Same with ##COV#.
			# %%_actual will remove _actual from the END of the filename if it appears.
			basename=${${${${${newfile:t:r}[(ws: :)1]}##ART#}##COV#}%%_actual}
			checkme=$myTSD'/Working/Work Instructions/AML - Approved Master Label/'$basename[1,2]'-XXXX'

			if [[ -d $checkme ]];
			then
				# cd to the proper XXXX upper-level directory
				cd $checkme
				#  "(ws:_:)" will remove _Rev101, which is not used for the first directory.
				#  "[1,-2]" removes the revision
				newdir=${${basename[(ws:_:)1]}[1,-2]}'/'$basename
				if [[ -d $newdir ]];
				then
					cd $newdir
					mkdir Art\ Files
					cd Art\ Files
					cp --interactive --preserve --recursive $newfile .
					print $scriptname': Art folder located: ['$newdir']'
				else
					print $scriptname': Directory '$terminfo[bold]$fg[${(L)RED}]'not found'$terminfo[sgr0]': ['$newdir']'
				fi
			# Failed the checkme test
			else
				print $scriptname': Not a PC code or 40- number: ['$1']'
			fi
			shift 1
		done
	# Failed the AML directory check
	else
		print $scriptname': AML directory not available on "Tech Services Dept/Working/Work Instructions/AML..."'
	fi
}

# Written 2010-09-17 D. Zurn
function openAMLFolder () {
	scriptname=$terminfo[bold]$fg[${(L)RED}]$0:t:r$terminfo[sgr0]

	if   [[ $OSTYPE = cygwin ]] ;
	then
		myTSD="/cygdrive/w/Medical/MPAU/Tech Services Dept"
	elif [[ $OSTYPE =~ ^darwin ]] ;
	then
		myTSD="/Volumes/Tech Services Dept"
	fi

	if [[ -z $1 ]];
	then
		print 'Usage: '$terminfo[bold]$fg[${(L)RED}]$0' \[/Volumes/path/to/PC-xxxx-yyyA[_Rev101].xxx\]' $terminfo[sgr0]
		print ' Opens an existing AML folder in "Tech Services Dept/Working/Work Instructions/AML...".'

	elif [[ -d $myTSD'/Working/Work Instructions/AML - Approved Master Label/' ]];
	then
		while [[ -n $1 ]];
		do
			newfile=$1
			# This collects JUST the filename without suffix or path, and takes off "COV" or "ART" at the start of the filename
			#   ":t:r" will remove the extension and remove the filepath from the filename.
			#   "[(ws: :)1]" will split the argument at the space and select the first word.
			#     This cuts off extra text after the PC code.
			# ##ART# will remove ART from the filename if it appears. Same with ##COV#.
			# %%_actual will remove _actual from the END of the filename if it appears.
			basename=${${${${${newfile:t:r}[(ws: :)1]}##ART#}##COV#}%%_actual}
			checkme=$myTSD'/Working/Work Instructions/AML - Approved Master Label/'$basename[1,2]'-XXXX'

			if [[ -d $checkme ]];
			then
				# cd to the proper XXXX upper-level directory
				cd $checkme
				#  "(ws:_:)" will remove _Rev101, which is not used for the first directory.
				#  "[1,-2]" removes the revision
				newdir=${${basename[(ws:_:)1]}[1,-2]}'/'$basename
				if [[ -d $newdir ]];
				then
					open $newdir
				else
					print $scriptname': Directory '$terminfo[bold]$fg[${(L)RED}]'not found'$terminfo[sgr0]': ['$newdir']'
				fi
			# Failed the checkme test
			else
				print $scriptname': Not a PC code or 40- number: ['$1']'
			fi
			shift 1
		done
	# Failed the AML directory check
	else
		print $scriptname': AML directory not available on "Tech Services Dept/Working/Work Instructions/AML..."'
	fi
}

alias o='openAMLFolder'

# Converted from make_alias.sh from hayne.net
# 2012-11-30
function make_alias () {
	if [[ -z $1 ]];
	then
		print 'Usage: '$terminfo[bold]$fg[${(L)RED}]$0'  srcPath  destPath'
		print ' Creates a Finder-style alias to the source file or folder and puts it in the specified destination folder.'
	else
		scriptname=$terminfo[bold]$fg[${(L)RED}]$0:t:r$terminfo[sgr0]

		srcPath=$1
		destPath=$2

		if [ ! -e "$srcPath" ]; then
			print "$scriptname: $srcPath: "$terminfo[bold]"No such file or directory"
			return 0
		fi

		# remove possible trailing slash from $srcPath
		srcPath=${srcPath%/}

		# set $srcType to "file" or "folder" as appropriate
		if [ -d "$srcPath" ]; then
			if [ "${srcPath##*.}" == "app" ]; then
				srcType="file"
			else
				srcType="folder"
			fi
		else
			srcType="file"
		fi

		# check if the $destPath directory exists
		if [ ! -d "$destPath" ]; then
			print "$scriptname: $destPath: "$terminfo[bold]"No such directory"
			return 0

		fi

		# check if we have permission to create a new file in the $destPath directory
		if [ ! -w "$destPath" ]; then
			print "$scriptname: "$terminfo[bold]"No write permission in the directory $destPath"
			return 0

		fi

		case $srcPath in
		/*) fullSrcPath=$srcPath ;;
		~*) fullSrcPath=$srcPath ;;
		*)  fullSrcPath=`pwd`/$srcPath ;;
		esac

		case $destPath in
		/*) fullDestPath=$destPath ;;
		~*) fullDestPath=$destPath ;;
		*)  fullDestPath=`pwd`/$destPath ;;
		esac

		/usr/bin/osascript > /dev/null <<EOT
		tell application "Finder"
			set macSrcPath to POSIX file "$fullSrcPath" as text
			set macDestPath to POSIX file "$fullDestPath" as text
			make new alias file to $srcType macSrcPath at folder macDestPath
		end tell
EOT
	fi
}

# }}}

# {{{ Prompt

zshrc_load_status 'setting prompt from .dzzshprompt'

source ~/.dzzshprompt
#
# RPROMPT=$(echo '%{\033[32m%}%~%{\033[30m%}')
# PROMPT=$(echo '%{\033[31m%}%m>%{\033[30m%}')
# autoload -U promptinit
# promptinit
# prompt adam2 cyan green cyan red
# }}}

# {{{ History

zshrc_load_status 'history options'

# From http://books.slashdot.org/comments.pl?sid=145991&cid=12232184

HISTFILE=~/.zshistory
# Modified 2008-09-23
SAVEHIST=12000
HISTSIZE=12000

# Modified 2015-07-28
# Modified 2010-03-24 to allow comments in interactive shells
# (like when cutting and pasting commented functions to test them!)
# and GLOBDOTS
setopt glob_dots           \
       extended_history     \
       hist_expire_dups_first\
       hist_find_no_dups      \
       hist_reduce_blanks      \
       hist_save_no_dups        \
       share_history             \
       interactive_comments       \
       appendhistory               \
       auto_cd                      \
       nomatch                       \
       notify                         \

# }}}

# {{{ Watching for other users

LOGCHECK=60
WATCHFMT="[%B%t%b] %B%n%b has %a %B%l%b from %B%M%b"

# }}}

# Leave this line before the TODO so the status line is cleared.
zshrc_load_status 'Done'
echo "\n"

# BIG ZSH!
## echo "\033[0;32m"' _________  _   _ '"\033[0m"
## echo "\033[0;32m"'|__  / ___|| | | |'"\033[0m"
## echo "\033[0;32m"'  / /\___ \| |_| |'"\033[0m"
## echo "\033[0;32m"' / /_ ___) |  _  |'"\033[0m"
## echo "\033[0;32m"'|____|____/|_| |_|'"\033[0m"
## echo "\n"

## figlet -o -f isometric2 zsh
## echo "\033[0;32m"'     ___         ___         ___      '"\033[0m"
## echo "\033[0;32m"'    /\__\       /\__\       /\  \     '"\033[0m"
## echo "\033[0;32m"'   /::|  |     /:/ _/_      \:\  \    '"\033[0m"
## echo "\033[0;32m"'  /:/:|  |    /:/ /\  \      \:\  \   '"\033[0m"
## echo "\033[0;32m"' /:/|:|  |__ /:/ /::\  \ ___ /::\  \  '"\033[0m"
## echo "\033[0;32m"'/:/ |:| /\__/:/_/:/\:\__/\  /:/\:\__\ '"\033[0m"
## echo "\033[0;32m"'\/__|:|/:/  \:\/:/ /:/  \:\/:/  \/__/ '"\033[0m"
## echo "\033[0;32m"'    |:/:/  / \::/ /:/  / \::/__/      '"\033[0m"
## echo "\033[0;32m"'    |::/  /   \/_/:/  /   \:\  \      '"\033[0m"
## echo "\033[0;32m"'    |:/  /      /:/  /     \:\__\     '"\033[0m"
## echo "\033[0;32m"'    |/__/       \/__/       \/__/     '"\033[0m"

## figlet -f s-relief -c -w 132 .zshrc
## echo "\033[0;32m_________/\\\\\\\\\\\\\\\______/\\\\\\\\\\\_____/\\\________/\\\_____/\\\\\\\\\_____________/\\\\\\\\\_        \033[0m"
## echo "\033[0;32m ________\////////////\\\_____/\\\/////////\\\__\/\\\_______\/\\\___/\\\///////\\\________/\\\////////__       \033[0m"
## echo "\033[0;32m  __________________/\\\/_____\//\\\______\///___\/\\\_______\/\\\__\/\\\_____\/\\\______/\\\/___________      \033[0m"
## echo "\033[0;32m   ________________/\\\/________\////\\\__________\/\\\\\\\\\\\\\\\__\/\\\\\\\\\\\/______/\\\_____________     \033[0m"
## echo "\033[0;32m    ______________/\\\/_____________\////\\\_______\/\\\/////////\\\__\/\\\//////\\\_____\/\\\_____________    \033[0m"
## echo "\033[0;32m     ____________/\\\/__________________\////\\\____\/\\\_______\/\\\__\/\\\____\//\\\____\//\\\____________   \033[0m"
## echo "\033[0;32m      __________/\\\/_____________/\\\______\//\\\___\/\\\_______\/\\\__\/\\\_____\//\\\____\///\\\__________  \033[0m"
## echo "\033[0;32m       __/\\\___/\\\\\\\\\\\\\\\__\///\\\\\\\\\\\/____\/\\\_______\/\\\__\/\\\______\//\\\_____\////\\\\\\\\\_ \033[0m"
## echo "\033[0;32m        _\///___\///////////////_____\///////////______\///________\///___\///________\///_________\/////////__\033[0m"
## 

figlet -f s-relief -c -w 132 DZurn

## figlet -f s-relief -c -w 132 .zshrc
echo "\n"

# {{{ Echo my TODO file

#print
if   [[ $OSTYPE = cygwin ]] ;
then
	cat /cygdrive/c/Users/mpaudzurn/Dropbox/Geeky/Smiths\ Medical/TODO.txt
# elif [[ $OSTYPE =~ ^darwin ]] ;
# then
#	cat ~/Dropbox/Geeky/Smiths\ Medical/TODO.txt
fi

# }}}
