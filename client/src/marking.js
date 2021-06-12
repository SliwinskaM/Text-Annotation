//proba

let label1 = [];
let label2 = [];
let label3 = [];
let label4 = [];
let label5 = [];
let label6 = [];
let label7 = [];


function selectionString() {

    if (window.getSelection().toString()) {
        var sel = window.getSelection();
        var range = sel.getRangeAt(0);
        return sel.toString();
    } else {
        return ""
    }

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

export function function1() {
    var selectedWord = selectionString();
    var stringArray = selectedWord.split(/(\s+)/);
    var word = stringArray[0]
    if (word) {
        var element = window.document.getElementById(word);
        if (element != null) {
            if (element.classList.contains("deleted") || !label1.includes(word)) {
                clearTables(word);
                label1.push(word);
                element.className = "label1";
                element.style.cssText = 'font-weight: bold; background-color: red';
            } else {
                label1 = label1.filter(item => item != word);
                element.classList.remove("label1");
                element.className = "deleted";
                element.style.cssText = 'font-weight: normal; background-color: transparent';
            }
        } else {
            label1.push(word);
            var mytext = window.document.createElement(word);
            mytext.id = word;
            mytext.className = "label1";
            var w = getSelection().getRangeAt(0);
            w.surroundContents(mytext);
            mytext.style.cssText = 'font-weight: bold; background-color: red';

        }
    }


}

export function function2() {
    var selectedWord = selectionString();
    var stringArray = selectedWord.split(/(\s+)/);
    var word = stringArray[0]
    if (word) {
        var element = window.document.getElementById(word);
        if (element != null) {
            if (element.classList.contains("deleted") || !label2.includes(word)) {
                clearTables(word);
                label2.push(word);
                element.className = "label2";
                element.style.cssText = 'font-weight: bold; background-color: orange';
            } else {
                label2 = label2.filter(item => item != word);
                element.classList.remove("label2");
                element.className = "deleted";
                element.style.cssText = 'font-weight: normal; background-color: transparent';
            }
        } else {
            label2.push(word);
            var mytext = window.document.createElement(word);
            mytext.id = word;
            mytext.className = "label2";
            var w = getSelection().getRangeAt(0);
            w.surroundContents(mytext);
            mytext.style.cssText = 'font-weight: bold; background-color: orange';

        }
    }
}
export function function3() {
    var selectedWord = selectionString();
    var stringArray = selectedWord.split(/(\s+)/);
    var word = stringArray[0]
    if (word) {
        var element = window.document.getElementById(word);
        if (element != null) {
            if (element.classList.contains("deleted") || !label3.includes(word)) {
                clearTables(word);
                label3.push(word);
                element.className = "label3";
                element.style.cssText = 'font-weight: bold; background-color: yellow';
            } else {
                label3 = label3.filter(item => item !== word);
                element.classList.remove("label3");
                element.className = "deleted";
                element.style.cssText = 'font-weight: normal; background-color: transparent';
            }
        } else {
            label3.push(word);
            var mytext = window.document.createElement(word);
            mytext.id = word;
            mytext.className = "label3";
            var w = getSelection().getRangeAt(0);
            w.surroundContents(mytext);
            mytext.style.cssText = 'font-weight: bold; background-color: yellow';

        }
    }

}
export function function4() {
    var selectedWord = selectionString();
    var stringArray = selectedWord.split(/(\s+)/);
    var word = stringArray[0]
    if (word) {
        var element = window.document.getElementById(word);
        if (element != null) {
            if (element.classList.contains("deleted") || !label4.includes(word)) {
                clearTables(word);
                label4.push(word);
                element.className = "label4";
                element.style.cssText = 'font-weight: bold; background-color: yellowgreen';
            } else {
                label4 = label4.filter(item => item !== word);
                element.classList.remove("label4");
                element.className = "deleted";
                element.style.cssText = 'font-weight: normal; background-color: transparent';
            }
        } else {
            label4.push(word);
            var mytext = window.document.createElement(word);
            mytext.id = word;
            mytext.className = "label4";
            var w = getSelection().getRangeAt(0);
            w.surroundContents(mytext);
            mytext.style.cssText = 'font-weight: bold; background-color: yellowgreen';

        }
    }
}

export function function5() {
    var selectedWord = selectionString();
    var stringArray = selectedWord.split(/(\s+)/);
    var word = stringArray[0]
    if (word) {
        var element = window.document.getElementById(word);
        if (element != null) {
            if (element.classList.contains("deleted") || !label5.includes(word)) {
                clearTables(word);
                label5.push(word);
                element.className = "label5";
                element.style.cssText = 'color: white; background-color: green';
            } else {
                label5 = label5.filter(item => item !== word);
                element.classList.remove("label5");
                element.className = "deleted";
                element.style.cssText = 'font-weight: normal; background-color: transparent';
            }
        } else {
            label5.push(word);
            var mytext = window.document.createElement(word);
            mytext.id = word;
            mytext.className = "label5";
            var w = getSelection().getRangeAt(0);
            w.surroundContents(mytext);
            mytext.style.cssText = 'color: white; background-color: green';

        }
    }

}
export function function6() {
    var selectedWord = selectionString();
    var stringArray = selectedWord.split(/(\s+)/);
    var word = stringArray[0]
    if (word) {
        var element = window.document.getElementById(word);
        if (element != null) {
            if (element.classList.contains("deleted") || !label6.includes(word)) {
                clearTables(word);
                label6.push(word);
                element.className = "label6";
                element.style.cssText = 'color: white; background-color: blue';
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
            mytext.style.cssText = 'color: white; background-color: blue';

        }
    }

}
export function function7() {
    var selectedWord = selectionString();
    var stringArray = selectedWord.split(/(\s+)/);
    var word = stringArray[0]
    if (word) {
        var element = window.document.getElementById(word);
        if (element != null) {
            if (element.classList.contains("deleted") || !label7.includes(word)) {
                clearTables(word);
                label7.push(word);
                element.className = "label7";
                element.style.cssText = 'font-weight: bold; background-color: lightblue';
            } else {
                label5 = label5.filter(item => item !== word);
                element.classList.remove("label7");
                element.className = "deleted";
                element.style.cssText = 'font-weight: normal; background-color: transparent';
            }
        } else {
            label7.push(word);
            var mytext = window.document.createElement(word);
            mytext.id = word;
            mytext.className = "label7";
            var w = getSelection().getRangeAt(0);
            w.surroundContents(mytext);
            mytext.style.cssText = 'font-weight: bold; background-color: lightblue';
        }
    }

}
