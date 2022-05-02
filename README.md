# Widget box (news)

Write the code for a widget box (news), which has to display 15 news, with pagination (3 pages). The news will be taken through API, calling: http://www.mocky.io/v2/58fda6ce0f0000c40908b8c8. 
The API will reply with something like: 
{
    "news": [
        { "title": "First news", details: "This is a detailed description" },
        { "title": "Second news", details: "Detailed text for this item" },
        ...
    ]
}

The design can be improved, keeping the elements and placement of the following wireframe:

![image](https://user-images.githubusercontent.com/42377363/166248268-1eabd0e6-29fd-4646-8e21-b91e9ea76b5a.png)

- The 3 dots must switch pages and the current page must be highlighted.
- Every 15 seconds, the next page should be displayed.
- The Widget must update every 3 minutes reloading the page.

# Implementation

The implementation of the problem can be seen [here](https://justicebringer.github.io/Widget-box-news/).

![image](https://user-images.githubusercontent.com/42377363/166306646-63bdb322-12d6-4ff1-aa8c-f68569793d85.png)

Added following bonuses:

- On initial load, news are saved to local storage
- Refreshing the page will re-fetch news only if 3 minutes have passed
- On initial load, a loading animation is showed to the user
- On page transition, the old news list fades away

### Technologies used

- HTML5, CSS3, JavaScript ES6
