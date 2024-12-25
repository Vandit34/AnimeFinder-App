// get the name of the GENRE from input tag into a variable to USE for genre parameter

// https://api.jikan.moe/v4/anime?q=${searchInput}
/*
document.addEventListener('DOMContentLoaded', function () {
//   const searchInput = document.getElementById('searchInput')
    const url = `https://api.jikan.moe/v4/anime?genres=Z${searchInput.value}`

    console.log(url);
    
  const fetchData = async (url) => {
      try {
        const fetchData=fetch(url)
    } catch (error) {
      console.error(`This error occured: ${error} `)
    }
  }
})

*/

document.addEventListener('DOMContentLoaded', () => {
  const url = `https://api.jikan.moe/v4/anime`

  const fetchData = async () => {
    try {
      const response = await fetch(url)
      console.log('Response data just after fetching:', response) // Log the response object directly

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response text:', errorText)
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const jsonData = await response.json()
      console.log('JSON Data:', jsonData.data)
      // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      let genres = []
      jsonData.data.map((item, index) => {
        const genreData = item.genres.map((value, index) => {
          genres.push(value.name)
        })
      })
      genres = [...new Set(genres)]

      const container = document.getElementsByClassName('container')[0]

      const animeColors = [
        '#FF9AA2',
        '#FFB7B2',
        '#FFDAC1',
        '#E2F0CB',
        '#B5EAD7',
        '#C7CEEA',
        '#AFCBFF',
        '#FFC3A0'
      ]

      const getAnimeColor = () => {
        const randomIndex = Math.floor(Math.random() * animeColors.length)
        return animeColors[randomIndex]
      }

      const elements = genres
        .map(element => {
          const animeColor = getAnimeColor()
          return `<span class="genre-tag" style=" 
            display: inline-block;
            background-color: ${animeColor}; 
            color: black; 
            padding: 8px 15px; 
            border-radius: 20px; 
            font-size: 14px; 
            font-weight: bold; 
            margin: 15px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); 
            text-transform: capitalize; cursor:pointer;
          "onmouseover="this.style.transform='perspective(100px) translateZ(20px)'; this.style.boxShadow='8px 8px 20px rgba(0, 0, 0, 0.4)';"
    onmouseout="this.style.transform='perspective(100px) translateZ(10px)'; this.style.boxShadow='5px 5px 15px rgba(0, 0, 0, 0.3)';">
            ${element}
          </span>`
        })
        .join('')

      if (container) {
        container.innerHTML = elements

        const tagElements = document.querySelectorAll('.genre-tag')
        // document.getElementsByClassName('genre-tag')

        const results = document.getElementById('results')

        tagElements.forEach(element => {
          element.addEventListener('click', e => {
            const tagName = e.target.textContent.trim()
            results.innerHTML = '' // Clear previous results

            jsonData.data.forEach(item => {
              item.genres.forEach(value => {
                if (value.name === tagName) {
                  // Add anime title and image to results
                  const animeCard = `
            <div style="
              display: inline-block;
              margin: 15px;
              padding: 10px;
              background-color: #f4f4f4;
              border-radius: 10px;
              box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
              text-align: center;
            ">
              <img src="${item.images.jpg.image_url}" alt="${item.title}" style="
                width: 150px;
                height: 200px;
                border-radius: 5px;
                object-fit: cover;
              " />
              <h3 style="
                font-size: 16px;
                font-weight: bold;
                margin: 10px 0 0;
              ">${item.title}</h3>
            </div>
          `
                  results.innerHTML += animeCard // Append each anime card
                }
              })
            })

            // If no results are found
            if (!results.innerHTML.trim()) {
              results.innerHTML =
                '<p style="color: red; font-weight: bold;">No results found for this genre.</p>'
            }
          })
        })
      } else {
        console.error('Container element not found!')
      }

      // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    } catch (error) {
      console.error('Error occurred:', error.message)
    }
  }

  fetchData()
})

//   title: "Cowboy Bebop"

/* genres: Array(3) [ {…}, {…}, {…} ]
​​​​
0: Object { mal_id: 1, type: "anime", name: "Action", … }
​​​​
1: Object { mal_id: 46, type: "anime", name: "Award Winning", … }
​​​​
2: Object { mal_id: 24, type: "anime", name: "Sci-Fi", … }

*/
