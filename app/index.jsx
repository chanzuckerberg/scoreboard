import React from 'react';
import {render} from 'react-dom';
import {Header} from "./components/Header.jsx"
import {Tabs} from "./components/Tabs.jsx"


class App extends React.Component {
  render () {
    return (<div className="container">
		<Header />
		<hr/>
		<Tabs />
	</div>)
  }
}

render(<App/>, document.getElementById('app'));

