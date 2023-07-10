import React from 'react';

const AdminPage = ({ inquiries }) => {
    return (
        <div>
            {inquiries.map((inquiry, index) => (
                <div key={index}>
                    <h3>{inquiry.title}</h3>
                    <p>{inquiry.content}</p>
                </div>
            ))}
        </div>
    );
};

export default AdminPage;