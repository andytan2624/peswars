'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';
import CategoryList  from '../components/CategoryList';
import Header        from '../components/Header';
import Footer        from '../components/Footer';


const CategoriesPage = React.createClass({
    render() {

        return (
            <DocumentTitle title="Staff">
                <div>
                    <Header currentPage="Categories" />
                    <section className="categories-page">
                        <div>
                            Categories
                        </div>

                        <CategoryList />

                        <div>
                            <Link to="/">Back to Home</Link>
                        </div>
                    </section>
                    <Footer />
                </div>
            </DocumentTitle>
        );
    }

});

export default CategoriesPage;