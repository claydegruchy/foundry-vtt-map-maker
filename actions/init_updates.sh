name=$(basename "$PWD")
echo $name
[ -d "./node_modules/" ] && echo "Init install already completed" && exit 0

echo "# Creating package.json"
# update package.json
node -p "JSON.stringify({...require('./package.json'), 'name': '$name'}, null, 2)" > temp.json
mv temp.json package.json
echo "# Done"
echo "# Creating readme"
# make readme
npm i -g plop
plop readme "$name" --force
echo "# Done"
