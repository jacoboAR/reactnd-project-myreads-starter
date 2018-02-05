import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'

class App extends Component {
  state={
    books: []
  }

  //to get all Books.
  getAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({books})
    })
  }

  // API Call to get all the Books initiall before the WebSite is rendered.
  componentDidMount() {
    this.getAllBooks()
  }

  // This function is triggered within the onChange function when the bookShelf is changed.
  handleChange = (bookId, newShelfValue) => {
    BooksAPI.update({id: bookId},newShelfValue)
    this.getAllBooks()
  }

  render() {
    return (
      <div className="app">
          <Route exact path="/" render={()=>( 
            <div>
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <BookShelf books={this.state.books} handleChange={this.handleChange} shelf="currentlyReading" shelfTitle="Currently Reading"/>
                  <BookShelf books={this.state.books} handleChange={this.handleChange} shelf="wantToRead" shelfTitle="Want to Read"/>
                  <BookShelf books={this.state.books} handleChange={this.handleChange} shelf="read" shelfTitle="Read"/>
                </div>
              </div>
            </div>
          )} />
          <Route exact path="/search" render={()=>(
            <SearchBooks getAllBooks={this.getAllBooks} books={this.state.books}/>
          )} />
      </div>
    )
  }
}

export default App