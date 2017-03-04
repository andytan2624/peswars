'use strict';

import React from 'react';

const FeaturedTutorials = React.createClass({

    componentWillMount: function() {
        // runs just before render function called. only called once
    },

    render: function() {
        return (
            <div className="featured-tutorials">
                <div className="main-tutorial">
                    <h3 className="title">{this.props.items.featured.title}</h3>
                </div>
                <div className="other-tutorials">
                    {this.tutorialList()}
                </div>
            </div>
        );
    },
    tutorialList: function() {
        return this.props.items.other.map(function(item,i){
            return (
                <div className="tutorial-list-item" key={i}>
                    <span className="title">{item.title} Index:{i}</span>
                    <p>{item.description}</p>
                </div>
            )
        })
    }
});

export default FeaturedTutorials;