function padId(id) {
  id = parseInt(id);

  if (id < 10) {
    return `00${id}`;
  } else if (id >= 10 && id < 100) {
    return `0${id}`;
  } else {
    return id;
  }
}

function startCase(text) {
  if (text.includes('-')) {
    const values = text.split('-');
    return values
      .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
      .join('-');
  }

  if (text.toLowerCase() === 'hp') {
    return 'HP';
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

module.exports = {
  padId,
  startCase,
};
