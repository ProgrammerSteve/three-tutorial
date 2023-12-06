# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

npm install -g gltf-pipeline

use the gltf-pipeline command to make the .glb file
-b will create a binary
navigate to the model folder
gltf-pipeline -i scene.gltf -o model.glb --draco.compressionLevel 10 -d -b

npm install -g gltfjsx
npx gltfjsx@6.2.13 model.glb -T --shadows
or
npx gltfjsx@6.2.13 scene.gltf -T --shadows
creates a model.js file
