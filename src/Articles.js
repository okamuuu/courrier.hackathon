import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import api from './api'
import Thumbnail from './components/Thumbnail'
import Bookmark from 'react-icons/lib/fa/bookmark'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { FadeIn } from './components/FadeIn'
import { Bootstrap3ishPaginator } from 'react-paginators'

const ToggleButton = ({pinged, onClick}) => {
  if (pinged == 1) {
    return (<button className="btn btn-default" onClick={onClick}>読書中</button>)
  }
  return (<button className="btn btn-primary" onClick={onClick}>後で読む</button>)
}

class List extends Component {

  constructor(props) {
    super(props)
    this.state = { articles: [] }
  }

  componentWillMount() {
    api.listArticles().then((result) => {
      this.setState({articles: result.articles, current: 1, last: result.links.last._page})
    })
  }

  handlePickup(article, index) {
    article.pinged = article.pinged === 1 ? 0 : 1
    api.updateArticle(article.id, article).then((result) => {
      const newArticles = this.state.articles
      newArticles[index] = result.article
      this.setState({articles: newArticles})
    })
  }

  handlePageClick(page) {
    api.listArticles(page).then((result) => {
       this.setState({articles: result.articles, current: page, last: result.links.last._page})
       this.forceUpdate()
    })
  }

  render() {

    const current = this.state && this.state.current || 1
    const last = this.state && parseInt(this.state.last, 10) || 1

    const BookmarkWrap = ({article}) => {
      const color = article.pinged == 1 ? "#a94442" : "white"
      return (
        <Bookmark color={color} size={20} style={{margin: "10px"}} />
      )
    }

    return (
      <div className="container">
        {this.state.articles.map((x, index) => (
          <div key={index} style={{display: "flex"}}>
            <div style={{padding: "30px", maxWidth: "300px"}}>
              <div style={{position: "relative"}}>
              <img width="280" src={x.image.src[0]} alt={x.post_title} />
              <div style={{cursor: "pointer", position: "absolute", width: 40, height: 40, right: -40, top: 0, background: "#222", opacity: 0.6}} onClick={() => this.handlePickup(x, index)}>
              <BookmarkWrap article={x} />
              </div>
              </div>
            </div>
            <div style={{padding: "10px 30px"}}>
              <h3><Link to={`/articles/${x.id}`}>{x.post_title}</Link></h3>
              <ToggleButton pinged={x.pinged} onClick={() => this.handlePickup(x, index)} />
            </div>
          </div>
        ))}

        <div style={{paddingTop: "60px",  display: "flex", justifyContent: "center" }}>
          <Bootstrap3ishPaginator
            current={current}
            last={last}
            maxPageCount={10}
            onClick={this.handlePageClick.bind(this)}
          />
        </div>
      </div>
    )
  }
}

class MyPage extends Component {

  constructor(props) {
    super(props)
    this.state = { articles: [] }
  }

  componentWillMount() {
    api.listPickedArticles().then((result) => {
      this.setState({articles: result.articles})
    })
  }

  handlePickup(article, index) {
    article.pinged = article.pinged === 1 ? 0 : 1
    api.updateArticle(article.id, article).then((result) => {
      const newArticles = this.state.articles
      newArticles[index] = result.article
      this.setState({articles: newArticles})
      this.forceUpdate()
    })
  }

  render() {

    const {articles} = this.state

    return (
      <div className="container" style={{display: "flex", flexWrap: "wrap"}}>
        {this.state.articles.map((x, index) => (
          <FadeIn>
            <div key={index}>
              <Link to={`/articles/${x.id}`}>
                <Thumbnail src={x.image.src[0]} alt={x.post_title} />
              </Link>
            </div>
          </FadeIn>
        ))}
      </div>
    )
  }
}

class Show extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = { article: {} }
  }

  componentWillMount() {
    const { params } = this.props.match
    api.showArticle(parseInt(params.id, 10)).then((result) => {
      this.setState({article: result.article})
    })
  }

  render() {
    const {article} = this.state
    return (
      <div>
        <h2>{article.post_title}</h2>
        <div style={{fontSize:"16px", lineHeight: 1.8}}>
          <p dangerouslySetInnerHTML={{ __html: article.post_content}} />
        </div>
      </div>
    )
  }
}

export default { List, MyPage, Show }
