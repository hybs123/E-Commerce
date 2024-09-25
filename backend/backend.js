import React from "react";
import ReactDOM from "react-dom/client";
import express, { response } from "express";
import axios from "axios";
import mongodb from "mongodb";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcryptjs";
import User from "./user.mjs";
import Orders from "./orders.mjs";
import session from "express-session";
import authenticateJwt from "./Tokencheck.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import Razorpay from 'razorpay';
import nodemailer from "nodemailer";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";

const app = express();
const uri =
  "mongodb+srv://haidersoni47:haider786@cluster0.lsb1ldz.mongodb.net/E-Commerce?retryWrites=true&w=majority&appName=Cluster0";
const dot = dotenv.config();

const __dirname = path.resolve();
const razorpay = new Razorpay({
  key_id: process.env.REACT_APP_RAZORPAY_ID_KEY, // Replace with your Razorpay key ID
  key_secret: process.env.REACT_APP_RAZORPAY_SECRET_KEY, // Replace with your Razorpay key secret
});

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
// app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'frontend/dist')));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());

// Increase the limit for URL-encoded bodies
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(
  session({
    secret: "your-secret-key", // Replace 'your-secret-key' with your actual secret key
    resave: false,
    saveUninitialized: false,
    // Other session configuration options
  })
);

app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: ["https://sara-organics.onrender.com","https://sara-organics.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
});

// Multer setup for file uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
  transformation: [
    {
      width: 500,
      height: 500,
      crop: 'fill',
    },
  ],
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});


const upload = multer({ storage: storage });

mongoose.connect(uri);

const productSchema = new mongoose.Schema({
  id: String,
  productname: String,
  description: String,
  reviews: Array,
  price: Number,
  image: Array,
  category: String,
  subCategory: String,
  sizes: Array,
  date: Number,
  bestseller: String,
  stars: Number,
  date: Number,
  policy: Array,
});

const productModel = mongoose.model("product", productSchema); // Assuming "VCard" is the correct collection name

const newsSchema = new mongoose.Schema({
  username:String
});

const newsModel = mongoose.model("newsletter", newsSchema); // Assuming "VCard" is the correct collection name

app.use(passport.initialize());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("*", (req, res) => {
  try {
      res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  } catch (e) {
      res.send("Welcome to Sara Organics");
  }
});
app.get("/", (req, res) => {
  return res.send("<h1>Hello</h1>");
});

app.get("/checkAuth", authenticateJwt, (req, res) => {
  console.log("checkAuth is running and user is Authenticated:");

  return res.json({ rootUser: req.rootUser, auth: true });
});

app.get("/getProducts", async (req, res) => {
  // Query the collection to retrieve all documents
  await productModel
    .find()
    .then((products) => res.json(products))
    .catch((err) => res.json(err));

  // Send the retrieved documents as a response
});

app.get("/checkAuth", authenticateJwt, (req, res) => {
  // console.log(req);
  // console.log(req.body);

  console.log("checkAuth is running and user is Authenticated:");
  return res.json({ rootUser: req.rootUser });
});

app.get("/addtocart", async (req, res) => {
  const user = req.query.user; // Use req.query to get query parameters from a GET request

  try {
    const usercart = await User.findOne({ username: user }); // Ensure the field name is correct

    if (usercart) {
      return res.json({ cart: usercart.cart });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/orders", async (req, res) => {
  const username = req.query.user;
  try {
    if (!username) {
      return res.status(400).json({ error: "User is required" });
    }

    const userOrders = await Orders.find({ username: username });
    if (!userOrders) {
      return res.status(404).json({ error: "No orders found for this user" });
    }
    res.json(userOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/review", async (req, res) => {
  const productRev = req.query.product; // Use req.query for query parameters

  console.log("Getting reviews");

  try {
    const product = await productModel.findOne({ id: productRev });
    if (product) {
      console.log(
        "Getting reviews and the product reviews are:",
        product.reviews
      );
      res.json({ reviews: product.reviews }); // Wrap in an object
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/ordersbackend", async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Orders.find();

    // Initialize an array to hold all products with additional order details
    let allProds = [];

    // Loop through each order
    orders.forEach((order) => {
      // Check if the order has a prods array and if it's an array
      if (order.prods && Array.isArray(order.prods)) {
        // Add each product to the allProds array with additional order details
        order.prods.forEach((prod) => {
          allProds.push({
            orderitemid: prod.orderitemId,
            orderitemsize: prod.orderitemsize,
            orderitemquantity: prod.orderitemquantity,
            method: prod.method,
            track: prod.track,
            username: order.username,
            zip: order.zip,
            address: order.address,
            phone: order.phone,
          });
        });
      }
    });

    // Log the collected items for debugging
    console.log("Collected prods data from backend:", allProds);

    // Respond with the collected data in the desired format
    res.json({ ordersbackend: allProds });
  } catch (error) {
    // Handle any errors that occur
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});






app.post("/mail", async (req, res) => {
  const { user, zip, track, method, cart } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "haidersoni47@gmail.com",
      pass: process.env.MAIL_PASS, // Use environment variables for sensitive information
    },
  });

  // Function to send email
  async function sendEmail() {
    try {
      // Convert cart items to string
      const cartItems = cart
        .map(
          (item) =>
            `Item ID: ${item.productname}
        Size: ${item.size}, Quantity:${item.quantity}`
        )
        .join("\n");

      const emailText = `
        Hello ${user.name},

        Your order has been placed for:
        Products:
        ${cartItems}

        To: ${user.Address}
        Phone: ${user.Phone}
        Zip: ${zip}
        Mode of Payment: ${method}

        We are happy to receive your order and will work our best to ensure you receive your product in the shortest time.

        Thank you,
        Sara Organics Team
        `;

      const info = await transporter.sendMail({
        from: '"Haider 👻" <haidersoni47@gmail.com>', // sender address
        to: user.username, // recipient address
        subject: "Your Order has been placed - Sara Organics ✔", // Subject line
        text: emailText, // plain text body
        // html: "<b>Your HTML content here</b>", // Optionally add HTML content
      });

      // Logging info object for debugging
      console.log("Email sent:", info);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  try {
    const emailInfo = await sendEmail();
    if (emailInfo && emailInfo.messageId) {
      res.status(200).json({ emailInfo: emailInfo.messageId });
    } else {
      res
        .status(500)
        .json({ error: "Email sent, but no message ID received." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/register", upload.single("image"), async (req, res) => {
  try {
    // Check if email is provided
    if (!req.body.email) {
      return res.status(400).send("Email is required");
    }

    // Check for existing user by email
    const existingUser = await User.findOne({ username: req.body.email });
    if (existingUser) {
      return res.status(400).send("Email already in use");
    }

    // Check if an image was uploaded and create path
    const imgPath = req.file
      ? `/uploads/userimages/${req.file.filename}`
      : null;

    const newUser = new User({
      name: req.body.name,
      username: req.body.email,
      password: req.body.password,
      Address: req.body.address,
      Phone: req.body.phone,
      image: imgPath ? [imgPath] : [], // Ensure image is always an array
    });

    // Generate and save token
    const token = await newUser.generateToken();
    newUser.tokens.push(token);

    await newUser.save();

    // Set cookie
    res.cookie("token", token, { httpOnly: false, secure: false }); // secure: true in production with HTTPS

    res
      .status(201)
      .send({ message: "User registered successfully", response: token });
  } catch (error) {
    res.status(500).send({ error: "Failed to register user" });
    console.error("Error saving User:", error);
  }
});

// Ensure you have the correct middleware and that this route is included in your server setup

app.post("/login", upload.none(), async (req, res) => {
  const username = req.body.email;
  const password = req.body.password;

  console.log("Login was called and", req.body);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Email Not Found" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(404).json({ error: "Invalid Password" });
      }

      req.login(user, async (err) => {
        if (err) {
          return res.status(404).json({ error: "Login Error" });
        }

        const token = await user.generateToken();
        user.tokens = [token];
        await user.save();

        res.status(201).json({ response: token, user });
      });
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

app.post("/uploads", upload.array("productImage", 10), async (req, res) => {
  try {
    console.log("Uploaded files:", req.files);
    console.log("Form data:", req.body);

    // Map through the uploaded files to get URLs
    const imgUrls = req.files.map((file) => file.path);// Get secure URLs from Cloudinary

    // Create a new product model with form data and image URLs
    const product = new productModel({
      id: req.body.id,
      productname: req.body.productname,
      description: req.body.description,
      price: req.body.price,
      image: imgUrls, // Array of image URLs from Cloudinary
      category: req.body.category,
      subCategory: req.body.subCategory,
      sizes: req.body.sizes, // Assumes sizes is an array
      bestseller: req.body.bestseller,
      stars: req.body.stars,
      policy: req.body.shipnreturn,
    });

    // Save the product to the database
    const savedProduct = await product.save();
    console.log("New product saved:", savedProduct);

    // Return success response
    res.status(201).json({
      message: "Product uploaded successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Failed to upload product" });
  }
});

app.post("/addtocart", async (req, res) => {
  const user = req.body.user;
  const cartitems = req.body.cart;

  console.log("Add to cart was called");

  if (user) {
    try {
      const usertoadd = await User.findOne({ username: user }); // Corrected to match the field name

      if (!usertoadd) {
        // If the user does not exist, respond with an error
        return res.status(404).json({ error: "User Not Found" });
      }

      if (!cartitems) {
        usertoadd.cart = [];
      } else {
        usertoadd.cart = cartitems;
      }

      // Update the cart for the found user
      await usertoadd.save();

      // console.log("Cart items saved successfully");
      return res.json({ usertoadd });
    } catch (error) {
      console.error("Error saving cart items:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ error: "User is required" });
  }
});

app.post("/review", async (req, res) => {
  console.log("Review was called");
  const review = req.body.review;
  const rating = req.body.rating;
  const id = req.body.id;
  const user = req.body.user;

  try {
    const card = await productModel.findOne({ id: id });
    const reviewObject = {
      username: user,
      review: review,
      rating: rating,
    };

    card.reviews.push(reviewObject);
    await card.save();

    // Send a JSON response with the newly added review
    res.status(201).json({ review: reviewObject });
  } catch (err) {
    // If there's an error, send the error message as a JSON response
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/orderplaced", async (req, res) => {
  const { id, prod, zip, track, method, address, phone } = req.body;

  console.log("Backedn and phone:", phone, address);

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    // Check if the order exists
    const existingOrder = await Orders.findOne({ username: id });

    if (existingOrder) {
      // Update the existing order
      existingOrder.prods.push(
        ...prod.map((item) => ({
          orderitemId: item.itemId,
          orderitemsize: item.size,
          orderitemquantity: item.quantity,
          track,
          method,
        }))
      );

      await existingOrder.save();
      console.log("Order updated successfully");
      res.status(200).json({ order: existingOrder });
    } else {
      // Create a new order
      const newOrder = new Orders({
        username: id,
        zip,
        address,
        phone,
        prods: prod.map((item) => ({
          orderitemId: item.itemId,
          orderitemsize: item.size,
          orderitemquantity: item.quantity,
          track,
          method,
        })),
      });

      await newOrder.save();
      console.log("New order saved successfully");
      res.status(201).json({ order: newOrder });
    }
  } catch (error) {
    console.log("Error processing request", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/ordersbackend", async (req, res) => {
  const { username, orderitemid, track, orderitemsize } = req.body;
  console.log(
    "post ordersbackend and:",
    username,
    orderitemid,
    track,
    orderitemsize
  );

  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }

  try {
    const user = await Orders.findOne({ username: username });

    // Check if user is found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the track status for matching items
    user.prods.forEach((item) => {
      const isMatchingItem =
        item.orderitemId === orderitemid &&
        item.orderitemsize === orderitemsize;

      if (isMatchingItem) {
        // Update the track status for this item
        item.track = track; // Update the track status
      }
    });

    await user.save();
    res.status(200).json({ order: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/api/create-order", async (req, res) => {
  console.log("Received request:", req.body); // Log the request body
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in the smallest currency unit (e.g., paise for INR)
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"), // Generate a random receipt ID
    };

    const order = await razorpay.orders.create(options);
    // console.log("Razorpay Order:", order); // Log the created order

    res.json({
      success: true,
      orderId: order.id,
      amount: options.amount,
      currency: options.currency,
      signature: order.signature, // If needed for verification
    });
  } catch (error) {
    console.error("Error creating order:", error); // Log the error
    res.status(500).json({ error: error.message });
  }
});

app.post("/logout", (req, res) => {
  // Assuming you're using JWT, you would simply clear the token on the client side
  // If using sessions, destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});


app.post("/newsletter",async(req,res)=>{
  const username = req.body.username;

  if (!username) {
    return res.status(404).json({ error: "Please enter username" });
  }

  try {
    const newNewsletter = new newsModel({
      username:username
    })

    await newNewsletter.save();
    console.log("Newsletter saved successfully");
    res.status(200).json({message:"Succesfully saved newsletter"});




  } catch (error) {
    console.log("Error saving newsletter");
    res.status(500).json({ error: "An error occurred while saving newsletter" });
  }

  



})
    
    
 


app.listen(3001, () => {
  console.log("Listening on port 3001");
});
