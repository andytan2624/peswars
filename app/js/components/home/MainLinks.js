'use strict';

import React from 'react';

const MainLinks = React.createClass({
    render: function() {
        return (
            <div className="main-links">
                <div className="main-link">
                    <div className="link-icon"><i className="fa fa-graduation-cap"></i></div>
                    <div className="link-title">Sessions / Tutorials</div>
                </div>
                <div className="main-link">
                    <div className="link-icon"><i className="fa fa-book"></i></div>
                    <div className="link-title">Standards &amp; Procedures</div>
                </div>
                <div className="main-link">
                    <div className="link-icon"><i className="fa fa-bar-chart"></i></div>
                    <div className="link-title">Reusable Components</div>
                </div>
                <div className="main-link">
                    <div className="link-icon"><i className="fa fa-user"></i></div>
                    <div className="link-title">New Starters</div>
                </div>
                <div className="main-link">
                    <div className="link-icon"><i className="fa fa-group"></i></div>
                    <div className="link-title">Meetups</div>
                </div>
                <div className="main-link">
                    <div className="link-icon"><i className="fa fa-link"></i></div>
                    <div className="link-title">Links</div>
                </div>
            </div>
        );
    }
});

export default MainLinks;



