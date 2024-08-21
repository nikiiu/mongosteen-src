rm -rf dist
npm run build 
cd dist
git init
git add .
git commit -m "部署"
git branch -M master
git remote add origin git@github.com:nikiiu/mongosteen-preview.git
git push -f origin master:master
git open
cd -