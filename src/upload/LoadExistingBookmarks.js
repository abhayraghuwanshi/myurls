import React, { useState } from 'react';
import useBookmarkService from '../services/UserBookMarkService';


const BookmarkUploader = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const service = useBookmarkService();

  const convertToTabFormat = (parsedBookmarks) => {

    return parsedBookmarks.map((data, index) => ({
      label: data.folder, // Generate Tab labels dynamically
      cards: [{
        subLabel: data.folder, // Generate Card labels dynamically
        bookmarks: data.links.map((link) => (
          {
            href: link.url,
            icon: link.icon || '', // Assuming the icon is part of the parsed data
            shortName: link.name,
            description: link.description || '', // Add a description if available
          }))
      }]
    }))
  };

  
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        parseBookmarks(content);
      };
      reader.readAsText(file);
    }
  };

  const parseBookmarks = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Extract bookmark folders and links
    const bookmarkFolders = doc.querySelectorAll('DL > DT > H3');
    const bookmarkLinks = doc.querySelectorAll('DL > DT > A');

    const extractedBookmarks = [];
    bookmarkFolders.forEach((folder) => {
      const folderName = folder.textContent;
      const folderBookmarks = Array.from(folder.parentElement.querySelectorAll('A')).map((link) => ({
        name: link.textContent,
        url: link.getAttribute('HREF'),
        addDate: link.getAttribute('ADD_DATE'),
      }));

      extractedBookmarks.push({ folder: folderName, links: folderBookmarks });
    });

    console.log(extractedBookmarks);
    service.save(convertToTabFormat(extractedBookmarks));

    setBookmarks(extractedBookmarks);
  };

  return (
    <div>
      <h2>Upload Bookmark File</h2>
      <input type="file" accept=".html" onChange={handleFileChange} />
      {/* <div>
        <h3>Extracted Bookmarks:</h3>
        {bookmarks.map((folder, index) => (
          <div key={index}>
            <h4>{folder.folder}</h4>
            <ul>
              {folder.links.map((bookmark, i) => (
                <li key={i}>
                  <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                    {bookmark.name}
                  </a> (Added: {new Date(parseInt(bookmark.addDate, 10) * 1000).toLocaleString()})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default BookmarkUploader;
