'use strict';

import React              from 'react';
import {ListenerMixin}    from 'reflux';
import CurrentUserActions from './actions/CurrentUserActions';
import CurrentUserStore   from './stores/CurrentUserStore';

const App = React.createClass({

  mixins: [ListenerMixin],

  componentWillMount() {

  },

  renderChildren() {
    return React.cloneElement(this.props.children, {
      params: this.props.params,
      query: this.props.query,
    });
  },

  render() {
    return (
      <div className="container">
        {this.renderChildren()}
      </div>
    );
  }

});

export default App;