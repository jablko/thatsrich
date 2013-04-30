var browserBot = new BrowserBot();

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

test('Click start', function () {
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

    $textarea[0].selectionStart = $textarea[0].selectionEnd = 66;

    browserBot.triggerMouseEvent($textarea[0], 'click', true);

    equal($textarea[0].selectionStart, 67);
    equal($textarea[0].selectionEnd, 67);

    equal($('div:eq(-1)').html(), '');

    $textarea.remove();
  });

test('Click end', function () {
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

    $textarea[0].selectionStart = $textarea[0].selectionEnd = 69;

    browserBot.triggerMouseEvent($textarea[0], 'click', true);

    equal($textarea[0].selectionStart, 68);
    equal($textarea[0].selectionEnd, 68);

    equal($('div:eq(-1)').html(), '');

    $textarea.remove();
  });

test('Click outside cell', function () {
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

    $textarea[0].selectionStart = $textarea[0].selectionEnd = 7;

    browserBot.triggerMouseEvent($textarea[0], 'click', true);

    equal($textarea[0].selectionStart, 0);
    equal($textarea[0].selectionEnd, 0);

    equal($('div:eq(-1)').html(), 'Click in a cell to edit.');

    $textarea.remove();
  });
