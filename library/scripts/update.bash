cd /Users/caiuscitiriga/Code/hazeline/library
rm -rf dist
node_modules/.bin/tsc
rm -r hazeline-1.0.0.tgz
sudo npm link

cd /Users/caiuscitiriga/Code/hazeline/demo
rm -rf dist
npm link hazeline
node_modules/.bin/webpack --mode production