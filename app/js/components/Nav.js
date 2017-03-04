'use strict';

import React     from 'react';
import {Link}    from 'react-router';
import _         from 'lodash';
import SearchBar from './SearchBar';

const Nav = React.createClass({

    getDefaultProps: function() {
        return {
            menuItems: [
                {
                    name: 'Home',
                    link: '/'
                },
                {
                    name: 'Office Layout & Seating Plan',
                    link: '/desk-plan'
                },
                {
                    name: 'Staff Listing',
                    link: '/staff'
                }
            ]
        }
    },

    render: function() {
        return (
            <nav className="navbar navbar-light bg-faded">

                <a className="navbar-brand" href="">Training</a>
                <ul className="nav navbar-nav">
                    {this.generateMenuItems()}
                </ul>
                {/* <SearchBar />*/}
            </nav>
        );
    },

    generateMenuItems: function() {
        return _.map(this.props.menuItems,function(item,i){
            return (
                <li className="nav-item" key={i}>
                    <Link activeClassName="active" className="nav-link" to={item.link}>{item.name}</Link>
                </li>
            )
        })
    }


});

export default Nav;