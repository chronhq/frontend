const charsRu = [
  'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л',
  'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш',
  'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я'
];

const charsEn = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
  'w', 'x', 'y', 'z'
];

const special = ['-', ',', '.', '+', '=', '_', '?', ':', '"', '\'',
  '[', ']', '{', '}', '/', '|', '\\', ' ', '(', ')', '\n', '<', '>'
];

const chars = [
  ...charsRu, ...charsRu.map(c => c.toUpperCase()),
  ...charsEn, ...charsEn.map(c => c.toUpperCase()),
  ...special,
];

export default chars;
