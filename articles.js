const faker = require('faker')

module.exports = function() {
  const articles = []

  for (var id = 1; id < 50; id++) {

    articles.push({
      "id": id,
      "post_title": faker.lorem.words(),
      "post_content": faker.lorem.paragraphs(),
      "image": { src: [faker.image.imageUrl()] },
      "pined": false
    })
  }

  return { "articles": articles }
}
