'use strict';

//dependencies

/**
 * @description util
 */

function replaceCharAt(str, index, character) {
    return str.substr(0, index) + character + str.substr(index + character.length);
}

/**
 * Increment character when its not 'Z' or '9'
 * @param  {string} seqChar Character to increment
 * @return {string} incremented character
 */
function incrementChar(seqChar) {
    if (seqChar === '9') {
        return null;
    }
    if (seqChar === seqChar.toUpperCase() && seqChar !== 'Z') {
        return String.fromCharCode(seqChar.charCodeAt() + 1);
    } else if (seqChar === seqChar.toLowerCase() && seqChar !== 'z') {
        return String.fromCharCode(seqChar.charCodeAt() + 1);
    }
    return null;
}

function resetChar(charToReset) {
        if (charToReset === 'Z') {
            return 'A';
        } else if (charToReset === 'z') {
            return 'a';
        } else {
            return '0';
        }
    }
    /**
     * isLastId  check if the id number is last i.e it contains only last characters
     * @param  {[type]}  id id number to check
     * @return {Boolean}    true if it's last id, false otherwise
     */
function isLastId(id) {
    return id.match(/[0-8a-yA-Y]+/) === null;
}

var util = {
    incId: function(previousIdNum) {
        if (isLastId(previousIdNum)) {
            return previousIdNum;
        }
        var seqChars = previousIdNum.split('');
        for (var i = seqChars.length - 1; i >= 0; i--) {
            var seqChar = seqChars[i];
            if (seqChar.match(/^[0-9a-zA-Z]+$/)) {
                var incrementedChar = incrementChar(seqChar);
                if (incrementedChar) {
                    return replaceCharAt(previousIdNum, i, incrementedChar);
                } else {
                    previousIdNum = replaceCharAt(previousIdNum, i,
                        resetChar(seqChar));
                }
            }
        }
        return previousIdNum;
    }
};

module.exports = util;
