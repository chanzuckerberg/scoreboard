import React from "react";

export const Tabs = props => {
	console.log("Tabs", props);

	const tablinks = props.tabs.map((tabname, idx) => {
		let tabclass = "tab clickable ";
		if (tabname === props.activetab) tabclass += "tab-selected";
		return (
			<div
				className={tabclass}
				data-tabname={tabname}
				onClick={props.onclick}
				key={`${tabname}_data_tab`}
				style={{ borderColor: props.color, color: props.color }}
			>
				{tabname}
			</div>
		);
	});
	return (
		<div className="col-md-10 col-md-offset-1">
			<div className="tab-container" style={{ borderColor: props.color, color: props.color }}>
				{tablinks}
			</div>
			{props.content}
		</div>
	);
};
