# Tiago Coelho's challenge for Inspire IT

This is my solution to the technical challenge proposed by Inspire.

## Getting Started

Both in the fe and server directories run 'npm install' to install all the node modules used.\
Run 'npm run dev' on the server directory to start the server (you should be using node v12.13.0 or higher).\
Run 'npm start' on the fe directory to start the frontend client.

## About the project

### `frontend`

I used a create-react-app typescript template to generate the initial boilerplate.\
For state management I used Redux (for global state), react useState hooks (for local state) and context(to handle modals).\
For styles I used Sass.

### `backend`

Built a simple Express server using Node with typescript. As the connection to a database would be a bit of an overkill for a project this size I just used some arrays on the server app to act as 'fake databases'.

### `Design`

I designed the game with figma and in this link you'll find all of the components as well as the mockups - https://www.figma.com/file/iBFoHRvID2pQXKUiYy25gb/Inspire?node-id=0%3A1


