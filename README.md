# TripNest - React Application

TripNest is a visually appealing and feature-rich travel booking platform built with React. The project demonstrates a functional booking experience, where users can view property details, make reservations, calculate pricing, and read reviews. The app integrates a JSON server as a backend to store and retrieve data dynamically.

## Features

- **Property Details:** Display details of available properties, including title, price, images, and host details.
- **Date Selection:** Interactive date pickers for selecting check-in and check-out dates.
- **Dynamic Pricing:** Automatically calculates the total price based on the number of nights and additional service fees.
- **Guest Count:** Allows users to specify the number of guests.
- **Booking Confirmation:** Saves reservations to a JSON server.
- **Reviews:** Displays customer reviews for properties.
- **Responsive Design:** Fully responsive and optimized for all devices.

## Technology Stack

### Frontend
- **React:** For building the UI components.
- **React Router:** For navigation between pages.
- **React DatePicker:** For date selection.
- **CSS/Inline Styling:** For styling components.

### Backend
- **JSON Server:** Simulates a REST API to handle data dynamically.

## Project Structure

```plaintext
├── public
│   ├── index.html          # Main HTML file
│   ├── data.json           # Static JSON data (if required)
│   └── assets              # Images and other static assets
├── src
│   ├── components          # Reusable React components
│   ├── pages
│   │   ├── Booking.jsx     # Main booking page
│   │   └── AdminTable.jsx  # Admin table to manage bookings (if applicable)
│   ├── App.js              # Main app file
│   ├── index.js            # Entry point
│   └── Style.css           # Global styling
├── dist                    # Production build folder
├── package.json            # Dependencies and scripts
├── vite.config.js          # Configuration for Vite
├── vercel.json             # Rewrites configuration for Vercel
└── README.md               # Project documentation
```

## Installation and Setup

### Prerequisites
- Node.js and npm installed.


## Deployment

### Hosting on Vercel
1. Build the app:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to Vercel.

### JSON Server Deployment
If using JSON Server, deploy it separately using platforms like Render, Railway, or another Node.js hosting service.

## Usage

### Booking a Property
1. Select check-in and check-out dates.
2. Specify the number of guests.
3. Review the calculated total and grand total.
4. Click the "Reserve" button to save the booking.

### Viewing Reviews
Scroll to the "Reviews" section to view customer feedback and ratings for the property.

## Future Enhancements
- Add user authentication and profile management.
- Integrate a live backend service for dynamic data.
- Expand the features to include multi-property booking.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your enhancements.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

### Author
Manya Sharma  



