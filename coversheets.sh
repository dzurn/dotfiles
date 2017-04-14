coversheets () {
	if [[ -z $1 ]]
	then
		print 'Usage: '$terminfo[bold]$fg[${(L)RED}]$0' \[/Volumes/path/to/PC-xxxx-yyyA[_Rev101].pdf\]' $terminfo[sgr0]
		print Will cd to corresponding AML folder, creating parent folders only as necessary.
		print 'Rename PDF file (if needed) as '$terminfo[bold]$fg[${(L)RED}]'COVPC-xxxx-yyyA.pdf' $terminfo[sgr0]'in that directory.'
		print You will be prompted when existing files would be overwritten!
		print Be careful of mistyping, since new directories are being created.
	elif [[ -d '/Volumes/Tech Services Dept/Working/Work Instructions/AML - Approved Master Label/' ]]
	then
		while [[ -n $1 ]]
		do
			newfile=$1 
			basename=${${newfile:t:r}##COV#} 
			cd '/Volumes/Tech Services Dept/Working/Work Instructions/AML - Approved Master Label/'$basename[1,2]'-XXXX'
			newdir=${${basename[(ws:_:)1]}[1,-2]}'/'$basename 
			mkdir --verbose --parents $newdir
			cd $newdir
			cp --interactive --preserve $newfile 'COV'$basename'.pdf'
			shift 1
		done
	else
		print AML directory not available.
	fi
}
