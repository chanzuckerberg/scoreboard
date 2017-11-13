import React from 'react';
import ReactDOM from 'react-dom';

export class Tree extends React.Component {

   componentDidMount() {
	   this.node = ReactDOM.findDOMNode(this);
	   this.tree = $(this.node).jstree({
		   "core": {
			       'data' : this.props.tree
		   }
	   })
   }
	
  render() {
    // 1) render nothing, this way the DOM diff will never try to do
    //    anything to it again, and we get a node to mess with
	  return <div></div>;
  }
}