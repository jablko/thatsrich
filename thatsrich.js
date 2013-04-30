var textarea = document.getElementById('wpTextbox1');

var end = 0,
  match,
  regexp = /^\s*{\|(?:.|\s)*?^\s*\|}/gm,
  value = '';

// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches
while ((match = regexp.exec(textarea.value)) !== null) {
  var cols = [], cells = textarea.value.slice(match.index, regexp.lastIndex - 2).split(/^\s*\|-/gm).map(function (itm) {
        return itm.split(/^\s*[|!]/gm).slice(1).map(function (itm, idx) {
            itm = itm.trim();
            cols[idx] = Math.max(cols[idx] || 0, itm.length);

            return itm;
          });
      }),
    separator = '   +' + cols.map(function (itm) { return Array(itm + 3).join('-') }).join('+') + '+';

  value += textarea.value.slice(end, match.index) + separator + '\n' + cells.map(function (itm) { return '   | ' + itm.map(function (itm, idx) { return itm + Array(cols[idx] - itm.length + 1).join(' ') }).join(' | ') + ' |\n' }).join(separator + '\n') + separator;
  end = regexp.lastIndex;
}

textarea.value = value + textarea.value.slice(end);
