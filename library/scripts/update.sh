rm -rf hazeline-1.0.0.tgz
rm -rf dist
node_modules/.bin/tsc
npm pack

cd ../demo
rm -rf node_modules/hazeline
npm i ../library/hazeline-1.0.0.tgz

npm run build