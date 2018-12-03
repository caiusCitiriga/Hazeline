rm -rf dist
node_modules/.bin/tsc
cp ./src/core/tether.min.js dist/
npm link

cd ../demo
npm link hazeline
touch src/update.ts
echo '// update' > src/update.ts
sleep 1
rm -rf src/update.ts
