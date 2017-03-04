'use strict';

import React  from 'react';
import {Link} from 'react-router';
import _      from 'lodash';

const SearchBar = React.createClass({

    render: function() {

        return (
            <form className="form-inline navbar-form pull-right">
                <input className="form-control" type="text" placeholder="Search" />
                <button className="btn btn-success-outline" type="submit">Search</button>
            </form>
        );
    }


});

export default SearchBar;