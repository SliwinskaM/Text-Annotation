import axios from 'axios';
// import mongoose from 'mongoose';

var wordIdSufix = 0;

let label1 = [];
let label2 = [];
let label3 = [];
let label4 = [];
let label5 = [];
let label6 = [];
let label7 = [];

export let label1_name = 'person'
export let label2_name = 'org'
export let label3_name = 'date'
export let label4_name = 'location'
export let label5_name = 'norp'
export let label6_name = 'product'
export let label7_name = 'event'

var labels_positions = {}


function selectionString() {

    if (window.getSelection().toString()) {
        var sel = window.getSelection();
        var range = sel.getRangeAt(0);
        return sel.toString();
    } else {
        return ""
    }

}

function selectionPosition() {
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


	function getSelectionParentElement() {
    var parentEl = null, sel;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            parentEl = sel.getRangeAt(0).commonAncestorContainer;
            if (parentEl.nodeType != 1) {
                parentEl = parentEl.parentNode;
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        parentEl = sel.createRange().parentElement();
    }
    return parentEl;
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

function correctSelection() {
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
			if (endOffset + 1 <= wholeText.length && wholeText.charAt(endOffset) !== " ") {
				range.setEnd(range.endContainer, range.endOffset + 1);
				endOffset += 1;
			}
		}
	}
}



function submitSelectionLabel(label_name, innerId) {
    labels_positions[innerId] = selectionPosition();
	// console.log("Labels: " + labels_positions[innerId]);

    var b = '';
    var b_position = [];
    var i = [];
    var i_position = [];
    var l = '';
    var l_position = [];
    var u = '';
    var u_position = []
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
        inner_id: innerId
    }
    axios.post('http://localhost:27017/labels', label).then(console.log('Dodano do bazy: ')).then(console.log(label));
}


function selectionInLabelCheck() {
	var currentPos = selectionPosition();

	for(var innerId in labels_positions) {
		var start = labels_positions[innerId][0];
		var end = labels_positions[innerId][1];
		if( (currentPos[0] >= start && currentPos[0] <= end) || (currentPos[1] >= start && currentPos[1] <= end ) ) { 
			return innerId;
		}
	  }
	return -1;

}


function selectHTML(item) {
    try {
        if (window.ActiveXObject) {
            var c = document.selection.createRange();
            return c.htmlText;
        }

        var nNd = document.createElement(item);
        var w = getSelection().getRangeAt(0);
        w.surroundContents(nNd);
        return nNd;
    } catch (e) {
        if (window.ActiveXObject) {
            return document.selection.createRange();
        } else {
            return getSelection();
        }
    }
}



function clearTables(word) {
    if (label1.includes(word)) {
        label1 = label1.filter(item => item !== word);
    }
    if (label2.includes(word)) {
        label2 = label2.filter(item => item !== word);
    }
    if (label3.includes(word)) {
        label3 = label3.filter(item => item !== word);
    }
    if (label4.includes(word)) {
        label4 = label4.filter(item => item !== word);
    }
    if (label5.includes(word)) {
        label5 = label5.filter(item => item !== word);
    }
    if (label6.includes(word)) {
        label6 = label6.filter(item => item !== word);
    }
}

// Na razie rozgrzebałam function1, ale potem to przekopiuję do reszty

export function function1() {
  correctSelection();
	var wordId;
	var selCheck = selectionInLabelCheck();
	if (selCheck == -1) {
		// if word isn't already selected
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
		wordId = selCheck;
	};
	
    if (wordId) {
        var element = window.document.getElementById(wordId);
        if (element != null) {
            if (element.classList.contains("deleted") || !label1.includes(wordId)) {
                clearTables(wordId);
                label1.push(wordId);
                element.className = label1_name;
                element.style.cssText = 'font-weight: bold; background-color: red';
                submitSelectionLabel(label1_name, wordId);
            } else {
                label1 = label1.filter(item => item != wordId);
                element.classList.remove(label1_name);
                element.className = "deleted";
                axios.delete('http://localhost:27017/labels/inner/' + wordId).then(console.log('Usunięto: ')).then(console.log(wordId))
                element.style.cssText = 'font-weight: normal; background-color: transparent';
            }
        } else {
            label1.push(wordId);
            var mytext = window.document.createElement(wordId);
            mytext.id = wordId;
            mytext.className = label1_name;
            var w = getSelection().getRangeAt(0);
            w.surroundContents(mytext);
            mytext.style.cssText = 'font-weight: bold; background-color: red';
            submitSelectionLabel(label1_name, wordId);
        }
    }


}

export function function2() {
    correctSelection()
    var selectedWord = selectionString();
    var stringArray = selectedWord.split(/(\s+)/);
    var word = stringArray[0] + wordIdSufix;
    wordIdSufix += 1;
    if (word) {
        var element = window.document.getElementById(word);
        if (element != null) {
            if (element.classList.contains("deleted") || !label2.includes(word)) {
                clearTables(word);
                label2.push(word);
                element.className = "org";
                element.style.cssText = 'font-weight: bold; background-color: orange';
                submitSelectionLabel(label2_name);
            } else {
                label2 = label2.filter(item => item != word);
                element.classList.remove("org");
                element.className = "deleted";
                element.style.cssText = 'font-weight: normal; background-color: transparent';
            }
        } else {
            label2.push(word);
            var mytext = window.document.createElement(word);
            mytext.id = word;
            mytext.className = "org";
            var w = getSelection().getRangeAt(0);
            w.surroundContents(mytext);
            mytext.style.cssText = 'font-weight: bold; background-color: orange';
            submitSelectionLabel(label2_name);

        }
    }
}
export function function3() {
    correctSelection()
    var selectedWord = selectionString();
    var stringArray = selectedWord.split(/(\s+)/);
    var word = stringArray[0] + wordIdSufix;
    wordIdSufix += 1;
    if (word) {
        var element = window.document.getElementById(word);
        if (element != null) {
            if (element.classList.contains("deleted") || !label3.includes(word)) {
                clearTables(word);
                label3.push(word);
                element.className = "date";
                element.style.cssText = 'font-weight: bold; background-color: yellow';
                submitSelectionLabel(label3_name);
            } else {
                label3 = label3.filter(item => item !== word);
                element.classList.remove("date");
                element.className = "deleted";
                element.style.cssText = 'font-weight: normal; background-color: transparent';
            }
        } else {
            label3.push(word);
            var mytext = window.document.createElement(word);
            mytext.id = word;
            mytext.className = "date";
            var w = getSelection().getRangeAt(0);
            w.surroundContents(mytext);
            mytext.style.cssText = 'font-weight: bold; background-color: yellow';
            submitSelectionLabel(label3_name);

        }
    }

}
export function function4() {
    correctSelection()
    var selectedWord = selectionString();
    var stringArray = selectedWord.split(/(\s+)/);
    var word = stringArray[0] + wordIdSufix;
    wordIdSufix += 1;
    if (word) {
        var element = window.document.getElementById(word);
        if (element != null) {
            if (element.classList.contains("deleted") || !label4.includes(word)) {
                clearTables(word);
                label4.push(word);
                element.className = "location";
                element.style.cssText = 'font-weight: bold; background-color: yellowgreen';
                submitSelectionLabel(label4_name);
            } else {
                label4 = label4.filter(item => item !== word);
                element.classList.remove("location");
                element.className = "deleted";
                element.style.cssText = 'font-weight: normal; background-color: transparent';
            }
        } else {
            label4.push(word);
            var mytext = window.document.createElement(word);
            mytext.id = word;
            mytext.className = "location";
            var w = getSelection().getRangeAt(0);
            w.surroundContents(mytext);
            mytext.style.cssText = 'font-weight: bold; background-color: yellowgreen';
            submitSelectionLabel(label4_name);

        }
    }
}

export function function5() {
    correctSelection()
    var selectedWord = selectionString();
    var stringArray = selectedWord.split(/(\s+)/);
    var word = stringArray[0] + wordIdSufix;
    wordIdSufix += 1;
    if (word) {
        var element = window.document.getElementById(word);
        if (element != null) {
            if (element.classList.contains("deleted") || !label5.includes(word)) {
                clearTables(word);
                label5.push(word);
                element.className = "norp";
                element.style.cssText = 'font-weight: bold; color: white; background-color: green';
                submitSelectionLabel(label5_name);
            } else {
                label5 = label5.filter(item => item !== word);
                element.classList.remove("norp");
                element.className = "deleted";
                element.style.cssText = 'font-weight: normal; background-color: transparent';
            }
        } else {
            label5.push(word);
            var mytext = window.document.createElement(word);
            mytext.id = word;
            mytext.className = "norp";
            var w = getSelection().getRangeAt(0);
            w.surroundContents(mytext);
            mytext.style.cssText = 'font-weight: bold; color: white; background-color: green';
            submitSelectionLabel(label5_name);

        }
    }

}
export function function6() {
    correctSelection()
    var selectedWord = selectionString();
    var stringArray = selectedWord.split(/(\s+)/);
    var word = stringArray[0] + wordIdSufix;
    wordIdSufix += 1;
    if (word) {
        var element = window.document.getElementById(word);
        if (element != null) {
            if (element.classList.contains("deleted") || !label6.includes(word)) {
                clearTables(word);
                label6.push(word);
                element.className = "label6";
                element.style.cssText = 'font-weight: bold; color: white; background-color: blue';
                submitSelectionLabel(label6_name);
            } else {
                label6 = label6.filter(item => item !== word);
                element.classList.remove("label6");
                element.className = "deleted";
                element.style.cssText = 'font-weight: normal; background-color: transparent';
            }
        } else {
            label6.push(word);
            var mytext = window.document.createElement(word);
            mytext.id = word;
            mytext.className = "label6";
            var w = getSelection().getRangeAt(0);
            w.surroundContents(mytext);
            mytext.style.cssText = 'font-weight: bold; color: white; background-color: blue';
            submitSelectionLabel(label6_name);

        }
    }

}
export function function7() {
    correctSelection()
    var selectedWord = selectionString();
    var stringArray = selectedWord.split(/(\s+)/);
    var word = stringArray[0] + wordIdSufix;
    wordIdSufix += 1;
    if (word) {
        var element = window.document.getElementById(word);
        if (element != null) {
            if (element.classList.contains("deleted") || !label7.includes(word)) {
                clearTables(word);
                label7.push(word);
                element.className = "event";
                element.style.cssText = 'font-weight: bold; background-color: lightblue';
                submitSelectionLabel(label7_name);
            } else {
                label5 = label5.filter(item => item !== word);
                element.classList.remove("event");
                element.className = "deleted";
                element.style.cssText = 'font-weight: normal; background-color: transparent';
            }
        } else {
            label7.push(word);
            var mytext = window.document.createElement(word);
            mytext.id = word;
            mytext.className = "event";
            var w = getSelection().getRangeAt(0);
            w.surroundContents(mytext);
            mytext.style.cssText = 'font-weight: bold; background-color: lightblue';
            submitSelectionLabel(label7_name);
        }
    }

}