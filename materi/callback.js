const formatName = (name) => name.toUpperCase();

const getName = (name, callFormatName) => {
  const result = callFormatName(name);
  console.log(result);
}

getName('Sabiq', formatName);

// getName('Sabiq', () => {
  
// });