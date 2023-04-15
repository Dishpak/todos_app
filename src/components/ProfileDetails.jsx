import React, {useState} from 'react';

const ProfileDetails = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const userName = JSON.parse(localStorage.getItem('userName'));

  return (
    <>
      <form action="">
        <label htmlFor="name">Name</label>
          <input type="text" name='name' value={userName} disabled/>
        <label htmlFor="surname">Surname</label>
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
