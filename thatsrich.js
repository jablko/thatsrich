var indent = 3,
  rowIdx, colIdx,
  rowStart, colStart;

var textarea = document.getElementById('wpTextbox1'),
  selectionStart = textarea.selectionStart,
  selectionEnd = textarea.selectionEnd;

var $message = $('<div>').appendTo(document.body);

var end = 0,
  match,
  regexp = /^ *{\|(?:.|\n)*?^ *\|}/gm,
  value = '';

// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches
while ((match = regexp.exec(textarea.value)) !== null) {
  var rows = [], cols = [], cells = [],
    content = [];

  textarea.value.slice(match.index, regexp.lastIndex - 2).split(/^ *\|-/gm).forEach(function (itm, rowIdx) {
      rows[rowIdx] = 1;
      cells[rowIdx] = [];
      content[rowIdx] = [];

      itm.split(/^ *[|!]/gm).slice(1).forEach(function (itm, colIdx) {
          content[rowIdx][colIdx] = itm = itm.trim();
          cells[rowIdx][colIdx] = itm.length;
          cols[colIdx] = Math.max(cols[colIdx] || 0, itm.length);
        });
    });

  value += textarea.value.slice(end, match.index);
  end = regexp.lastIndex;

  var tableStart = value.length,
    separator = Array(indent + 1).join(' ') + '+' + cols.map(function (itm) { return Array(itm + 3).join('-') }).join('+') + '+';

  value += separator + '\n' + content.map(function (itm) { return Array(indent + 1).join(' ') + '| ' + itm.map(function (itm, idx) { return itm + Array(cols[idx] - itm.length + 1).join(' ') }).join(' | ') + ' |\n' }).join(separator + '\n') + separator;

  var tableLength = value.length - tableStart;
}

textarea.value = value + textarea.value.slice(end);

$(textarea).on('click', function (evt) {
    if (this.selectionStart > tableStart - 1 && this.selectionStart < tableStart + tableLength + 1) {
      var rowLength = indent + cols.reduce(function (a, b) { return a + b }) + cols.length * 3 + 2,
        rowOffset = (this.selectionStart - tableStart) % rowLength - indent;

      var start = tableStart + indent + rowLength;
      for (var idx = 0; idx < rows.length; idx += 1) {
        if (this.selectionStart > start && this.selectionStart < start + rows[idx] * rowLength - indent - 1) {
          var nstRowIdx = idx,
            nstRowStart = start;

          break;
        } else {
          start += (rows[idx] + 1) * rowLength;
        }
      }

      var start = 0;
      for (var idx = 0; idx < cols.length; idx += 1) {
        if (rowOffset > start && rowOffset < start + cols[idx] + 4) {
          var nstColIdx = idx,
            nstColStart = start;

          break;
        } else {
          start += cols[idx] + 3;
        }
      }

      if (nstRowIdx !== undefined && nstColIdx !== undefined) {
        rowIdx = nstRowIdx; colIdx = nstColIdx;
        rowStart = nstRowStart; colStart = nstColStart;

        if (rowOffset < colStart + 2) {
          selectionStart = selectionEnd = this.selectionStart = this.selectionEnd = rowStart + colStart + 2;
        } else if (rowOffset > colStart + 2 + cells[rowIdx][colIdx]) {
          selectionStart = selectionEnd = this.selectionStart = this.selectionEnd = rowStart + colStart + 2 + cells[rowIdx][colIdx];
        } else {
          selectionStart = this.selectionStart;
          selectionEnd = this.selectionEnd;
        }

        $message.html('');
      } else {
        this.selectionStart = selectionStart;
        this.selectionEnd = selectionEnd;

        $message.html('Click in a cell to edit.');
      }
    } else {
      selectionStart = this.selectionStart;
      selectionEnd = this.selectionEnd;

      $message.html('');
    }
  });
