import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// import Typography from 'typography'
// const typography = new Typography({
//   baseFontSize: '18px',
//   baseLineHeight: 1.666,
//   headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
//   bodyFontFamily: ['Georgia', 'serif'],
//   // See below for the full list of options.
// })
// typography.injectStyles()

import Articles from './Articles'

const App = () => (
  <Router>
    <div className="container">
      <h1 className="text-center" style={{padding: "30px"}}><Link to="/">courrier.jp</Link></h1>
      <ul className="nav nav-pills" style={{padding: "30px"}}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/mypage">MyPage</Link></li>
      </ul>
      <Route exact path="/" component={Articles.List}/>
      <Route exact path="/articles" component={Articles.List}/>
      <Route exact path="/articles/:id" component={Articles.Show}/>
      <Route exact path="/mypage" component={Articles.MyPage}/>
      <footer className="footer text-center">
        <p className="text-muted" style={{padding: "30px"}}>courrier.jp</p>
      </footer>
    </div>
  </Router>
)

export default App
