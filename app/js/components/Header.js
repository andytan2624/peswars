'use strict';

import React from 'react';
import Nav   from './Nav';

const Header = React.createClass({

  render() {
    return (
        <Nav currentPage={this.props.currentPage} />
    );
  }

});

export default Header;