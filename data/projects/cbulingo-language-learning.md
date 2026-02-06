# CBULingo -- English Vocabulary Learning Application

## Overview

CBULingo is a web application designed to support English vocabulary learning through a spaced repetition approach. Originally planned as a team project, significant delays in frontend development and data preparation required the system to be rebuilt end-to-end by a single developer shortly before the delivery deadline.

## Context

- Initially designed as a collaborative team project
- When frontend development and data preparation tasks fell behind schedule, the project was replanned and individually rebuilt to deliver a working product within the remaining time
- The experience required rapid prototyping, independent decision-making, and full ownership of the development process

## Architecture

- **Frontend:** React with a component-based UI structure covering word lists, review screens, and user progress views
- **Backend:** JSON Server providing a lightweight REST API layer
- **Data Storage:** File-based JSON storage for user data, word lists, and progress records
- **Security:** BCrypt for secure password hashing in user registration and login flows

## Technical Contributions

- Set up JSON Server as a lightweight backend layer for rapid development
- Implemented secure user registration and authentication flows using BCrypt
- Designed the React-based component architecture for word lists, review sessions, and progress tracking
- Built a simplified spaced repetition mechanism driven by user interaction patterns to simulate review scheduling

## Results

- Delivered a functional web application covering user registration, vocabulary learning, and review workflows
- Gained practical experience in taking individual ownership of an end-to-end product under limited time and resources
