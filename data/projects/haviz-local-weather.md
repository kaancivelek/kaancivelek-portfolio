# HAVIZ -- Izmir Konak Weather Analytics and Forecasting System

## Overview

HAVIZ is a service-oriented weather analytics system designed specifically for the Izmir Konak region. It archives historical meteorological observations obtained with special permission from the Turkish State Meteorological Service (MGM) and produces regional weather forecasts using an XGBoost-based machine learning model. The goal was to develop a lean, data-driven alternative to large-scale physics-based simulations, prioritizing regional accuracy and cost efficiency.

## Context and Requirements

- Generate region-specific forecasts for the Izmir Konak district rather than relying on broad national models
- Archive historical weather data in a structured and queryable format
- Build a modular, service-oriented architecture with clearly separated component responsibilities
- Integrate both historical datasets and continuously updated current observations

## Architecture

The system is composed of multiple independently deployable services communicating over different protocols:

- **Core Backend:** ASP.NET MVC service acting as the central hub for user requests, data retrieval, and frontend rendering
- **Data Collection Service:** Node.js service responsible for gathering historical and current weather data from MGM and the Open-Meteo API, storing it in MySQL
- **Prediction Service:** Django service running an XGBoost model trained on regional weather patterns to produce forecasts
- **Communication:** REST as the primary protocol between services, with SOAP and gRPC also developed and tested within the service-oriented architecture
- **Database:** MySQL for centralized storage of all meteorological data
- **Authentication:** JWT-based authentication across services

## Data and Modeling

- Hourly weather observations for Izmir Konak collected and cleaned from 2020 to 2024
- Current measurements from the past three days periodically integrated via the Open-Meteo API
- The time-series forecasting problem was formulated as a simplified numerical prediction task
- XGBoost was selected for its ability to learn relational patterns through decision trees, with a design focus on regional accuracy rather than global climate trends
- Hyperparameter tuning was conducted to optimize prediction performance

## Technical Contributions

- Contributed to the design of the service-oriented architecture and the definition of component responsibilities
- Built the Node.js data collection pipeline and its MySQL integration
- Trained the XGBoost model, including data preprocessing decisions and hyperparameter experiments
- Tested inter-service communication protocols (REST, SOAP, gRPC) and observed latency and performance characteristics

## Results

- Model performance evaluated on both historical and previously unseen data
- Load testing, error scenarios, and latency analysis conducted across services
- Centralized data storage in MySQL enabled consistent performance monitoring
- The resulting system provides both current weather reports and reasonably accurate regional forecasts for the Izmir Konak area
