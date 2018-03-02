# Content-Bundle for OpenWeatherMap
This example configuration of a content bundle adds the openweathermap datastore to the app and presents the weather data in the map. 
Moreover, the querybuilder bundle is preconfigured within this bundle with certain queries like: Where is the sky clear? or Where does it rain? 


Sample App
------------------
https://demos.conterra.de/mapapps/resources/apps/downloads_content_openweathermap

![Screenshot OWM Sample app](https://github.com/conterra/mapapps-content-openweathermap/blob/master/screenshot.JPG)

Installation Guide
------------------
**Requirements:**
- map.apps 3.9.0 or later
- dn_querybuilder 3.x (https://github.com/conterra/mapapps-query-builder/tree/3.x)

Add the Content-Bundle for OpenWeatherMap to your app.

Development Guide
------------------
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

##### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`

