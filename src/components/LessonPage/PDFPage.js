import React, { Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'



export default class component extends Component {
pageNum = 0;
state = {
	loading : false
}
componentDidMount() {
	this.pageNum = this.props.pageNum
	console.log(this.pageNum, this.refs.page)
	this.props.pdfjs.loadPage(this.pageNum, this.refs.page)
}
  render() {

    return (
    
    <div className="pdf-page" ref="page" data-page-number={this.pageNum}>
    	<canvas className="canvas-layer"></canvas>
    	<div className="text-layer"></div>
      </div>
    )
  }
}
