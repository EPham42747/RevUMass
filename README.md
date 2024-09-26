# RevUMass

A platform for students at the University of Massachusetts Amherst to discover and share ideas and opinions regarding on-campus life. Currently in-progress since September 2024.

RevUMass is a full-stack application built with React for the user interface, Express for the RESTful API, and MongoDB for data storage. Written by Ethan Pham and Daniel Kim.


## Installation and Usage

Fork the project to your device.

The repository has two top-level folders, `client` and `server`. To start the application's server or the development server for the user interface, `cd` into the respective folder and run `npm run start`.

The server listens to requests on port 3001 by default. Connect the client to the server using your local IP address: `http://<your_ip>:3001/`.


## Features

*Last updated 26 September 2024.*

Currently, the project includes some functional API calls and preliminary frontend work.

Planned functionality:

- Request authorization and user authentication
- User contribute functionality to add reviewable items


## Tests

This project also includes tests for API calls to the backend server. However, this requires the `.env` file with the connection string to the development database, so tests cannot be run on a forked version of the project. They are, however, included in `server/tests` for viewing.

Should you connect the server to your own MongoDB database, create a `.env` file with parameter `DB_URI` and set that equal to your connection string. Then, after `cd`-ing into the `server` folder, run `npm run test`.


## Authors

Server API and database management by [Ethan Pham](https://github.com/EPham42747)

User interface by [Daniel Kim](https://github.com/D-SehKim)


## License

[MIT](https://choosealicense.com/licenses/mit/)
