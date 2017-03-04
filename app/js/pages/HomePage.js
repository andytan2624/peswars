'use strict';

import React             from 'react';
import {Link}            from 'react-router';
import DocumentTitle     from 'react-document-title';
import Header            from '../components/Header';
import Footer            from '../components/Footer';
import FeaturedTutorials from '../components/home/FeaturedTutorials';
import MainLinks         from '../components/home/MainLinks';
import InterimHomepage   from '../components/home/InterimHomePage';

const HomePage = React.createClass({

  getInitialState: function() {
    return {
      tutorials: {
        featured: {
          'title': 'Coming soon!',
          'description': 'Coming soon!'
        },
        other: [
          {
            'title': 'Coming soon!',
            'description': 'Coming soon!'
          },
          {
            'title': 'Coming soon!',
            'description': 'Coming soon!'
          },
          {
            'title': 'Coming soon!',
            'description': 'Coming soon!'
          }
        ]
      }
    };
  },

  render: function() {
    return (
      <DocumentTitle title="Home">
        <div>
          <Header currentPage="Home Page" />
          {this.content()}
          <Footer />
        </div>
      </DocumentTitle>
    )
  },
  content: function() {
    if(this.props.children) {
      return this.props.children
    } else {
      return (
          <div>
            <InterimHomepage />
          </div>
      )
    }
  }

});

export default HomePage;
