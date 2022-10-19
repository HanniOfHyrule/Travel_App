function isValidURL(inputURL) {
  const regex = inputURL.match(
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  );

  if (regex == null) {
    return 0;
  }
  return 1;
}

export { isValidURL };
