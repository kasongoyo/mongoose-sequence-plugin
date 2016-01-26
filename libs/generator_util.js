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
function isLastId(id, prefix, suffix) {
    id = deaffixId(id, prefix, suffix);
    return id.match(/[0-8a-yA-Y]+/) === null;
}

function affixId(idValue, prefix, suffix) {
    var affixedValue = idValue;
    if (prefix) {
        affixedValue = prefix + affixedValue;
    }
    if (suffix) {
        affixedValue = affixedValue + suffix;
    }
    return affixedValue;
}

function deaffixId(affixedValue, prefix, suffix) {
    var idValue = affixedValue;
    if (prefix) {
        prefix = new RegExp('^' + prefix);
        idValue = idValue.replace(prefix, '');
    }
    if (suffix) {
        suffix = new RegExp(suffix + '$');
        idValue = idValue.replace(suffix, '');
    }
    return idValue;
}

var util = {
    incId: function(previousIdNum, prefix, suffix) {
        previousIdNum = deaffixId(previousIdNum, prefix, suffix);
        var incVal;
        if (isLastId(previousIdNum, prefix, suffix)) {
            incVal = affixId(previousIdNum, prefix, suffix);
            return incVal;
        }
        var seqChars = previousIdNum.split('');
        for (var i = seqChars.length - 1; i >= 0; i--) {
            var seqChar = seqChars[i];
            if (seqChar.match(/^[0-9a-zA-Z]+$/)) {
                var incrementedChar = incrementChar(seqChar);
                if (incrementedChar) {
                    incVal = affixId(replaceCharAt(previousIdNum, i, incrementedChar), prefix, suffix);
                    return incVal;
                } else {
                    previousIdNum = replaceCharAt(previousIdNum, i,
                        resetChar(seqChar));
                }
            }
        }
        incVal = affixId(previousIdNum, prefix, suffix);
        return incVal;
    },

    isLastId: isLastId,

    affixId: affixId
};

module.exports = util;
