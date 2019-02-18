import React from 'react';
import AdminLayout from '../components/admin/nav/AdminLayout'

const adminLayout = (props) => {
    return (
        <div className="admin_container">
            <div className="admin_left_nav">
                <AdminLayout/>
            </div>
            <div className="admin_right">
                {props.children}
            </div>
        </div>
    );
};

export default adminLayout;