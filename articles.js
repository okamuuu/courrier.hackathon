const faker = require('faker')

module.exports = function() {
  const articles = []

  for (var id = 1; id < 50; id++) {

    articles.push({
      "id": id,
      "title": faker.lorem.words(),
      "content": faker.lorem.paragraphs(),
      "image": faker.image.imageUrl(),
      "picked": false
    })
  }

  return { "articles": articles }
}
