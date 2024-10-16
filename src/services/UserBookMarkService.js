import { useState } from "react";

export default function useBookmarkService() {
    const [allItems, saveNewItem] = useState([]);

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

    const data = [
        {
          label: 'Tab 1',
          cards: [
            {
              subLabel: 'Card 1',
              bookmarks: [
                {
                  href: 'https://youtube.com/',
                  icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABx0lEQVQ4jZ2TQWtTQRDHfzO7yUsNKSG0heJJ0YKnCvVSkHrV7+BBeu7Vk9+lH8CLN6EXk4Lo1V48lGClFBELGmmSmr73djy8fS8vll4c+LO7s7OzM///LhQmBmrg+uDtZrgIBQQAKyf/YQbiBexFt9t9niSP7ji3umrW7og0UfWL0ZaOzGYjmBxn2c/BdPpJxuNz+vDwFxxnqmaqZs4V8L5AuS6haqmqXcDpO3jCEN4YmEFmkMcxrSCSGqSh8GcGIY52Am91Ce5HJ5EYBRwbG45222HmUHVS+DX2DhASuKu3oAeolGSqCiDs7gqHh8L2thCCxOQSbxFAO9BToClzNQSJokwmsLUFgwHs78P6eklnlQho6c0axUKbTVhZgUYjHpeqCwE8kMWFxYNF9uVlGA5hbw8ODuqJzajqnPENPtfYDxU2N4OtrRVzkVDfC0V8/h2G/g98AR7ESkJF8tFRcYdzkOf15iRW6y/hlD48voCz+BbmELFrvhrG8OMjPBOAV3D7qXM791R73Var00qSJRoNTyifB5Dn+eVsNv19dTX+mmWj93n+4SWciM1LKkmqy7RoImFBqPqPfH39K7t/4A18f74nAH8Bjm35s3ZkOjEAAAAASUVORK5CYII=',
                  shortName: 'Youtube',
                  description: 'youtube hello',
                },
              ],
            },
          ],
        },
      ]

    const handleAddBookmark = (folder, subFolder, bookmarks) => {
        const newBookmark = {
            label: folder,
            cards: [
                {
                    subLabel: subFolder,
                    bookmarks: bookmarks,
                }
            ]
        };
        console.log("Bookmark to be added: ", newBookmark);

        // Update the state by adding new bookmarks
        saveNewItem((prevItems) => [...prevItems, newBookmark]);

        // In the future, you can add an HTTP request here
        // Example using fetch (commented for now):
        /*
        fetch('your-api-endpoint/bookmarks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBookmark),
        }).then((response) => {
            // handle response
        }).catch((error) => {
            // handle error
        });
        */
    };

    const getCollections = () => {
        console.log("fetching collections from service");
        return sampleData;
    }

    const fetchBMforUser = () => {
        console.log("fetching Bookmark for a user from service");
        return data;
    }

    const addBookmarkTabForUser = (newTab) => {
        console.log("adding new tab for a user from service");
        data.push(newTab);
    }

    const addBookmarkCardForUser = (index, newCard) => {
        console.log("adding new card for a user ");
        data[index].cards.push(newCard);
    }

    const addNewBookMarkInCard = (tabIndex, cardIndex, newBookmark) =>{
        data[tabIndex].cards[cardIndex].bookmarks.push(newBookmark);
    }


    // For now, we're just exposing the handleAddBookmark method and the current bookmarks list
    return {
        allItems,
        handleAddBookmark,
        getCollections,
        fetchBMforUser,
        addBookmarkTabForUser,
        addBookmarkCardForUser,
        addNewBookMarkInCard
    };
}
