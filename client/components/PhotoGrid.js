import React, { Component, PropTypes } from 'react'
import Photo from './Photo'

class PhotoGrid extends Component {

  render() {
    const { posts, comments, addComment, removeComment, increment } = this.props

    return (
      <div className="photo-grid">
      {posts.map((post, i) => <Photo key={i} i={i} post={post} comments={comments} onLikeClick={increment} />)}
      </div>
    )
  }
}

export default PhotoGrid