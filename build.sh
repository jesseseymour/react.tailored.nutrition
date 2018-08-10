#!/bin/bash
webpack -p --config webpack.prod.js
cp ./dist/assets/tailorednutrition.min.js ../iams/MarsIamsWebApp/App_Data/Sitefinity/WebsiteTemplates/BaseTemplate/js/tailorednutrition.min.js
