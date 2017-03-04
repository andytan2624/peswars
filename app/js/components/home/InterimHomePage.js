'use strict';

import React  from 'react';
import {Link} from 'react-router';


const InterimHomePage = React.createClass({
    render: function() {
        return (
            <div className="main-links">
                <div className="col-sm-6">
                    <Link to="/desk-plan">
                        <figure className="effect-zoe">
                            <img style={{width:'100%'}} src="/images/desk_plan_screenshot.png" alt="4mation Desk Plan" />
                            <figcaption>
                                <h2>4mation seating plan</h2>
                                <p className="description">Hover over the desks to see who sits there</p>
                            </figcaption>
                        </figure>
                    </Link>
                </div>
                <div className="col-sm-6">
                    <Link to="/staff">
                        <figure className="effect-zoe">
                            <img style={{width:'100%'}} src="/images/staff_page_screenshot.png" alt="4mation Desk Plan" />
                            <figcaption>
                                <h2>4mation staff listing</h2>
                                <p className="description">Search for staff members by name, team, skill even phone number!</p>
                            </figcaption>
                        </figure>

                    </Link>
                </div>
            </div>
        );
    }
});

export default InterimHomePage;