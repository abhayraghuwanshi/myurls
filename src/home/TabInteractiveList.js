import * as React from 'react';
import List from '@mui/material/List';
import { ListItem, ListItemAvatar, ListItemText, IconButton, Card } from '@mui/material';
import './main-page.css';


export default function TabInteractiveList({ urlData }) { // Destructure urlData

  return (
      <Card  className='card-data'>
        <List className='card-data-list'>
          {urlData && urlData.length > 0 ? (
            urlData.map((singleData, index) => (
              <a href={singleData.href} style={{ textDecoration: 'none', color: 'inherit' }} key={index}>
                <ListItem className='card-data-list-item'
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      {/* You can add your delete icon here */}
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    {/* Remove Avatar and directly use the img tag */}
                    <img
                      src={singleData.icon}
                      alt={singleData.shortName}
                      style={{ maxWidth: 40, maxHeight: 40 }} // Max size constraint for logos
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={singleData.shortName}
                    secondary={singleData.description}
                  />
                </ListItem>
              </a>
            ))
          ) : (
            <p>No data available</p>
          )}
        </List>
      </Card>
  );
}
