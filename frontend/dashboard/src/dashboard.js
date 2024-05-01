import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useMapEvent } from 'react-leaflet';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';



import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-search/dist/leaflet-search.min.css';
import 'leaflet-geosearch/dist/geosearch.css';
import './dashboard.css';


import logo from './images/cropped_logo.jpg';
import markerIcon from './images/marker_blue.png';
import dottedMarkerIcon from './images/marker_dotted.png';
import gridImg from './images/fitness.png';

const SearchField = () => {
  const map = useMap();

  useEffect(() => {
 
      const provider = new OpenStreetMapProvider();
      // @ts-ignore
      const searchControl = new GeoSearchControl({
        provider: provider,
        style: 'bar',
        className: "geolocation-search-bar",
        marker: false,
      }).addTo(map);

      return () => map.removeControl(searchControl);
    
  }, [map]);

  return null;
};


const Dashboard = () => {
  const [originalVenues, setOriginalVenues] = useState([]);
  const [venues, setVenues] = useState([]);
  const [map, setMap] = useState(null);
  const [baseMap, setBaseMap] = useState({
    center: [37.723972, -122.431297],
    zoom: 12,
  });
  const [showActivitiesFilter, setShowActivitiesFilter] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState({
    dance: false,
    fitness: false,
    other: false,
  });
  const [searchInput, setSearchInput] = useState('');
  const [searchCenter, setSearchCenter] = useState(null); 
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const mapRef = useRef(null);

  const rowHeight = 100;
  const history = createBrowserHistory();

  const mapboxAccessToken = 'pk.eyJ1IjoibWFsYWlrYXNlaGVyIiwiYSI6ImNscTVpamR4ZTA4N28ybHA3bnVzODl6NncifQ.VIhkVDO12TDPFEzoWHza-A';

  useEffect(() => {
    const map = mapRef.current;

    if (map) {
      // Define your initial map settings
      map.setView([37.773972, -122.531297],11);

      // Add a tile layer (you can use any tile provider)
      L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`, {
        attribution: '&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> contributors',
        id: 'mapbox/streets-v11', // Change to 'mapbox/streets-simple-v10'
      }).addTo(map);
      
    }
  }, []);
  useEffect(() => {
    if (mapRef.current) {
      if (searchCenter) {
        mapRef.current.setView(searchCenter, baseMap.zoom);
      } 
    }
  }, [searchCenter, venues]);


  useEffect(() => {
    axios
      .get('http://localhost:3000/venues')
      .then((response) => {
        setVenues(response.data);
        setOriginalVenues(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  useEffect(() => {
    // Apply filter based on selected activities
    const filteredVenues = originalVenues.filter((venue) => {
      if (selectedActivities.dance && !venue.dance) return false;
      if (selectedActivities.fitness && !venue.fitness) return false;
      if (selectedActivities.other && !venue.other) return false;
      return true;
    });

    // Set the filtered venues
    setVenues(filteredVenues);
  }, [selectedActivities, originalVenues]);

  useEffect(() => {
    const filteredVenues = originalVenues.filter((venue) => {
      const isActivityMatch = !selectedActivity || venue[selectedActivity];
      const isSearchMatch = venue.className.toLowerCase().includes(searchInput.toLowerCase());
      return isActivityMatch && isSearchMatch;
    });

    setVenues(filteredVenues);
  }, [selectedActivity, searchInput, originalVenues]);

  const columns = [
    {
      field: 'image',
      headerName: 'Visit Site',
      width: 100,
      renderCell: (params) => (
       <Link to={params.row.classTrialURL} target="_blank" rel="noopener noreferrer">
            <img
              src={gridImg}
              alt="Venue"
              style={{ width: '100%', height: 'auto' }}
            />


          </Link>
        
      ),
      disableColumnMenu: true,
    },
    {
      field: 'combinedInfo',
      width: 300,
      headerName: "Venue",
      renderCell: (params) => (
        <div>
          <strong>{params.row.className}</strong>
          <br />
          <div style={{ color: 'red', fontSize: '8' }}>
            Trial: {`${params.row.classDuration}`}
          </div>
          <div style={{ color: 'gray', fontSize: '6' }}>
            {` ${params.row.address}`}
          </div>
        </div>
      ),
      disableColumnMenu: true,
    },
    {
      field: 'classInfo',
      width: 400,
      headerName: "Details",
      renderCell: (params) => (
        <div style={{ whiteSpace: 'pre-line', overflowWrap: 'break-word' }}>
        {params.row.classInfo}
      </div>
      ),
      disableColumnMenu: true,
    }
  ];

  const rows = venues.map((row) => ({
    ...row,
    image: <img src={gridImg} alt="Venue" style={{ width: '100%', height: 'auto', marginBottom: '15px' }} />,
    combinedInfo: `${row.address}`,
  }));

  const validVenues = venues.filter((venue) => venue.latitude && venue.longitude);

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -32],
  });

  const hoveredIcon = new L.Icon({
    iconUrl: dottedMarkerIcon,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -30],
  });

  const markers = validVenues.map((venue, index) => (
    <Marker
      key={venue._id}
      position={[venue.latitude, venue.longitude]}
      icon={index === hoveredRowIndex ? hoveredIcon : customIcon}
    >
      <Popup>
        <div>
          <Link to={venue.classTrialURL} target="_blank" rel="noopener noreferrer">
            <img
              src={gridImg}
              alt="Venue"
              style={{ width: '100%', height: 'auto' }}
            />
          </Link>
          <strong>{venue.className}</strong>
          <br />
          <div style={{ color: 'red', fontSize: '8' }}>
            Trial: {`${venue.classDuration}`}
          </div>
          <div style={{ color: 'gray', fontSize: '6' }}>
            {` ${venue.address}`}
          </div>
        </div>
      </Popup>
    </Marker>
  ));

  



  const handleRowClick = (classTrialURL) => {
    window.open(classTrialURL, '_blank');
  };

  const handleRowHover = (index) => {
    console.log('Hovered Index:', index);
    setHoveredRowIndex(index);
  };
  
  

  const handleActivitiesFilterChange = (activity) => {
    setSelectedActivities((prevActivities) => ({
      ...prevActivities,
      [activity]: !prevActivities[activity],
    }));
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleLocationSearch = (event) => {
    const locationSearchValue = event.target.value;

    // Filter venues based on the location search
    const filteredVenues = originalVenues.filter((venue) => {
      const locationString = `${venue.city}, ${venue.county}, ${venue.state}`;
      return locationString.toLowerCase().includes(locationSearchValue.toLowerCase());
    });

    // Set the filtered venues
    setVenues(filteredVenues);

    // Set the search center to the last latitude and longitude
    if (filteredVenues.length > 0) {
      const lastVenue = filteredVenues[filteredVenues.length - 1];
      setSearchCenter([parseFloat(lastVenue.latitude), parseFloat(lastVenue.longitude)]);
    }
  };


  

  const handleClearFilters = () => {
    setSelectedActivities({
      dance: false,
      fitness: false,
      other: false,
    });
    setSelectedActivity(null);
    setSearchInput('');
    setVenues(originalVenues);
  };

  return (
    <Router history={history}>
      <div>
        {/* Header */}
        <header className="app-header">
          <img src={logo} alt="Logo" className="logo" />
          {/* Search bar */}
          <div className="search-bar">
            <div className="activity-search">
              <span className="search-icon">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.05 10.65a5.67 5.67 0 1 1 11.341 0 5.67 5.67 0 0 1-11.34 0zm5.67-7.42a7.42 7.42 0 1 0 4.5 13.321c.042.09.1.174.175.248l2.762 2.763a.875.875 0 0 0 1.238-1.238l-2.763-2.762a.876.876 0 0 0-.214-.157A7.42 7.42 0 0 0 10.72 3.23z" fill="currentColor"></path>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Yoga, pilates, massage..."
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              {searchInput && (
                <span className="clear-search" onClick={handleClearFilters}>
                  x
                </span>
              )}
            </div>

            <div className="location-search">
              <span className="search-icon">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.232 10.078c0 3.198-3.979 7.41-5.518 8.92a.848.848 0 0 1-1.196 0C9.978 17.488 6 13.276 6 10.078 6 6.721 8.738 4 12.116 4c3.377 0 6.116 2.721 6.116 6.078zm-3.892-.145c0 1.22-.996 2.21-2.224 2.21a2.217 2.217 0 0 1-2.224-2.21c0-1.22.996-2.21 2.224-2.21 1.228 0 2.224.99 2.224 2.21z" fill="currentColor"></path>
                </svg>
              </span>
              <input
                type="text"
                placeholder="City, neighborhood"
                onChange={handleLocationSearch}
              />

            </div>
          </div>

          <div className="header-buttons">
            <a href="#plans" className="header-button">Plans</a>
            <a href="#how-credits-work" className="header-button">How credits work</a>
            <a href="#log-in" className="header-button">Log in</a>
            <button className="header-button red-button">Get started</button>
          </div>

        </header>
        {/* Filters Container */}
        <div className="filters-container">
          {/* Vertical Filters */}
          <div className="vertical-filters">
            {/* Activities Button */}
            <button
              className="filter-button"
              onClick={() => setShowActivitiesFilter(!showActivitiesFilter)}
            >
              Activities
            </button>


            <button className="filter-button">Fitness</button>
            <button className="filter-button">Amenities</button>
            <button className="filter-button">Distance</button>


          </div>
        </div>
        {/* Expandable Activities Filter */}
        {showActivitiesFilter && (
          <div className="activities-filter">
            <div className="activity-options">
              <label>
                <input
                  type="checkbox"
                  checked={selectedActivities.dance}
                  onChange={() => handleActivitiesFilterChange('dance')}
                />
                <span>Dance</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedActivities.fitness}
                  onChange={() => handleActivitiesFilterChange('fitness')}
                />
                <span>Fitness</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedActivities.other}
                  onChange={() => handleActivitiesFilterChange('other')}
                />
                <span>Other</span>
              </label>
            </div>

            {/* Filter Controls */}
            <div className="filter-controls">
              <button className="filter-clear-button" onClick={handleClearFilters}>
                <span>Clear Filters</span>
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Container */}
        <div className="dashboard-container">
          <div className="grid">
            <DataGrid
              rows={venues}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row._id}
              rowHeight={rowHeight}
              onCellHover={(params) => handleRowHover(params.rowIndex)}
              disableColumnMenu
              className='data-grid-row'
            />
          </div>
          <div className="map">
            <MapContainer
              ref={mapRef}
              style={{ height: '100%' }}
              center={baseMap.center}
              zoom={baseMap.zoom}
            >
              
             
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
                attribution='&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> contributors'
                id='mapbox/streets-v11' // Change to 'mapbox/streets-simple-v10' if needed
              />


              {markers}
            </MapContainer>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;