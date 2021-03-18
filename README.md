# Appointment Booking - buyer-seller-app
This application is used for appointment booking among buyers and sellers. To help buyers save their time, we decided to implement appointment booking system that
will allow them to book their appointment ahead of time before going to the service provider.
Hence, it is required to design and develop a solution that will allow the users to perform the
action smoothly.

## Product Server - product-server
This is the nodejs express server application. This connects with mongodb database. 

1. The server uses token based authentication to authenticate users. 
2. Token is retrieved when the user logs in to the app
3. Token needs to be added to header `x-access-token` for every API call except signin and signup (obviously ;)
4. Token is session based, not stored on the browser due to security concerns, if you refresh the page you need to login again (sorry!)
5. Each user can have roles (buyer, seller or admin). 
6. Only users having buyer role can login using mobile app. 
7. Only users have seller role can login using web app. 
8. If no role is present, the user cannot login. Based on the signup on either mobile or web app, the role is assigned automatically.
9. Single user can have mutiple roles. Multiple role configuration is supported from API standpoint, can be utilised from Postman.
10. There is no forgot password option as of now, so try to remember the username and password.

### Prerequisites
#### Installing mongo-db
If you do not have mongodb service running locally, follow this here.
1. Mac - https://zellwk.com/blog/install-mongodb/
2. Windows - https://treehouse.github.io/installation-guides/windows/mongo-windows.html

The API exposes the following end points

1. /api/auth/signin - For signing in with a username and password
2. /api/auth/signup - For signing up with username, email and password
3. /api/appointment/schedule - For a buyer scheduling an appointment to seller
4. /api/appointment/pending - For a seller retrieving all pending appointments
5. /api/appointment/:id/approve - For a seller, approving an appointment request
6. /api/appointment/:id/cancel - For a seller, cancelling an appointment request
7. /api/seller/all - Get all sellers
8. /api/seller - Get the current seller information

### Start the application

```
cd product-server
npm install
npm start
```

## React Native Buyer Mobile App - react-buyer-app
This is a vanilla react native application which is used by buyers to schedule appointments with sellers. A buyer can login with username and password, view all sellers, search for seller and book appointment with a seller.

The appointment can only be booked within the time range the seller is available.

### Todo
1. Change the `API_URL` in `react-buyer-app/src/helpers/constants.js` to 'http://<your-server-ip-address>:<your-server-port>/api/'

### Start the application

```
cd react-buyer-app
npm install
npm start
npm run ios # or npm run android
```

You can also run ios command from xcode by opening the react-buyer-app/ios/SimpleLoginTemplate.xcworkspace in xcode and hitting the run icon on top left.

### screenshots

<img width="424" alt="Screenshot 2021-03-18 at 11 52 15 AM" src="https://user-images.githubusercontent.com/26520098/111582460-da4f8280-87e0-11eb-85f2-80b960168dc0.png">

<img width="424" alt="Screenshot 2021-03-18 at 11 52 41 AM" src="https://user-images.githubusercontent.com/26520098/111582469-dd4a7300-87e0-11eb-9693-9f9987807b36.png">

<img width="424" alt="Screenshot 2021-03-18 at 11 52 52 AM" src="https://user-images.githubusercontent.com/26520098/111582672-2c90a380-87e1-11eb-95c2-9240b849cd74.png">

<img width="424" alt="Screenshot 2021-03-18 at 11 53 10 AM" src="https://user-images.githubusercontent.com/26520098/111582511-ef2c1600-87e0-11eb-830b-b21957633b24.png">

<img width="424" alt="Screenshot 2021-03-18 at 11 53 37 AM" src="https://user-images.githubusercontent.com/26520098/111582528-f7845100-87e0-11eb-873b-4410bb7101e8.png">

<img width="424" alt="Screenshot 2021-03-18 at 11 53 48 AM" src="https://user-images.githubusercontent.com/26520098/111582624-1da9f100-87e1-11eb-8530-ed34d65b1c98.png">

<img width="424" alt="Screenshot 2021-03-18 at 11 54 38 AM" src="https://user-images.githubusercontent.com/26520098/111582549-feab5f00-87e0-11eb-9288-39015dab0268.png">

<img width="424" alt="Screenshot 2021-03-18 at 11 54 45 AM" src="https://user-images.githubusercontent.com/26520098/111582561-05d26d00-87e1-11eb-9f20-50885223f980.png">


## React Seller Web App - seller-web-app
This is a react web application which is used by sellers to view the appointments requested by the buyers. The sellers have an option to accept or cancel the appointment request. The seller can also change their available from/to time based on their convenience


### Start the application

```
cd seller-web-app
npm install
npm start
```

### Screenshots

<img width="743" alt="Screenshot 2021-03-18 at 12 01 45 PM" src="https://user-images.githubusercontent.com/26520098/111583660-c4db5800-87e2-11eb-9c85-9c06d5405910.png">

<img width="743" alt="Screenshot 2021-03-18 at 12 02 03 PM" src="https://user-images.githubusercontent.com/26520098/111583701-cc9afc80-87e2-11eb-8216-b246635053a0.png">

<img width="1665" alt="Screenshot 2021-03-18 at 12 02 50 PM" src="https://user-images.githubusercontent.com/26520098/111583724-d3c20a80-87e2-11eb-9b45-881b3b30fa82.png">

<img width="1665" alt="Screenshot 2021-03-18 at 12 03 07 PM" src="https://user-images.githubusercontent.com/26520098/111583750-dd4b7280-87e2-11eb-989e-1b79796e5478.png">

<img width="1665" alt="Screenshot 2021-03-18 at 12 03 26 PM" src="https://user-images.githubusercontent.com/26520098/111584616-189a7100-87e4-11eb-8466-10817bfdb855.png">

<img width="1051" alt="Screenshot 2021-03-18 at 12 04 06 PM" src="https://user-images.githubusercontent.com/26520098/111584640-218b4280-87e4-11eb-805e-4e4b00e709a4.png">

<img width="1051" alt="Screenshot 2021-03-18 at 12 04 15 PM" src="https://user-images.githubusercontent.com/26520098/111584655-25b76000-87e4-11eb-8d96-61df1276826b.png">



