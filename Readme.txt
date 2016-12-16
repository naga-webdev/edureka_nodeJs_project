********** run instructions for project **********

just run 

--------------- npm install

after successfully downloaded all the dependency modules provided in the package.json file

run the below commnad(s)

--------------- npm start / node server.js



************* folder structure ***********


******	images folder contains .jpg files which where used for slideshow on home page(index.html)
	note:pictures source 'https://unsplash.com/' which are free to use
	for details on copyright/license check 'https://unsplash.com/license'

****	node_modules folder contains all node modules required to run the server(server.js)
	server.js requires a express module
	Note : If this folder is not available please run "npm install" command

****	.html files are different view pages for our website
	home.html is view of our app. when our app routed to ("/") default location home.html will rendered into index.html
	index.html is a home page renders all required libraries and frameworks

****	package.json contains all the dependencies for server.js, you can install node_modules
	by simple command "npm install".

****	Readme.txt contains information about this project folder and how to run application guidlines

****	server.js is a web server build by expressJs on top of NodeJS( type "node server.js" or "npm start" to run the server)
	server will run in localhost at 3000 port

****	style.css contains some manual styling for our app

Note: In this project i've used twitter bootstrap 3.3.7 for responsive design