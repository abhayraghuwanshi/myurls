import { useState, useEffect } from "react";

export default function useBookmarkService() {
    const [bookmarks, setBookmarks] = useState([]);
    
    useEffect(() => {
        const storedBookmarks = localStorage.getItem('bookmarks');
        if (storedBookmarks) {
          setBookmarks(JSON.parse(storedBookmarks));
        }
      }, []);
    
      // Save bookmarks to localStorage whenever the bookmarks state changes
      useEffect(() => {
        if (bookmarks.length > 0) {
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }
      }, [bookmarks]);



    const sampleData = [
        {
            href: 'https://netflix.com/',
            icon: 'data:image/png;base64,icon-data-here',
            shortName: 'Netflix',
            description: 'Watch TV Shows, Movies, and more.',
        },
        {
            href: 'https://www.primevideo.com/',
            icon: 'data:image/png;base64,icon-data-here',
            shortName: 'Amazon Prime Video',
            description: 'Stream movies, TV shows, and Amazon Originals.',
        },
        // Add more sample bookmark data here...
    ];
    
    const [allData, setAllData] = useState([])

    const getCollections = () => {   
        console.log("fetching collections from service");
        return sampleData;
    }

    const fetchBMforUser = () => {
        console.log("fetching Bookmark for a user from service");
        const storedBookmarks = localStorage.getItem('bookmarks');
        return storedBookmarks ? JSON.parse(storedBookmarks) : []; // Return an empty array if null
    }
    


    const save = (allData) => {
        console.log(allData);
        setBookmarks(allData);
    }


    // For now, we're just exposing the handleAddBookmark method and the current bookmarks list
    return {
        getCollections,
        fetchBMforUser,
        save
    };  
}
