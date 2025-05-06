# Harry Viennot - Personal CV Website

A modern, responsive personal CV and portfolio website built with React, React Router, Tailwind CSS, and Framer Motion.

## Features

- Responsive design optimized for all devices
- Modern UI with smooth animations and transitions
- Dynamic project and experience pages
- Contact form
- Clean and professional layout

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:

```
git clone https://github.com/harryviennot/cv-website.git
cd cv-website
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
cv-website/
├── public/                  # Public files
│   ├── projects/            # Project images
│   └── harry-viennot-resume.pdf # Resume PDF
├── src/                     # Source files
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   ├── assets/              # Static assets
│   ├── App.tsx              # App component
│   ├── index.tsx            # Entry point
│   └── index.css            # Global styles
└── package.json             # Dependencies and scripts
```

## Customization

To customize the website for your own use:

1. Update the content in the component files (About, Experience, Projects, etc.)
2. Replace the profile and project images in the `public` directory
3. Update the resume PDF file

## Building for Production

To build the app for production, run:

```
npm run build
```

This will create an optimized build in the `build` folder.

## Technologies Used

- React.js (with TypeScript)
- React Router
- Tailwind CSS
- Framer Motion

## License

MIT
