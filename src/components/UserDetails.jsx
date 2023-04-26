import React from 'react';

const UserDetails = () => {

  return (
    <div className='flex-container row'>
      {/*<div className="avatar"><img src={avatar} alt=""/></div>*/}
      <div className="userProfileInput">
        <form action="" className="profile-input">
          <label htmlFor="name">Name</label>
            <input type="text" name='name' />
          <label htmlFor="surname"></label>
            <input type="text" name='surname'/>
          <label htmlFor="location">Location</label>
            <input type="text" name='location'/>
          <label htmlFor="description">Additional info</label>
            <textarea name='description'/>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
