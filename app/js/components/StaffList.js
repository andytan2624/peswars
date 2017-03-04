'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import StaffStore from '../stores/StaffStore';
var Reflux = require('reflux');
import StaffActions from '../actions/StaffActions';
import _ from 'lodash';
import {Link} from 'react-router';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const StaffList = React.createClass({

    mixins: [Reflux.listenTo(StaffStore,'onChange')],

    getInitialState(){
        return {
            staff: [],
            filter: '',
            sortBy: 'team_name' // default
        };
    },

    componentWillReceiveProps(nextProps) {
        StaffActions.fetchStaff();
    },

    componentWillMount() {
        StaffActions.fetchStaff();
    },

    handleChange(event) {
        this.setState({
            filter: event.target.value
        });

    },

    handleSortChange(event) {
        this.setState({
            sortBy: event.target.value
        });
    },

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.filterInput).focus();
    },

    render() {
        return (
            <div className="staff-list">
                <br/>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="input-group input-group-lg">
                        <span className="input-group-addon">Filter:</span><input ref="filterInput" type="text" className="form-control" placeholder="Name / Skill / Team Name / Position " name="team" value={this.state.filter} onChange={this.handleChange} /></div>
                    </div>
                </div>

                <div style={{marginTop: 30}}>Sort By:
                    <select onChange={this.handleSortChange}>
                        <option value="team_name">Team</option>
                        <option value="name">Name</option>
                        <option value="id">ID</option>
                    </select>
                </div>
                <br/>
                <br/>
                <div className="row">
                    {this.listStaff()}
                </div>
            </div>
        );
    },

    searchStaff: function(searchTerm,obj){
        return _.some(_.values(obj), function (s) {
            return _.isString(s) ? s.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) !== -1 : '' + s === searchTerm.trim().toLowerCase();
        });
    },

    listStaff: function() {
        var searchTerm = this.state.filter || '';
        return _.map(_.sortBy(this.state.staff,this.state.sortBy),function(staff,i){
            if(searchTerm == '' || this.searchStaff(searchTerm,staff)) {
                return(
                    <div className="col-lg-4 col-md-6 col-sm-12" key={staff.id}>
                        <div className="card">
                            <img className="card-img-top" src={"/images/"+staff.jira_user_name+'.png'} alt="Card image cap" />
                            <div className="card-block">
                                <h4 className="card-title">{staff.name}</h4>
                                <p style={{fontStyle:'italic'}} className="card-text">{staff.role_name}</p>
                                <p><Link to={'/desk-plan/' + staff.desk_id}>Show on office map</Link></p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Team: {staff.team_name}</li>
                                <li className="list-group-item">Extension: 1{staff.ext}</li>

                                <li className="list-group-item">
                                    Skills: { _.map(staff.skills,function(expert,skill){
                                        let classNames = 'skills-btn btn-sm btn btn-primary';
                                        classNames += !!expert ? ' expert' : '';
                                        return (<span className={classNames} key={"skill-"+skill} to="">{skill}</span>)
                                    })}
                                </li>
                            </ul>
                            <div className="card-block">
                                <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a>
                            </div>
                        </div>
                    </div>
                )
            }
        }.bind(this))
    },

    onChange: function(event,staff) {
        this.setState({staff:staff.Staff});
    }
});

export default StaffList;
