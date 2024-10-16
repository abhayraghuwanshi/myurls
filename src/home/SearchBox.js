import React, { useState } from 'react';
import { TextField, List, ListItem, ListItemText } from '@mui/material';

export default function SearchBox({ bookmarks }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='main-searchbox'>
      <TextField
        label="Search Bookmarks"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <List>
        {filteredBookmarks.length > 0 ? (
          filteredBookmarks.map((bookmark, index) => (
            <ListItem key={index} button>
              <ListItemText
                primary={bookmark.shortName}
                secondary={bookmark.description}
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No bookmarks found" />
          </ListItem>
        )}
      </List>
    </div>
  );
}
