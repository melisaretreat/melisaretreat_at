unten lauchpad anvisieren und dann Development und dann IntelliJ Idea CE anklicken
Gehe zu Menu File, open recent: Melisaretreat Src
Gehe zu schwarzem Feld unten und tippe hugo server
im Terminal ist default melisaretreat-src, falls nicht, schliessen und Terminal nochmals oeffenen

## Starting the preview

hugo server
klicke http:localhost:1313
oeffne Folder mit Content
oeffne was geaendert gehoert

when done: control+C

## building the website
kopiere diesen link:
hugo --cleanDestinationDir -d ../melisa.org.pl --gc --i18n-warnings  --path-warnings

klicke gruenes hackerl oben in Leiste

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

