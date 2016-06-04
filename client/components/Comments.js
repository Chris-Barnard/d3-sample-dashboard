import React, { Component, PropTypes } from 'react'

class Comments extends Component {
  
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderComment = this.renderComment.bind(this)
  }

  renderComment(comment, i) {
    const { postId, onRemoveClick } = this.props
    
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{comment.user}</strong>
          {comment.text}
          <button className="remove-comment" onClick={() => onRemoveClick(postId, i)} >&times;</button>
        </p>
      </div>
    )
  }

  handleSubmit(e) {
    e.preventDefault()

    const { postId, onSubmit } = this.props
    const author = this.refs.author.value
    const comment = this.refs.comment.value

    onSubmit(postId, author, comment)
    this.refs.commentForm.reset()

  }

  render() {
    const { comments } = this.props

    return (
      <div className="comments">
        {comments.map(this.renderComment)}
        <form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit} >
          <input type="text" ref="author" placeholder="author"/>
          <input type="text" ref="comment" placeholder="comment"/>
          <input type="submit" hidden />
        </form>
      </div>
    )
  }
}

export default Comments