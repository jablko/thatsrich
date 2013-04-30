test('Table', function () {
    var $textarea = $([
      '<textarea id="wpTextbox1">',
      '{|',
      '|a',
      '|b',
      '|c',
      '|-',
      '|d',
      '|e',
      '|f',
      '|-',
      '|g',
      '|h',
      '|i',
      '|}',
      '</textarea>',
      '<script src="../thatsrich.js">'].join('\n')).appendTo(document.body);

    equal($textarea.val(), [
      '   +---+---+---+',
      '   | a | b | c |',
      '   +---+---+---+',
      '   | d | e | f |',
      '   +---+---+---+',
      '   | g | h | i |',
      '   +---+---+---+'].join('\n') + '\n');

    $textarea.remove();
  });
