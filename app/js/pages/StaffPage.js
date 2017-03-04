'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';
import StaffList     from '../components/StaffList';
import Header        from '../components/Header';
import Footer        from '../components/Footer';

const StaffPage = React.createClass({
    render() {

        return (
            <DocumentTitle title="Staff">
                <div>
                    <Header currentPage="Staff" />
                    <section className="staff-page">
                        <div>
                            Staff Page
                        </div>
                        <StaffList />
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

export default StaffPage;
