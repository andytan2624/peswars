'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';
import _        from 'lodash';
import CategoryList  from '../components/CategoryList';
import Header        from '../components/Header';
import Footer        from '../components/Footer';
import WPApi    from '../utils/WP-Api';


const CategoryPage = React.createClass({

    getInitialState() {
        return {
            categoryPosts: [],
            category: this.props.params.category,
            categoryDescription: '',
            categoryTitle: ''
        }
    },

    componentWillMount() {
        this.fetchCategory();
    },

    componentWillReceiveProps() {
        this.fetchCategory();
    },

    render() {

        return (
            <DocumentTitle title="Staff">
                <div>
                    <Header currentPage="Categories" />
                    <section className="categories-page">
                        <h2>
                            {this.state.categoryTitle}
                        </h2>
                        <div>{this.state.categoryDescription}</div>

                        {this.listCategoryPosts()}

                        <div>
                            <Link to="/">Back to Home</Link>
                        </div>
                    </section>
                    <Footer />
                </div>
            </DocumentTitle>
        );
    },

    fetchCategory() {
        // get stuff from the api, then send it to the listCategories function
        WPApi.get('posts?filter[category_name]=' + this.state.category).then( (posts)=>{
            this.setState({
                categoryPosts: posts
            })
        });

        WPApi.get('categories?slug=' + this.state.category).then( (desc)=>{
            this.setState({
                categoryDescription: desc[0].description,
                categoryTitle: desc[0].name
            })
        });

        // categoryDescription
    },

    listCategoryPosts: function() {
        return _.map(this.state.categoryPosts,function(item,i){
            return (
                <div className="col-xs-12">
                    <Link to={item.slug} key={i}>{item.title.rendered}</Link>
                </div>
            )
        })
    }


});

export default CategoryPage;