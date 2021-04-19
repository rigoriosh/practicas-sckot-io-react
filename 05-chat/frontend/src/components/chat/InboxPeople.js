import React from "react";
import SearchBox from "./SearchBox";
import SideBar from "./SideBar";
//import PropTypes from 'prop-types'

const InboxPeople = () => {
  return (
    <>
      <div className="inbox_people">
        {/* <!-- Searchbox inicio --> */}
        <SearchBox />
        {/* <!-- Searchbox Fin --> */}

        {/* <!-- Sidebar inicio --> */}
        <SideBar />
        {/* <!-- Sidebar Fin --> */}
      </div>
    </>
  );
};

InboxPeople.propTypes = {};

export default InboxPeople;
