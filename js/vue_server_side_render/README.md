# vue_server_side_render

> It is the template of How to setup the backend & front-end project, with the SSR feature to render Vue component into HTML in backend (for other usage, e.g. turn into PDF).


There are lots of vue SSR(Server side rendering) framework, but all of them assume you render the vue components and return to front-end. The main difference in this template is, we render the compiled vue component into HTML, and can use for other purpose such as converting into PDF...etc.


## Getting start

In project root directory, run below command
```sh
# Install all packages
npm i
# Build shared components
npm run build:backend
# Start front and backend
npm run serve:all
```