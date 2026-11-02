 
# Parkify

Parkify is a web application designed to help users find available parking spots in their city. The app offers real-time availability of parking spaces, pricing information, and a search feature to help users easily find parking locations near them. It provides essential details like operating hours, distance, and availability status, making parking more convenient for everyone.

## Features

- **Search Parking**: Search for parking spots by location, distance, and availability.
- **Real-Time Availability**: Check if a parking spot is available, limited, or fully occupied.
- **Parking Details**: Get detailed information on parking locations, including pricing per hour, operating hours, and available spots.
- **Filters**: Filter parking options by distance, availability, and other relevant criteria.
- **User Profile**: Manage reservations, and view parking history.
- **Multi-language Support**: Available in French for easy use in Francophone regions.

## Technologies

- **Frontend**:
  - React.js
  - Tailwind CSS
  - Vite for fast builds
  - React Router for navigation
- **Backend**:
  - Node.js (if backend APIs are used to store parking data)
  - REST API (to fetch parking spot data)
- **Others**:
  - Google Maps API (for location-based search)
  - Unsplash for stock images

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd Parkify
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be accessible at `http://localhost:3000`.

## Configuration

Make sure to configure the following environment variables if needed:

- **Google Maps API Key**: For location search and mapping features, make sure you set your Google Maps API key in the `.env` file.
- **Vite Configuration**: You may need to adjust Vite config files for production builds.

## Screenshots

![alt text](image.png)
## Footer Links

- **Company Info**:
  - About Us
  - Careers
  - Blog
- **Resources**:
  - Guides
  - FAQ
- **Legal**:
  - Terms & Conditions
  - Privacy Policy
  - Cookies Policy

## Contributing

If you'd like to contribute to the development of Parkify, feel free to fork the repository and create pull requests with improvements or bug fixes.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Developer

- **Developer**: Ismail MOUYAHADA

## Footer

```
© 2025 Parkify. All rights reserved.
```

 

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fghostland-dev%2Fparkify-finder)

Click the button to deploy your own copy on Vercel in one step.
