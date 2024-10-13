import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

export default function AddNewLink({ addBookmark }) { // Receive addBookmark function as a prop
  const [showForm, setShowForm] = useState(false);
  const [newBookmark, setNewBookmark] = useState({ shortName: '', description: '', href: '', icon: '' });

  const handleFormToggle = () => setShowForm(!showForm);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBookmark(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddBookmark = () => {
    addBookmark(newBookmark); // Call the parent function to add the new bookmark
    setShowForm(false); // Hide form after submission
  };

  return (
    <Box>
      <Button onClick={handleFormToggle}>
        {showForm ? 'Cancel' : '+'}
      </Button>

      {showForm && (
        <Box>
          <TextField
            label="Short Name"
            name="shortName"
            value={newBookmark.shortName}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            name="description"
            value={newBookmark.description}
            onChange={handleInputChange}
          />
          <TextField
            label="URL"
            name="href"
            value={newBookmark.href}
            onChange={handleInputChange}
          />
          {/* <TextField
            label="Icon URL"
            name="icon"
            value={newBookmark.icon}
            onChange={handleInputChange}
          /> */}
          <Button onClick={handleAddBookmark}>
            Add Bookmark
          </Button>
        </Box>
      )}
    </Box>
  );
}
