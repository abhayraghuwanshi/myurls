import React from 'react';

export default function MarketPlaceService() {

    const cardData = [
        {
          id:1,
          img: 'https://picsum.photos/800/450?random=1',
          tag: 'Engineering',
          title: 'Revolutionizing software development with cutting-edge tools',
          description:
            'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
          authors: [
            { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
            { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
          ],
        },
        {
          id:2,
          img: 'https://picsum.photos/800/450?random=1',
          tag: 'Engineering',
          title: 'Revolutionizing software development with cutting-edge tools',
          description:
            'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
          authors: [
            { name: 'sasa asa', avatar: '/static/images/avatar/1.jpg' },
            { name: 'asa as', avatar: '/static/images/avatar/2.jpg' },
          ],
        }
      ];

    const getCollections = () => {
        return cardData;
    }

    return {
        getCollections
    }

}