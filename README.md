# note-taker
View notes stored in a JSON file, add new notes and delete existing notes leveraging an intuitive front end application.

## Description
The note taker pulls existing notes from a JSON file and displays them in the left hand column of the notes page on launch. This view can be seen below.
![Image of my app](.public/assets/imgs/Note_taker_initialize.png)

This project relied on the following technologies:
- Express routes to launch the homepage and notepage as well as GET, POST and DELETE API requests
- Path for acess to current directory names 
- UUID for euniqe identifier generation
- Heroku for posting the live app



## Installation
N/A

## Usage

See the published site: [here](https://note-taker-jat.herokuapp.com/)
- To use the app, open the home page and click the Get Started button to open the notes page.
    - The note page will automatically render existing notes from the JSON file on the left hand column in a card with the title visible.
    - To see further details about an existing note click on the notes card. Once this is done the full note will render on the rigth.
- To write a new note click on the plus button in the top right corner. A blank note card will appear on the right hand column and user input can be typed. 
    - Once a title and note body have been input a save button will render in the top right of the page. Clicking this save button creates a POST request to create a new note which is then rendered in the column of existing notes.
    ![Image of note taker with new note to be saved](.public/assets/imgs/Note_taker_new_note.png)
- To delete an existing note click the delete button on the existing notes in the left column. This will create a DELETE request which removes the clicked note from the JSON file and reloads the updated list of existing notes. 

## License
N/A