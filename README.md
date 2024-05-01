
# MERN GIS Web Map Application

This project is a MERN (MongoDB, Express.js, React.js, Node.js) stack application that creates an interactive web map using Geographic Information System (GIS) data. The application consists of a backend built with Node.js and Express.js, a MongoDB database to store spatial data, and a frontend dashboard developed with React.js.

**Installation**

1. Clone the repository to your local machine:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd MERN-GIS-Web-Map-Application
   ```

3. Install dependencies for the backend:
   ```
   cd backend
   npm install
   ```

4. Install dependencies for the frontend dashboard:
   ```
   cd ../frontend/dashboard
   npm install
   ```

**Backend Setup**

1. Edit the database details in the `server.js` file located in the `backend` folder. Ensure that MongoDB connection details are correctly configured.

2. Import the `final.csv` file into the MongoDB database to populate the data. You can use tools like MongoDB Compass or the `mongoimport` command-line tool for this purpose.

3. Run the backend server using `nodemon`:
   ```
   nodemon server.js
   ```
   The backend will run on `localhost:3000`.

**Frontend Setup**

1. Navigate to the `dashboard` folder inside the `frontend` directory:
   ```
   cd ../frontend/dashboard
   ```

2. Run the frontend dashboard:
   ```
   npm start
   ```
   The frontend dashboard will run on `localhost:3001`.

**Usage**

1. Access the web application by opening your web browser and navigating to `localhost:3001`.

2. Explore the interactive web map to visualize and analyze GIS data.

3. Interact with the dashboard interface to perform various tasks related to spatial data analysis.

4. Make sure both the backend and frontend servers are running concurrently for full functionality of the application.

**Contributing**

Contributions are welcome! If you'd like to contribute to this project, feel free to submit a pull request with your improvements or suggestions.

**License**

This project is licensed under the [MIT License](LICENSE). Feel free to modify and use it according to your needs.
