'use client';
import { useState } from 'react';
import { addPlayer } from '../../lib/api';

export default function AddPlayerPage() {
  const [formData, setFormData] = useState({ name: '', team: '', acs: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await addPlayer({ ...formData, acs: parseFloat(formData.acs) });
    alert("Player added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="team" placeholder="Team" onChange={handleChange} />
      <input name="acs" placeholder="ACS" onChange={handleChange} />
      <button type="submit">Add Player</button>
    </form>
  );
}
