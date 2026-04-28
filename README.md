# Mini E-Commerce Application

A minimal yet functional e-commerce application built as part of the interview assignment.

---

# Tech Stack

## Frontend

* React
* TypeScript
* Redux Toolkit
* Tailwind CSS

## Backend

* Node.js
* Express.js
* TypeScript
* Sequelize ORM
* PostgreSQL

## Authentication

* JWT Authentication
* Role-based Authorization

## Payment Gateway

* Stripe (Test Mode)

## Hosting

* Frontend: Vercel
* Backend: Render / Railway / VPS
* Database: PostgreSQL

---

# Features

## User Features

* Register & Login
* Browse Products
* Search Products
* Filter by Category & Price
* Add to Cart
* Update Cart Quantity
* Remove Cart Items
* Stripe Checkout Payment
* Place Orders
* View Orders

## Admin Features

* Add Products
* Update Products
* Manage Stock
* View Orders

---

# Project Structure

```bash
frontend/
backend/
```

---

# Environment Variables

## Frontend (.env)

```env
VITE_API_URL=http://localhost:8000/api
```

## Backend (.env)

```env
PORT=8000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
FRONTEND_URL=http://localhost:5173
```

---

# Local Setup

## 1. Clone Repository

```bash
git clone <repository_url>
cd project_name
```

---

# Frontend Setup

## Install Dependencies

```bash
cd frontend
npm install
```

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

## Install Dependencies

```bash
cd backend
npm install
```

## Run Migrations

```bash
npm run migrate
npx sequelize-cli db:seed:all
```

## Start Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:8000
```

---

# Stripe Integration

## Install Stripe CLI

Download:

```bash
https://stripe.com/docs/stripe-cli
```

---

# Why Stripe CLI Is Needed During Local Development

Stripe webhooks need a publicly accessible URL.

Since localhost is private, Stripe cannot directly call:

```bash
http://localhost:8000
```

So Stripe CLI creates a secure tunnel from Stripe servers to your localhost.

---

# Run Stripe Webhook Listener

During local development, run:

```bash
stripe listen --forward-to localhost:8000/api/payments/webhook
```

This command:

* Listens for Stripe events
* Automatically forwards events to localhost
* Helps test payment success/failure locally

---

# Important

You must keep this terminal running during local testing.

If you stop it:

* Stripe events will not reach your backend
* Webhooks will fail locally

---

# Testing Stripe Webhooks

Trigger test events:

```bash
stripe trigger payment_intent.succeeded
```

or

```bash
stripe trigger checkout.session.completed
```

---

# Stripe Webhook Flow

## Payment Process

1. User clicks Checkout
2. Backend creates Stripe Checkout Session
3. Frontend redirects to Stripe Checkout
4. User completes payment
5. Stripe sends webhook event to backend
6. Backend verifies webhook signature
7. Order is created only after successful payment confirmation
8. Stock is updated
9. Cart is cleared

---

# Why Orders Are Created From Webhooks

Orders are NOT created immediately when user clicks "Place Order".

Instead:

* Payment must first succeed
* Stripe webhook confirms payment authenticity
* Then order is created

This prevents:

* Fake orders
* Payment mismatch
* Duplicate order creation
* Failed payment orders

---

# Configure Production Webhook in Stripe Dashboard

## Steps

1. Open Stripe Dashboard
2. Developers → Webhooks
3. Add Endpoint
4. Enter:

```bash
https://your-backend.onrender.com/api/payments/webhook
```

5. Select events:

```bash
checkout.session.completed
payment_intent.succeeded
```

6. Save

---

# Future Improvements

If more time were available:

* Order cancellation flow
* Product reviews & ratings
* Email notifications
* Inventory reservation system
* Redis caching
* Docker setup
* CI/CD pipeline
* Unit & integration tests
* Admin analytics dashboard
* Real-time stock updates

---

# Test Card Details

```bash
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVV: Any 3 digits
```

---

# Conclusion

This project focuses not only on implementing features but also on handling real-world e-commerce problems such as:

* Payment reliability
* Duplicate submissions
* Stock consistency
* Secure authentication
* Proper webhook handling
* Transaction safety

The architecture is designed to be scalable, maintainable, and production-oriented.
