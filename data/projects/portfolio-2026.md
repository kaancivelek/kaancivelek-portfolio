# Interactive Star Navigation Portfolio

This project is a modern, interactive portfolio website built with **Next.js 16**, **React 19**, **TypeScript**, and **Framer Motion**.  
Its primary goal is to break away from traditional navigation patterns by introducing a **custom star-shaped navigation system** that acts as the central interaction model of the site.

Rather than relying on classic menus or page transitions, the portfolio presents content through **animated modal overlays**, creating a focused and immersive browsing experience.

## Concept & Motivation

The core idea behind this project is to explore how **non-linear navigation** and **motion-driven UI design** can improve user engagement and memorability in a personal portfolio.  
The star metaphor represents exploration: each point leads to a different section while maintaining a strong visual identity.

This project also serves as a technical showcase, demonstrating advanced usage of:
- Next.js App Router
- SVG-based interactive UI
- Framer Motion animations
- Accessible modal systems
- Type-safe, scalable architecture

## Key Features

### Star-Shaped Navigation
- Custom-built **5-point SVG star** used as the main navigation interface
- Interactive navigation points positioned using mathematical calculations
- Animated active-state indicator lines connected to the star center
- Subtle hover and focus feedback to communicate interactivity
- Fully responsive with dynamic scaling across viewports

### Modal-Based Page System
- All sections (About, Projects, Experience, Skills, Contact) open as **modal overlays**
- Smooth enter and exit animations powered by `AnimatePresence`
- Backdrop blur with controlled opacity for visual depth
- Click-outside and **ESC key** support for closing overlays
- URL-based routing integration for shareable and bookmarkable pages

### Modern UI / UX
- Minimalist dark theme with a strong focus on contrast and readability
- Carefully selected typography (Aldrich, Geist Sans, Geist Mono)
- Smooth micro-interactions and transitions
- Loading states to ensure a polished user experience
- WCAG-friendly keyboard navigation and focus handling

## Technical Architecture

- **Next.js App Router** with a clean separation of server and client components
- **SSR-safe logic**, avoiding hydration mismatches for window-dependent calculations
- REST-style **API Routes** used to serve JSON and Markdown-based content
- Centralized state management using **React Context**
- Fully typed codebase with strict TypeScript configuration
- Modular and maintainable folder structure

## Content Management

All content is stored locally using:
- **JSON files** for structured data (projects, experience, contact info)
- **Markdown files** for long-form content (biography, project details)

This approach allows new content to be added or updated without touching UI logic, making the system flexible and easy to maintain.

## Accessibility

Accessibility was treated as a first-class concern:
- Full keyboard navigation (Tab, Enter, ESC)
- Clear focus indicators
- Proper ARIA labels for interactive elements
- Semantic HTML structure with correct heading hierarchy

## Purpose

This portfolio is designed to:
- Demonstrate advanced frontend engineering skills
- Showcase UI/UX experimentation beyond standard layouts
- Present projects and experience in a memorable, interactive way
- Serve as a foundation that can be extended with new sections or interactions in the future
