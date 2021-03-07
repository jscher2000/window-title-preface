/* 
  titlePreface - add a name to any window's title bar
  Copyright 2021. Jefferson "jscher2000" Scher. License: MPL-2.0.
  v0.1 - initial design
*/

/**** Use defaults, later check storage for user prefs ****/

var oPrefs = {
	prePreface: '[',
	postPreface: ']',
	delimiter: ' '
}

/**** Get the current titlePreface, if any, and populate the text input ****/

// There doesn't seem to be an API for just the preface, so probably we need to use storage; LATER!

/**** Event handlers ****/

function updatePreface(evt){
	// Update current window titlePreface
	var txt = document.getElementById('newPreface').value.trim();
	if (txt.length > 0) txt = oPrefs.prePreface + txt + oPrefs.postPreface + oPrefs.delimiter;
	browser.windows.getCurrent().then((w) => {
		browser.windows.update(
			w.id,
			{
				titlePreface: txt
			}
		).then(() => {
			self.close();
		}).catch((err) => {
			document.getElementById('errs').textContent = 'Error setting titlePreface: ' + err.message;
		});
	});	
}

document.getElementById('frmPreface').addEventListener('submit', updatePreface, false);
document.getElementById('btnGo').addEventListener('click', updatePreface, false);
document.getElementById('btnCancel').addEventListener('click', function(evt){
	self.close();
}, false);
