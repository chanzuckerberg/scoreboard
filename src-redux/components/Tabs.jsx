import React from "react";

export const Tabs = props => {
	const tablinks = props.tabs.map((tabname, idx) => {
		let tabclass = "col-md-2 tab clickable ";
		if (tabname === props.activetab) tabclass += "tab-selected";
		return (
			<div
				className={tabclass}
				data-tabname={tabname}
				onClick={props.onclick}
				key={`${tabname}_data_tab`}
			>
				{tabname} //
			</div>
		);
	});
	return (
		<div>
			<div className="row">{tablinks}</div>
			{props.content}
		</div>
	);
};
