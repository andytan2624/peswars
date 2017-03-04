'use strict';

import React    from 'react';
import _        from 'lodash';
import {Link}   from 'react-router';
import WPApi    from '../utils/WP-Api';

const CategoryList = React.createClass({

    getInitialState(){
        return {
            categories: []
        }
    },

    componentWillReceiveProps(nextProps) {
        this.fetchCategories();
    },

    componentWillMount() {
        this.fetchCategories();
    },
    render() {
        return (
            <div className="category-list">
                <br/>
                <div className="row">
                    {this.listCategories()}
                </div>
            </div>
        );
    },

    fetchCategories() {
        // get stuff from the api, then send it to the listCategories function
        WPApi.get('categories?per_page=99').then( (categories)=>{
            this.setState({
                categories: categories
            })
        });
    },

    listCategories: function() {
        return _.map(this.state.categories,function(item,i){
            return (
                <div className="col-xs-12">
                    <Link to={'/categories/' + item.slug} key={i} >{item.name}</Link>
                </div>
            )
        })
    }
});

export default CategoryList;