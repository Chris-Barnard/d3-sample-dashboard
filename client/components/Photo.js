import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import CSSTransitionGroup from 'react-addons-css-transition-group'

class Photo extends Component {

  render() {
    const { post, i, comments, onLikeClick } = this.props
    
    return (
      <figure className="grid-figure">
        <div className="grid-photo-wrap">
          <Link to={`/view/${post.code}`}>
            <img src={post.display_src} alt={post.caption} className="grid-photo" />
          </Link>
          <CSSTransitionGroup
            transitionName="like"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            <span key={post.likes} className="likes-heart">{post.likes}</span>
          </CSSTransitionGroup>
        </div>
        <figcaption>
          <p>{post.caption}</p>
          <div className="control-buttons">
            <button onClick={() => onLikeClick(i)} className="likes">&hearts; {post.likes}</button>
            <Link className="button" to={`/view/${post.code}`}>
              <span className="comment-count">
                <span className="speech-bubble"></span>
                {comments[post.code] ? ' ' + comments[post.code].length : ' ' + 0}
              </span>
            </Link>
          </div>
        </figcaption>
      </figure>
    )
  }

}
Photo.PropTypes = {
  post : PropTypes.object.isRequired,
  comments : PropTypes.object.isRequired,
  i : PropTypes.number.isRequired,
  onLikeClick : PropTypes.func.isRequired
}

export default Photo