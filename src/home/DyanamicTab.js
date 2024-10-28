import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Card, CardContent, IconButton, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useBookmarkService from '../services/UserBookMarkService';
import AddNewLink from './AddNewLink';
import CustomTabPanel from './CustomTabPanel';
import './main-page.css';
import TabInteractiveList from './TabInteractiveList';


export default function DynamicTabs() {
  const myService = useBookmarkService();
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const myUrlData = myService.fetchBMforUser();
      setTabs(myUrlData); // Set to array or empty array from service
    };

    fetchData();
  }, []);

  const [value, setValue] = useState(0);
  const [editIndex, setEditIndex] = useState(-1); // Track which tab is being edited
  const [editLabel, setEditLabel] = useState(''); // Track the input value for the tab label
  const [editCardIndex, setEditCardIndex] = useState(null); // Track which card is being edited

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setEditIndex(-1); // Reset edit mode when changing tabs
    setEditCardIndex(null); // Exit card edit mode when changing tabs
  };

  // Function to add a new tab
  const addNewTab = () => {
    const newTab = {
      label: `New Tab ${tabs.length + 1}`,
      cards: [],
    };
    setTabs([...tabs, newTab]);
    setValue(tabs.length); // Automatically switch to the new tab
  };

  // Function to add a new card to a tab
  const addNewCard = (tabIndex) => {
    const updatedTabs = [...tabs];
    const newCard = {
      subLabel: `New Card ${updatedTabs[tabIndex].cards.length + 1}`,
      bookmarks: [],
    };
    updatedTabs[tabIndex].cards.push(newCard);
    setTabs(updatedTabs);
  };

  // Handle tab label edit
  const handleEditLabel = (index) => {
    setEditIndex(index);
    setEditLabel(tabs[index].label); // Set the current label to the input field
  };

  // Save the edited label
  const handleSaveLabel = (index) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].label = editLabel;
    setTabs(updatedTabs);
    setEditIndex(-1); // Exit edit mode
  };

  const handleInputChange = (e) => {
    setEditLabel(e.target.value);
  };

  // Function to add new bookmark to a card
  const addNewBookmark = (tabIndex, cardIndex, newBookmark) => {
    const updatedTabs = [...tabs];
    updatedTabs[tabIndex].cards[cardIndex].bookmarks.push(newBookmark);
    setTabs(updatedTabs);
  };

  // Handle card label edit
  const handleEditCardLabel = (tabIndex, cardIndex) => {
    setEditCardIndex({ tabIndex, cardIndex });
    setEditLabel(tabs[tabIndex].cards[cardIndex].subLabel); // Set the current card sublabel to the input field
  };

  // Save the edited card sublabel
  const handleSaveCardLabel = (tabIndex, cardIndex) => {
    const updatedTabs = [...tabs];
    updatedTabs[tabIndex].cards[cardIndex].subLabel = editLabel;
    setTabs(updatedTabs);
    setEditCardIndex(null); // Exit card edit mode
  };

  console.log(tabs);

  return (
    <div className="tab-list">
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="dynamic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={
                (editIndex === index) ? (
                  <TextField
                    value={editLabel}
                    onChange={handleInputChange}
                    onBlur={() => handleSaveLabel(index)} // Save on blur
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSaveLabel(index);
                    }} // Save on Enter key
                    size="small"

                  />
                ) : (
                  <span onDoubleClick={() => handleEditLabel(index)} style={{ cursor: 'pointer' }}>
                    {tab.label}
                  </span>
                )
              }
            />
          ))}
          {/* Add New Tab Button */}
          <IconButton onClick={addNewTab}>
            <AddIcon />
          </IconButton>
        </Tabs>

        {/* Display Tab Panels */}
        {tabs && tabs.map((tab, tabIndex) => (
          <CustomTabPanel key={tabIndex} value={value} index={tabIndex}>
            {/* Flexbox Container to display cards side by side */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {tab.cards.map((card, cardIndex) => (
                <Card key={cardIndex} className='card-1' variant="outlined" sx={{ flex: '2 2 auto' }}>
                  <CardContent>
                    {editCardIndex && editCardIndex.tabIndex === tabIndex && editCardIndex.cardIndex === cardIndex ? (
                      <TextField
                        value={editLabel}
                        onChange={handleInputChange}
                        onBlur={() => handleSaveCardLabel(tabIndex, cardIndex)} // Save on blur
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSaveCardLabel(tabIndex, cardIndex);
                        }} // Save on Enter key
                        size="small"
                        autoFocus
                      />
                    ) : (
                      <Typography
                        variant="h6"
                        onDoubleClick={() => handleEditCardLabel(tabIndex, cardIndex)} // Enable double-click to edit card label
                        style={{ cursor: 'pointer' }}
                      >
                        {card.subLabel}
                      </Typography>
                    )}
                    <TabInteractiveList urlData={card.bookmarks} />
                    <AddNewLink addBookmark={(newBookmark) => addNewBookmark(tabIndex, cardIndex, newBookmark)} />
                  </CardContent>
                </Card>
              ))}
            </Box>
            <Button onClick={() => addNewCard(tabIndex)} startIcon={<AddIcon />}>
              Add New Card
            </Button>
          </CustomTabPanel>
        ))}
      </Box>
    </div>
  );
}
