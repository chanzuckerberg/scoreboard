import React from 'react';

const About = (props) => {
	return (
		<div className="col-md-12 tab-content">
			<p>Etiam a diam nec orci porta mattis sit amet in leo. Proin placerat velit egestas, egestas mauris a, accumsan mauris. Vivamus consequat mollis lectus, vitae gravida sapien sodales quis. Nunc scelerisque dolor quis velit lacinia porttitor ac a nibh. Vestibulum malesuada tempor nibh in faucibus. Duis a lacinia tortor. Maecenas tempus porttitor odio, interdum vestibulum dolor mattis non.</p>
		</div>
	)
}
const  Challenges = (props) => {

	return (
		<div>
			<Challenge name="doublet detection" datasetcount={1} submissions={50} />
			<Challenge name="batch effect correction" datasetcount={2} submissions={11} />
			<Challenge name="cell identification" datasetcount={5} submissions={5} />
			<Challenge name="experimental design" datasetcount={2} submissions={201} />
			<Challenge name="cell type clustering" datasetcount={9} submissions={3} />
		</div>
	)
}
const Challenge = (props) => {
	return (
		<div className="col-md-4 challenge">
			<img className="pull-left dataset-img" src="http://via.placeholder.com/100/00ccff" alt="placeholder" />
			 <div>
			 	<h4>{ props.name }</h4>
			 	<div>short description of the challenge</div>
				 <div>datasets: { props.datasetcount }</div>
				 <div>submissions: { props.submissions }</div>
			 </div>
		</div>

	)
}

export const Tabs = (props) => {
	return (<div>
		<div className="row">
			<div className="col-md-2 tab tab-selected">About //</div>
			{/*<div className="col-md-2 tab">Dataset //</div>*/}
			{/*<div className="col-md-2 tab">Submit //</div>*/}
			<div className="col-md-2 tab">Help //</div>
		</div>
		<div className="row">
			<About />
		</div>
			<div className="row">
				<Challenges />
			</div>
	</div>

	)
}

