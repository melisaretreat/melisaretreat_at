## building the website

hugo --cleanDestinationDir -d ../melisa.org.pl --gc --i18n-warnings  --path-warnings

cd ../melisa.org.pl

git add -A

git commit -m 'briefly describe the change'

git push
