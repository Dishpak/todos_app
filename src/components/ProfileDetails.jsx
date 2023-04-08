import React from 'react';

const ProfileDetails = () => {
  return (
    <>
      <form action="">
        <label htmlFor="name">Name</label>
          <input type="text" name='name'/>
        <label htmlFor="surname"></label>
          <input type="text" name='surname'/>
        <label htmlFor="location">Location</label>
          <input type="text" name='location'/>
        <label htmlFor="description">Additional info</label>
          <textarea name='description'/>
      </form>
    </>
  );
};

export default ProfileDetails;
