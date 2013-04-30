test('Table', function () {
    var $textarea = $([
      '<textarea id="wpTextbox1">',
      'Before',
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
      'After',
      '</textarea>',
      '<script src="../thatsrich.js">'].join('\n')).appendTo(document.body);

    equal($textarea.val(), [
      'Before',
      '   +---+---+---+',
      '   | a | b | c |',
      '   +---+---+---+',
      '   | d | e | f |',
      '   +---+---+---+',
      '   | g | h | i |',
      '   +---+---+---+',
      'After',
      ''].join('\n'));

    $textarea.remove();
  });

test('Blank line', function () {
    var $textarea = $([
      '<textarea id="wpTextbox1">',
      'Before',
      '',
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
      'After',
      '</textarea>',
      '<script src="../thatsrich.js">'].join('\n')).appendTo(document.body);

    equal($textarea.val(), [
      'Before',
      '',
      '   +---+---+---+',
      '   | a | b | c |',
      '   +---+---+---+',
      '   | d | e | f |',
      '   +---+---+---+',
      '   | g | h | i |',
      '   +---+---+---+',
      'After',
      ''].join('\n'));

    $textarea.remove();
  });
