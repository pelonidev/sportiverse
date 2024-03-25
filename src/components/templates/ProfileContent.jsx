import React from 'react';

const ProfileContent = ({ userData }) => {
    console.log(userData)
    return (<div>
        <p>{userData.user.email}</p>
    </div>)
}

export default ProfileContent;