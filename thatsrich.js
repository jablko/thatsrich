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

  textarea.value.slice(match.index, regexp.lastIndex - 2).split(/^ *\|-/m).forEach(function (itm, rowIdx) {
      rows[rowIdx] = 1;
      cells[rowIdx] = [];
      content[rowIdx] = [];

      itm.split(/^ *[|!]/m).slice(1).forEach(function (itm, colIdx) {
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

var length = textarea.value.length;

$(textarea).on({
  click: function (evt) {
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
    },

  keypress: function (evt) {
      var rowLength = indent + cols.reduce(function (a, b) { return a + b }) + cols.length * 3 + 2,
        rowOffset = (this.selectionStart - tableStart) % rowLength - indent;

      switch (evt.keyCode) {

        // Tab
        case 9:
          evt.preventDefault();

          if (evt.shiftKey) {
            if (colIdx < 1) {
              rowIdx -= 1; colIdx = cols.length - 1;
              rowStart -= (rows[rowIdx] + 1) * rowLength; colStart = rowLength - indent - cols[colIdx] - 5;
            } else {
              colIdx -= 1;
              colStart -= cols[colIdx] + 3;
            }
          } else {
            if (colIdx > cols.length - 2) {
              rowStart += (rows[rowIdx] + 1) * rowLength; colStart = 0;
              rowIdx += 1; colIdx = 0;
            } else {
              colStart += cols[colIdx] + 3;
              colIdx += 1;
            }
          }

          selectionStart = this.selectionStart = rowStart + colStart + 2;
          selectionEnd = this.selectionEnd = rowStart + colStart + 2 + cells[rowIdx][colIdx];

          break;

        // Enter
        case 13:
          evt.preventDefault();

          if (evt.shiftKey) {
            rowIdx -= 1;
            rowStart -= (rows[rowIdx] + 1) * rowLength;
          } else {
            rowStart += (rows[rowIdx] + 1) * rowLength; colStart = 0;
            rowIdx += 1; colIdx = 0;

            $message.html('For a newline, press <kbd>ESC</kbd> then <kbd>Enter</kbd>.');
          }

          selectionStart = this.selectionStart = rowStart + colStart + 2;
          selectionEnd = this.selectionEnd = rowStart + colStart + 2 + cells[rowIdx][colIdx];

          break;

        // Left arrow
        case 37:
          if (rowOffset < colStart + 3) {
            if (colIdx < 1) {
              rowIdx -= 1; colIdx = cols.length - 1;
              rowStart -= (rows[rowIdx] + 1) * rowLength; colStart = rowLength - indent - cols[colIdx] - 5;
            } else {
              colIdx -= 1;
              colStart -= cols[colIdx] + 3;
            }

            selectionStart = selectionEnd = this.selectionStart = this.selectionEnd = rowStart + colStart + cells[rowIdx][colIdx] + 3;
          }

          break;

        // Up arrow
        case 38:
          rowIdx -= 1;
          rowStart -= (rows[rowIdx] + 1) * rowLength;

          if (rowOffset > colStart + 2 + cells[rowIdx][colIdx]) {
            selectionStart = selectionEnd = this.selectionStart = this.selectionEnd = rowStart + colStart + 2 + cells[rowIdx][colIdx];

            evt.preventDefault();
          } else {
            selectionStart = selectionEnd = this.selectionStart = this.selectionEnd -= rowLength;
          }

          break;

        // Right arrow
        case 39:
          if (rowOffset > colStart + 1 + cells[rowIdx][colIdx]) {
            if (colIdx > cols.length - 2) {
              rowStart += (rows[rowIdx] + 1) * rowLength; colStart = 0;
              rowIdx += 1; colIdx = 0;
            } else {
              colStart += cols[colIdx] + 3;
              colIdx += 1;
            }

            selectionStart = selectionEnd = this.selectionStart = this.selectionEnd = rowStart + colStart + 1;
          }

          break;

        // Down arrow
        case 40:
          rowStart += (rows[rowIdx] + 1) * rowLength;
          rowIdx += 1;

          if (rowOffset > colStart + 2 + cells[rowIdx][colIdx]) {
            selectionStart = selectionEnd = this.selectionStart = this.selectionEnd = rowStart + colStart + 2 + cells[rowIdx][colIdx];

            evt.preventDefault();
          } else {
            selectionStart = selectionEnd = this.selectionStart = this.selectionEnd += rowLength;
          }

          break;
      }
    },

  input: function (evt) {
      var end = 0,
        match,
        regexp = /(?:.*\t){2,}.*(?:\n(?:.*\t){2,}.*)*/g,
        value = '';

      // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches
      while ((match = regexp.exec(this.value)) !== null) {
        rows = [], cols = [], cells = [],
          content = [];

        this.value.slice(match.index, regexp.lastIndex).split('\n').forEach(function (itm, rowIdx) {
            rows[rowIdx] = 1;
            cells[rowIdx] = [];
            content[rowIdx] = [];

            itm.split('\t').forEach(function (itm, colIdx) {
                content[rowIdx][colIdx] = itm = itm.trim();
                cells[rowIdx][colIdx] = itm.length;
                cols[colIdx] = Math.max(cols[colIdx] || 0, itm.length);
              });
          });

        value += this.value.slice(end, match.index);
        end = regexp.lastIndex;

        tableStart = value.length,
          separator = Array(indent + 1).join(' ') + '+' + cols.map(function (itm) { return Array(itm + 3).join('-') }).join('+') + '+';

        value += separator + '\n' + content.map(function (itm) { return Array(indent + 1).join(' ') + '| ' + itm.map(function (itm, idx) { return itm + Array(cols[idx] - itm.length + 1).join(' ') }).join(' | ') + ' |\n' }).join(separator + '\n') + separator;

        tableLength = value.length - tableStart;
      }

      this.value = value + this.value.slice(end);

      var inputLength = this.value.length - length,
        rowLength = indent + cols.reduce(function (a, b) { return a + b }) + cols.length * 3 + 2;

      if (cells[rowIdx][colIdx] === cols[colIdx]) {
        var end = tableStart + indent + colStart + cols[colIdx] + 3,
          value = inputLength > 0 ? this.value.slice(0, end) + Array(inputLength + 1).join('-') : this.value.slice(0, end + inputLength);
        for (var idx = 0; idx < rows.length; idx += 1) {
          if (idx !== rowIdx) {
            for (var nstIdx = 0; nstIdx < rows[idx]; nstIdx += 1) {
              var start = end; end += rowLength;

              value += inputLength > 0 ? this.value.slice(start, end) + Array(inputLength + 1).join(' ') : this.value.slice(start, end + inputLength);
            }

            var start = end; end += rowLength;
          } else {
            var start = end; end += 2 * rowLength + inputLength;
          }

          value += inputLength > 0 ? this.value.slice(start, end) + Array(inputLength + 1).join('-') : this.value.slice(start, end + inputLength);
        }

        this.value = value + this.value.slice(end);

        cols[colIdx] += inputLength;

        rowStart += (2 * rowIdx + 1) * inputLength;

        tableLength += (2 * rows.length + 1) * inputLength;

        this.selectionStart = this.selectionEnd = selectionStart = selectionEnd += 2 * (rowIdx + 1) * inputLength;
      } else {
        var end = rowStart + colStart + cols[colIdx] + 3 + inputLength;

        this.value = (inputLength > 0 ? this.value.slice(0, end - inputLength) : this.value.slice(0, end) + Array(1 - inputLength).join(' ')) + this.value.slice(end);

        this.selectionStart = this.selectionEnd = selectionStart = selectionEnd += inputLength;
      }

      cells[rowIdx][colIdx] += inputLength;

      length = this.value.length;
    } });

$(textarea.form).on('submit', function () {
    var rowLength = indent + cols.reduce(function (a, b) { return a + b }) + cols.length * 3 + 2,
      end = tableStart;

    textarea.value = textarea.value.slice(0, tableStart) + '{|\n' + cells.map(function (itm, rowIdx) {
        end += rowLength + indent + 2;

        return itm.map(function (itm, colIdx) {
            var start = end; end += cols[colIdx] + 3;

            return '|' + textarea.value.slice(start, start + itm);
          }).join('\n');
      }).join('\n|-\n') + '\n|}' + textarea.value.slice(tableStart + tableLength);
  });
