import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      celebrities: [], // The default value for the state.celebrities
      selectedCelebrity: null,
      search: ""
    }
    this.changeSearch = this.changeSearch.bind(this)
  }
  selectCelebrity(celebrity) {
    this.setState({
      selectedCelebrity: celebrity
    })
  }
  changeSearch(e) {
    this.setState({
      search: e.target.value
    })
  }
  render() {
    return (
      <div className="App">
        <h1 className="header">Movie Celebrities</h1>
        <p><input type="text" value={this.state.search} onChange={this.changeSearch} /></p>
        <p>{this.state.celebrities.length} celebrities</p>
        <div className="board">
          <ul>
            {this.state.celebrities
              .filter(celebrity => celebrity.name.toUpperCase().includes(this.state.search.toUpperCase()))
              .map((celebrity, i) => (
                <li key={i} onClick={() => this.selectCelebrity(celebrity)}>
                  <img src={"https://image.tmdb.org/t/p/w185" + celebrity.profile_path} alt="Pic" />
                  <div>{celebrity.name}</div>
                </li>
              ))}
          </ul>
          <div className="detail">
            {this.state.selectedCelebrity && <div>
              <h2>{this.state.selectedCelebrity.name}</h2>
              <img src={"https://image.tmdb.org/t/p/w185" + this.state.selectedCelebrity.profile_path} alt="" />
              <h3>Known for</h3>
              {this.state.selectedCelebrity.known_for.map(movie => <div key={movie.id}>
                <img src={"https://image.tmdb.org/t/p/w185" + movie.poster_path} alt="" />
                <p>{movie.title}</p>
              </div>)}
            </div>}
          </div>
        </div>
      </div>
    );
  }
  // componentDidMount is executed after the 1st render
  componentDidMount() {
    for (let page = 1; page <= 5; page++) {
      setTimeout(() => {
        axios.get(`https://api.themoviedb.org/3/person/popular?page=${page}&api_key=ac8d871bc92c64c3486c06e7c6f7224b`)
          .then(response => {
            this.setState({
              celebrities: [...this.state.celebrities, ...response.data.results]
            })
          })
      }, page * 100)
    }
  }
}

export default App;
