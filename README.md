# Manish Kejani Frontend

## Overview

This repository contains the frontend application for Manish Kejani, built with React and Vite. It provides a dynamic and responsive user interface for an e-commerce or product showcase platform, featuring robust state management, authentication, and a modern design system.

## Features

*   **Product Catalog**: Displays products with detailed views, categories, and search functionality.
*   **User Authentication**: Secure login, registration, and session management.
*   **Shopping Cart & Wishlist**: Functionality for adding items to a cart and managing a wishlist.
*   **Admin Panel**: Dedicated sections for administrative tasks (e.g., managing products and promotions).
*   **Responsive Design**: Utilizes Tailwind CSS and Radix UI for a consistent and adaptive user experience across devices.
*   **Data Fetching**: Efficient data management with Tanstack React Query.
*   **Image Optimization**: Handles image assets for optimal loading.

## Technology Stack

*   **Framework**: React.js
*   **Build Tool**: Vite
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS, Radix UI
*   **State Management/Data Fetching**: Tanstack React Query (v5.94.5)
*   **UI Components**: Radix UI (Accordion, Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu, Label, Popover, Radio Group, Select, Separator, Slot, Switch, Tabs, Toast, Tooltip)
*   **HTTP Client**: Axios (v1.13.6)
*   **Routing**: React Router DOM (v6.25.1)
*   **Icons**: Lucide React (v0.417.0)

## Installation and Setup

To get started with the Manish Kejani Frontend, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/jasper-nyambichu/manish-kejani-frontend.git
    cd manish-kejani-frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or yarn install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the root directory and add your backend API URL and any other necessary environment variables:
    ```env
    VITE_API_BASE_URL=http://localhost:5000/api
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    # or yarn dev
    ```

    Open [http://localhost:5173](http://localhost:5173 ) (or the port indicated by Vite) with your browser to see the result.

## Project Structure

manish-kejani-frontend/
├── public/
├── src/
│   ├── App.tsx
│   ├── assets/
│   ├── auth/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── product/
│   │   ├── sections/
│   │   └── ui/
│   ├── constants/
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── admin/
│   │   └── public/
│   ├── store/
│   ├── test/
│   └── types/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json


## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the ISC License. See the `LICENSE` file for details. (Note: A `LICENSE` file was not found in the repository, please add one if applicable.)

## Contact

For any inquiries, please contact [jasper-nyambichu](https://github.com/jasper-nyambichu ).
