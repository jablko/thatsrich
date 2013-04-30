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

test('Click start cell', function () {
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

test('Click end cell', function () {
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

test('Click outside table', function () {
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

    $textarea[0].selectionStart = $textarea[0].selectionEnd = 126;

    browserBot.triggerMouseEvent($textarea[0], 'click', true);

    equal($textarea[0].selectionStart, 126);
    equal($textarea[0].selectionEnd, 126);

    equal($('div:eq(-1)').html(), '');

    $textarea.remove();
  });

test('Right arrow', function () {
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

    $textarea[0].selectionStart = $textarea[0].selectionEnd = 68;

    browserBot.triggerMouseEvent($textarea[0], 'click', true);
    triggerKeyEvent($textarea[0], 'keypress', '\\39', true);

    equal($textarea[0].selectionStart, 70);
    equal($textarea[0].selectionEnd, 70);

    $textarea.remove();
  });

test('Left arrow', function () {
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

    $textarea[0].selectionStart = $textarea[0].selectionEnd = 67;

    browserBot.triggerMouseEvent($textarea[0], 'click', true);
    triggerKeyEvent($textarea[0], 'keypress', '\\37', true);

    equal($textarea[0].selectionStart, 65);
    equal($textarea[0].selectionEnd, 65);

    $textarea.remove();
  });

test('Down arrow', function () {
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

    $textarea[0].selectionStart = $textarea[0].selectionEnd = 68;

    browserBot.triggerMouseEvent($textarea[0], 'click', true);
    triggerKeyEvent($textarea[0], 'keypress', '\\40', true);

    equal($textarea[0].selectionStart, 85);
    equal($textarea[0].selectionEnd, 85);

    $textarea.remove();
  });

test('Up arrow', function () {
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

    $textarea[0].selectionStart = $textarea[0].selectionEnd = 67;

    browserBot.triggerMouseEvent($textarea[0], 'click', true);
    triggerKeyEvent($textarea[0], 'keypress', '\\38', true);

    equal($textarea[0].selectionStart, 50);
    equal($textarea[0].selectionEnd, 50);

    $textarea.remove();
  });

test('Tab', function () {
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

    $textarea[0].selectionStart = $textarea[0].selectionEnd = 68;

    browserBot.triggerMouseEvent($textarea[0], 'click', true);
    triggerKeyEvent($textarea[0], 'keypress', '\\9', true);

    equal($textarea[0].selectionStart, 71);
    equal($textarea[0].selectionEnd, 72);

    $textarea.remove();
  });

test('Shift tab', function () {
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

    $textarea[0].selectionStart = $textarea[0].selectionEnd = 67;

    browserBot.triggerMouseEvent($textarea[0], 'click', true);
    triggerKeyEvent($textarea[0], 'keypress', '\\9', true, undefined, undefined, true);

    equal($textarea[0].selectionStart, 63);
    equal($textarea[0].selectionEnd, 64);

    $textarea.remove();
  });

test('Enter', function () {
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

    $textarea[0].selectionStart = $textarea[0].selectionEnd = 68;

    browserBot.triggerMouseEvent($textarea[0], 'click', true);
    triggerKeyEvent($textarea[0], 'keypress', '\\13', true);

    equal($textarea[0].selectionStart, 97);
    equal($textarea[0].selectionEnd, 98);

    equal($('div:eq(-1)').html(), 'For a newline, press <kbd>ESC</kbd> then <kbd>Enter</kbd>.');

    $textarea.remove();
  });

test('Shift enter', function () {
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

    $textarea[0].selectionStart = $textarea[0].selectionEnd = 67;

    browserBot.triggerMouseEvent($textarea[0], 'click', true);
    triggerKeyEvent($textarea[0], 'keypress', '\\13', true, undefined, undefined, true);

    equal($textarea[0].selectionStart, 33);
    equal($textarea[0].selectionEnd, 34);

    equal($('div:eq(-1)').html(), '');

    $textarea.remove();
  });

test('Input', function () {
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

    $textarea[0].selectionStart = $textarea[0].selectionEnd = 68;

    browserBot.triggerMouseEvent($textarea[0], 'click', true);

    $textarea.val([
      'Before',
      '   +---+---+---+',
      '   | a | b | c |',
      '   +---+---+---+',
      '   | d | ex | f |',
      '   +---+---+---+',
      '   | g | h | i |',
      '   +---+---+---+',
      'After',
      ''].join('\n'));

    triggerEvent($textarea[0], 'input', true);

    equal($textarea.val(), [
      'Before',
      '   +---+----+---+',
      '   | a | b  | c |',
      '   +---+----+---+',
      '   | d | ex | f |',
      '   +---+----+---+',
      '   | g | h  | i |',
      '   +---+----+---+',
      'After',
      ''].join('\n'));

    $textarea.remove();
  });

test('Delete', function () {
    var $textarea = $([
      '<textarea id="wpTextbox1">',
      'Before',
      '{|',
      '|a',
      '|b',
      '|c',
      '|-',
      '|d',
      '|ex',
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

    $textarea.val([
      'Before',
      '   +---+----+---+',
      '   | a | b  | c |',
      '   +---+----+---+',
      '   | d | e | f |',
      '   +---+----+---+',
      '   | g | h  | i |',
      '   +---+----+---+',
      'After',
      ''].join('\n'));

    triggerEvent($textarea[0], 'input', true);

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
