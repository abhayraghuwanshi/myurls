import { CheckBox } from '@mui/icons-material';
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Select, MenuItem, Button, InputLabel, FormControl } from '@mui/material';
import useBookmarkService from '../services/UserBookMarkService';

export default function MarketPlaceDetail() {

    // Sample folders and subfolders
    const folders = ['Movies', 'TV Shows', 'Anime'];
    const subFolders = ['Action', 'Comedy', 'Drama'];

    // Use the service (hook)
    const { handleAddBookmark, allItems } = useBookmarkService();
    const {getCollections, _} = useBookmarkService();
    const sampleData = getCollections();
    const [folder, setFolder] = useState('');
    const [subFolder, setSubfolder] = useState('');
    const [selectedBookmarks, setSelectedBookmarks] = useState(
        Array(sampleData.length).fill(false) // Initialize an array for checkbox states
    );

    const handleFolderChange = (event) => {
        setFolder(event.target.value);
    };

    const handleSubFolderChange = (event) => {
        setSubfolder(event.target.value);
    };

    const handleCheckboxChange = (index) => {
        const newSelected = [...selectedBookmarks];
        newSelected[index] = !newSelected[index]; // Toggle the checkbox state
        setSelectedBookmarks(newSelected);
    };

    const onAddBookmark = () => {
        const selectedBookmarksData = sampleData.filter((_, index) => selectedBookmarks[index]);

        // Add the new bookmark using the service
        handleAddBookmark(folder, subFolder, selectedBookmarksData);
    };

    return (
        <div style={{ marginLeft: '5%', marginRight: '5%', marginBottom: '4%' }}>

            <div style={{display: 'flex', flexDirection: 'row', gap: 8, justifyContent:'flex-start'}}>
                
                {/* Dropdown for Folder */}
                <div style={{width: '15%'}}> 
                    <FormControl>
                        <InputLabel id="folder-select-label">Folder</InputLabel>
                        <Select
                            labelId="folder-select-label"
                            id="folder-select"
                            value={folder}
                            label="Folder"
                            onChange={handleFolderChange}
                        >
                            {folders.map((folder, index) => (
                                <MenuItem key={index} value={folder}>{folder}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {/* Dropdown for Subfolder */}
                <div style={{width: '15%'}}>
                    <FormControl>
                        <InputLabel id="subfolder-select-label">Subfolder</InputLabel>
                        <Select
                            labelId="subfolder-select-label"
                            id="subfolder-select"
                            value={subFolder}
                            label="Subfolder"
                            onChange={handleSubFolderChange}
                        >
                            {subFolders.map((subFolder, index) => (
                                <MenuItem key={index} value={subFolder}>{subFolder}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <Button variant="contained" onClick={onAddBookmark}>Add BookMarks</Button>  
            </div>

            {/* Table for displaying bookmarks */}
            <Table aria-label="basic table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: '40%' }}>Select</TableCell>
                        <TableCell>Title</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sampleData.map((data, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <CheckBox
                                    checked={selectedBookmarks[index]} // Check if the current index is selected
                                    onChange={() => handleCheckboxChange(index)} // Handle checkbox change
                                />
                            </TableCell>
                            <TableCell>
                                <label>{data.shortName}</label>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
