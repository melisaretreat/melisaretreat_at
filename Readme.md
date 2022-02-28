## Starting the preview

hugo server

when done: control+C

## building the website

hugo --cleanDestinationDir -d ../melisa.org.pl --gc --i18n-warnings  --path-warnings

## pushing website to the server

cd ../melisa.org.pl

git add -A

git commit -m 'briefly describe the change'

git push

## pushing source to the repository

cd -

git add -A

git commit -m 'briefly describe the change'

git push

