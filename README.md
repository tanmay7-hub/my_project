# 🏡 Wanderlust — Accommodation Booking Platform

Wanderlust is a full-stack accommodation booking platform inspired by modern property-rental applications. Users can explore and search listings, create and manage their own properties, leave reviews, and make online bookings through Razorpay.

The project follows an MVC-based backend architecture and integrates several real-world services such as Cloudinary, Mapbox, MongoDB sessions, and Razorpay.

## 🚀 Features

* 🔐 User registration, login, logout, and authentication
* 🏠 Create, view, edit, and delete property listings
* 🔍 Search listings by location and other filters
* 🖼️ Upload and manage listing images using Cloudinary
* 🗺️ Location-based geocoding and maps using Mapbox
* ⭐ Add and delete reviews and ratings
* 💳 Online booking and payment using Razorpay
* 📋 View user bookings
* 🏘️ Property-owner booking management
* 🔒 Authorization for listing owners and review owners
* ⚠️ Form validation and centralized error handling
* 💬 Flash messages for user feedback
* 💾 Persistent sessions using MongoDB

## 🛠️ Tech Stack

### Frontend

* EJS
* EJS-Mate
* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js
* Passport.js
* Passport Local

### Database

* MongoDB
* Mongoose
* MongoDB Session Store

### External Services

* ☁️ Cloudinary — Image storage
* 🗺️ Mapbox — Geocoding and location services
* 💳 Razorpay — Online payments

### Other Tools

* Multer — File uploads
* Joi — Request validation
* Express Session — Session management
* Connect-Mongo — Persistent sessions
* Method Override — PUT/DELETE requests
* Connect Flash — Flash messages

## 🏗️ Architecture

The application follows an MVC-style architecture:

```text
                    Client
                      │
                      ▼
                 Express.js
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
    Routes       Middleware     Controllers
        │             │             │
        └─────────────┼─────────────┘
                      │
                      ▼
                   Models
                      │
                      ▼
                  MongoDB
```

External services are integrated for specific responsibilities:

```text
                    Application
                         │
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
   MongoDB           Cloudinary          Mapbox
 Database &          Image Storage      Geocoding
 Sessions
                         │
                         ▼
                     Razorpay
                       Payments
```

## 📂 Project Structure

```text
my_project/
│
├── controller/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│   └── payment.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│   └── payment.js
│
├── init/
│   ├── data.js
│   └── index.js
│
├── utlis/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── public/
│
├── views/
│
├── app.js
├── middleware.js
├── schema.js
├── cloudConfig.js
├── package.json
└── README.md
```

## 🔐 Authentication & Authorization

Authentication is implemented using Passport.js with Passport Local.

The application supports:

* User registration
* Secure login
* Logout
* Session-based authentication
* Persistent sessions using MongoDB
* Protected routes
* Listing-owner authorization
* Review-owner authorization

Users must be authenticated before performing protected operations such as creating listings, adding reviews, or making bookings.

## 🏠 Listing Management

Users can create and manage accommodation listings.

Each listing can contain information such as:

* Title
* Description
* Price
* Location
* Country
* Image
* Owner

Listing owners can edit or delete their own listings, while unauthorized users are prevented from modifying them.

## 🖼️ Image Uploads

Listing images are uploaded using Multer and stored through Cloudinary.

```text
User
  │
  ▼
Multer
  │
  ▼
Cloudinary
  │
  ▼
Image URL
  │
  ▼
MongoDB Listing
```

This avoids storing large image files directly inside the application server.

## 🗺️ Location & Geocoding

Mapbox Geocoding is used to convert listing locations into geographical coordinates.

This allows listings to be associated with map-based location information.

```text
Listing Location
      │
      ▼
   Mapbox API
      │
      ▼
Latitude / Longitude
      │
      ▼
Listing Location Data
```

## ⭐ Reviews & Ratings

Authenticated users can add reviews to listings.

Reviews include:

* Rating
* Comment
* Author

Review ownership is also checked before allowing a review to be deleted.

## 💳 Booking & Payments

The application integrates Razorpay for online payments.

The booking flow is:

```text
User selects listing
        ↓
Select check-in / check-out
        ↓
Calculate booking amount
        ↓
Create Razorpay order
        ↓
Complete payment
        ↓
Save booking
        ↓
Booking confirmation
```

Users can view their bookings, while property owners can access bookings associated with their listings.

## 🧪 Validation & Error Handling

The application uses Joi for validating listing and review data.

Custom error handling is implemented using:

```text
ExpressError
```

Asynchronous route handlers are wrapped using:

```text
wrapAsync
```

This keeps asynchronous error handling consistent throughout the application.

## ⚙️ Environment Variables

Create a `.env` file and configure the required credentials:

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

MAP_TOKEN=your_mapbox_token

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## ▶️ Running Locally

Clone the repository:

```bash
git clone <repository-url>
cd my_project
```

Install dependencies:

```bash
npm install
```

Create your `.env` file with the required credentials.

Start the application:

```bash
node app.js
```

The application will run on:

```text
http://localhost:8080
```

## 📌 What This Project Demonstrates

This project was built to understand practical full-stack development and backend architecture, including:

* RESTful routing
* MVC architecture
* Authentication and authorization
* Session management
* MongoDB data modeling
* CRUD operations
* File uploads
* Cloud storage
* Third-party API integration
* Payment gateway integration
* Input validation
* Error handling
* Role/ownership-based authorization

## 🔮 Future Improvements

Potential improvements include:

* User dashboards
* Advanced booking availability management
* Booking cancellation and refunds
* Improved search and filtering
* Host analytics
* Image optimization
* Rate limiting
* Automated testing
* API-based frontend using React
* Dockerized deployment

## 👨‍💻 Author

**Tanmay**

A full-stack project built to gain practical experience with Node.js, Express, MongoDB, authentication, third-party APIs, cloud storage, and payment integration.
