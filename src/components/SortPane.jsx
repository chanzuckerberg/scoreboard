import React from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";

export const SortPane = (props) => {
  let sortCategories = props.sortOptions.map((item, idx) => {
    let active = false;
    if (props.sortSelection === item) active = true;
    return (
      <MenuItem
        key={"sort_item_" + idx}
        onClick={props.onSortSelect.bind(this)}
        data-idx={idx}
        data-sortby={item}
        eventKey={item}
        active={active}
      >
        {item}
      </MenuItem>
    );
  });
  sortCategories = (
    <DropdownButton
      bsSize="small"
      className="dropdown-sort"
      bsStyle="success"
      id="AlgoSortDropdown"
      title={props.sortSelection}
    >
      {sortCategories}
    </DropdownButton>
  );
  return (
    <div>
      <label className="sort-label" htmlFor="AlgoSortDropdown">
        Sort By:{" "}
      </label>{" "}
      {sortCategories}
    </div>
  );
};
