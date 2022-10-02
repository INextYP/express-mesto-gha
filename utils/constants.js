const patternLink = (item) => /^((http|https):\/\/)(www\.)?([a-zA-Z0-9-]+.)+[\w-]+(\/[\w- ./?%&=#])?$/.test(item);

module.exports = {
  patternLink,
};
