const faker = require('faker')

const images = [
  "https://images.unsplash.com/photo-1473172707857-f9e276582ab6?w=300",
  "https://images.unsplash.com/photo-1484199408980-5918a796a53f?w=300",
  "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=300",
  "https://images.unsplash.com/photo-1423460359171-71432dd68be8?w=300",
  "https://images.unsplash.com/photo-1435777940218-be0b632d06db?w=300",
  "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=300",
  "https://images.unsplash.com/photo-1477915737647-b5246ee6de6f?w=300",
  "https://images.unsplash.com/photo-1483197452165-7abc4b248905?w=300"
]

module.exports = function() {
  const articles = []

  for (var id = 1; id < 50; id++) {

    articles.push({
      "id": id,
      "post_title": faker.lorem.words(),
      "post_content": faker.lorem.paragraphs(),
      "image": { src: [images[id % images.length]] },
      "pinged": 0
    })
  }

  return { "articles": articles }
}
