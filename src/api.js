import axios from 'axios'
import parse from 'parse-link-header'

const BASE_URL = window.location.hostname === "localhost" ? "http://localhost:4000" : window.location.origin

export function listArticles(page=1) {
  return axios.get(`${BASE_URL}/api/articles?_page=${page}`).then((res) => {
    return {
      "articles": res.data || [],
      "links": parse(res.headers.link)
    }
  })
}

export function listPickedArticles(page=1) {
  return axios.get(`${BASE_URL}/api/articles?pinged=1&_page=${page}&_limit=50`).then((res) => {
    return { "articles": res.data || [] }
  })
}

export function showArticle(id) {
  return axios.get(`${BASE_URL}/api/articles/${id}`).then((res) => {
    return { "article": res.data }
  })
}

export function updateArticle(id, params) {
  return axios.put(`${BASE_URL}/api/articles/${id}`, params).then((res) => {
    return { "article": res.data }
  })
}

export default { listArticles, listPickedArticles, showArticle, updateArticle }
