'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [profilePic, setProfilePic] = useState();

  useEffect(() => {
    axios.get('http://localhost:3000/api/user/profile').then((res) => {
      setProfilePic(res.data.avatarUrl);
    });
  }, []);

  return (
    <div>
      <h1>Welcome User</h1>
      {profilePic}
    </div>
  );
}
