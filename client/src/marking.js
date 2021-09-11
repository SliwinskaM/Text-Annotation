import axios from 'axios';

// import mongoose from 'mongoose';


let labelsColors = ['red', 'orange', 'yellow', 'yellowgreen', 'green', 'blue', 'lightblue']
let labelsFontsColor = ['black', 'black', 'black', 'black', 'white', 'white', 'black']
export let labelsNames = ['person', 'org', 'date', 'location', 'norp', 'product', 'event']

let labelsAll = []
let labelsPositions = {}
let relationCurr = []

export function loadLabels() {
  // get labels for a specific document
	axios.get('http://localhost:27017/labels/', 
    { params: {
      document_Id: localStorage.getItem('currentPostId')
    }}).then(function (response) { 
      console.log(localStorage.getItem('currentPostId'));
      var labels = response.data;
      console.log(labels);
      var wholeText = document.getElementsByClassName("popup-inner")[0].innerHTML;
      for (var label_idx = 0; label_idx < labels.length; label_idx++) {
        var label = labels[label_idx];
        var labelNameIdx = labelsNames.findIndex(el => el === label.label_name);
        var start = label.b_position[0] >= 0 ? label.b_position[0] : label.u_position[0];
        var end = label.l_position[1] >= 0 ? label.l_position[1] : label.u_position[1];
        start = rawPosition(wholeText, start);
        end = rawPosition(wholeText, end);
        
        var mouseOver = "onMouseEnter={window._changeLabel('" + label.user + "');}"
        console.log(mouseOver)
        wholeText = wholeText.slice(0, start) + "<" + label.inner_id + " id=\"" + label.inner_id + "\" class=\"" + label.label_name + "\" style=\"" + "font-weight: bold; background-color: " + labelsColors[labelNameIdx] + 
            "; color: " + labelsFontsColor[labelNameIdx] + ";\" "+ mouseOver+">" + wholeText.slice(start, end) + "</" + label.inner_id + ">" + wholeText.slice(end, wholeText.length);

        document.getElementsByClassName("popup-inner")[0].innerHTML = wholeText;
        labelsAll.push(label.inner_id);
        labelsPositions[label.inner_id] = [start, end];
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    }

function rawPosition(wholeText, position) {
  var countBlocked = false;
  for (var i = 0; i < wholeText.length; i++) {
    if (wholeText[i] == '<') countBlocked = true;
    if (position == 0 && ! countBlocked) return i;
    if (! countBlocked) position --;
    if (wholeText[i] == '>') countBlocked = false;
  }
}


export function selectionString() {
    if (window.getSelection().toString()) {
        var sel = window.getSelection();
        return sel.toString();
    } else {
        return ""
    }

}

export function selectionPosition() {
    if (typeof window.getSelection != 'undefined') {
        var sel = window.getSelection();
				if (sel && sel.rangeCount > 0) {
					var range = sel.getRangeAt(0);
					var endOffset = getCaretIndex(window.document.getElementsByClassName("popup-inner")[0]);
					var startOffset = endOffset - range.toString().length;
					return [startOffset, endOffset]
				} 
    }
		return [-1, -1];
  }



function getCaretIndex(element) {
  let position = 0;
  const isSupported = typeof window.getSelection !== "undefined";
  if (isSupported) {
    const selection = window.getSelection();
    if (selection.rangeCount !== 0) {
      const range = window.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      position = preCaretRange.toString().length;
    }
  }
  return position;
}

export function correctSelection() {
	var sel = window.getSelection();
	if (sel && sel.rangeCount > 0) {
		var range = sel.getRangeAt(0);
		var div = window.document.getElementsByClassName("popup-inner")[0];
		var wholeText = div.innerText;
		var startOffset = selectionPosition()[0];
		var endOffset = selectionPosition()[1];
		for (var i=0; i < 30; i++) {
			if (startOffset - 1 >= 0 && wholeText.charAt(startOffset - 1) !== " ") {
			range.setStart(range.startContainer, range.startOffset - 1);
			startOffset -= 1;
			}
		}
		for (var i=0; i < 30; i++) {
			if (endOffset + 1 <= wholeText.length && wholeText.charAt(endOffset).match(/[a-z]/i)) {
				range.setEnd(range.endContainer, range.endOffset + 1);
				endOffset += 1;
			}
		}
	}
}



function submitSelectionLabel(label_name, innerId) {
    labelsPositions[innerId] = selectionPosition();

    var b = '';
    var b_position = [-1, -1];
    var i = [];
    var i_position = [-1, -1];
    var l = '';
    var l_position = [-1, -1];
    var u = '';
    var u_position = [-1, -1]
    var labelWords = selectionString().split(/\W+/); 
    if (labelWords.length == 1) {
        u = labelWords[0];
        u_position = selectionPosition();
    } else if (labelWords.length == 2) {
        b = labelWords[0];
        b_position = [selectionPosition()[0], selectionPosition()[0] + b.length];
        l = labelWords[1];
        l_position = [b_position[1] + 1, b_position[1] + 1 + l.length]; //+1 because of space
    } else if (labelWords.length >= 3) {
        b = labelWords[0];
        b_position = [selectionPosition()[0], selectionPosition()[0] + b.length];
        i = labelWords.slice(1, -1);
        i_position = [b_position[1] + 1, l_position[0] - 1]; //+1 and -1 because of space
        l = labelWords[labelWords.length - 1];
        l_position = [selectionPosition()[1] - l.length, selectionPosition()[1]];
    }

    const label = {
        document_Id: localStorage.getItem('currentPostId'),
        label_name: label_name,
        label_whole: [selectionPosition(), selectionString()],
        b: b,
        b_position: b_position,
        i: i,
        i_position: i_position,
        l: l,
        l_position: l_position,
        u: u,
        u_position: u_position,
        inner_id: innerId,
        user: localStorage.getItem('user')
    }
    axios.post('http://localhost:27017/labels', label).then(console.log('Dodano do bazy: ')).then(console.log(label));
}


function selectionInLabelCheck() {
	var currentPos = selectionPosition();

	for(var innerId in labelsPositions) {
		var start = labelsPositions[innerId][0];
		var end = labelsPositions[innerId][1];
		if( (currentPos[0] >= start && currentPos[0] <= end) || (currentPos[1] >= start && currentPos[1] <= end ) ) { 
			return innerId;
		}
	  }
	return -1;

}


// function selectHTML(item) {
//     try {
//         if (window.ActiveXObject) {
//             var c = document.selection.createRange();
//             return c.htmlText;
//         }

//         var nNd = document.createElement(item);
//         var w = getSelection().getRangeAt(0);
//         w.surroundContents(nNd);
//         return nNd;
//     } catch (e) {
//         if (window.ActiveXObject) {
//             return document.selection.createRange();
//         } else {
//             return getSelection();
//         }
//     }
// }



function clearTables(word) {
    if (labelsAll.includes(word)) {
      labelsAll = labelsAll.filter(item => item !== word);
    }
}


export function labelWords(label_name) {
  correctSelection();
	var wordId;
	var selCheck = selectionInLabelCheck();
	// var inSelection;
  // if word isn't already selected
	if (selCheck == -1) {
		// inSelection = false;
    var selectedWord = selectionString();
    var stringArray = selectedWord.split(/\W+/);
    var wordIdSufix = selectionPosition()[0];
		// if selecting text didn't throw an error
		if (wordIdSufix !== -1) {
    	wordId = stringArray[0] + wordIdSufix;
		} else {
			alert("Select a part of the text!");
			return;
		}
	} else { 
		// if word is already selected
		// inSelection = true;
		wordId = selCheck;
	};
	
    if (wordId) {
        var labelNameIdx = labelsNames.findIndex(el => el === label_name);
        var element = window.document.getElementById(wordId);
        // if word is/was already labeled
        if (element != null) {
          // if previous label was deleted
            if (element.classList.contains("deleted") || !labelsAll.includes(wordId)) {
                clearTables(wordId);
													// if (inSelection) {
					// 	alert("A part of the selection is already labeled!");
					// 	return;
					// }
                labelsAll.push(wordId);
                element.className = label_name;
                element.style.cssText = "font-weight: bold; background-color: " + labelsColors[labelNameIdx] + "; color: " + labelsFontsColor[labelNameIdx];
                submitSelectionLabel(label_name, wordId);
            } else {
              // delete label
                labelsAll = labelsAll.filter(item => item != wordId);
                element.classList.remove(label_name);
                element.className = "deleted";
                axios.delete('http://localhost:27017/labels/inner/' + wordId).then(console.log('Usunięto: ')).then(console.log(wordId))
                element.style.cssText = 'font-weight: normal; background-color: transparent';
            }
        } else {
          // if label is new

										// if (inSelection) {
					// 	alert("A part of the selection is already labeled!");
					// 	return;
					// }
            labelsAll.push(wordId);
            var mytext = window.document.createElement(wordId);
            mytext.id = wordId;
            mytext.className = label_name;
            var w = getSelection().getRangeAt(0);
            w.surroundContents(mytext);
            mytext.style.cssText = "font-weight: bold; background-color: " + labelsColors[labelNameIdx] + "; color: " + labelsFontsColor[labelNameIdx];
            submitSelectionLabel(label_name, wordId);
        }
    }
}


export function clearRelations() {
  while(relationCurr.length > 0) {
    let relId = relationCurr.pop();
    let element = window.document.getElementById(relId);
    if(element) {
      element.className = "hide";
      element.style.cssText = 'font-style: normal; text-decoration: none';
    }
  }

}



export function markRelation(wordsPositions) {
  // unhighlight other relations
  clearRelations();

  let wholeText = document.getElementsByClassName("popup-inner")[0].innerHTML;
  for (let relPosIdx = 0; relPosIdx < wordsPositions.length; relPosIdx++) {
    let relPos = wordsPositions[relPosIdx];
    let wordId = "relation" + relPos[0] + relPos[1];
    let start = rawPosition(wholeText, relPos[0]);
    let end = rawPosition(wholeText, relPos[1]);

    let element = window.document.getElementById(wordId);
    // relation was highlighted before
    if (element != null && element.classList.contains("hide")) {
      relationCurr.push(wordId);
      element.className = "show";
      element.style.cssText = "font-style: italic; text-decoration: underline; ";
    } else {
      // relation is new
        wholeText = wholeText.slice(0, start) + "<" + wordId + " id=\"" + wordId + "\" class=\" show \" style=\"font-style: italic; text-decoration: underline; \" >"
                   + wholeText.slice(start, end) + "</" + wordId + ">" + wholeText.slice(end, wholeText.length);
        document.getElementsByClassName("popup-inner")[0].innerHTML = wholeText;
        relationCurr.push(wordId);
    }
  }
  }