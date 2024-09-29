
rm -f client.tar && docker save -o client.tar jobbi-client
rm -f server.tar && docker save -o server.tar jobbi-server

scp client.tar debian@217.182.252.91:/home/debian/projects/jobbi
scp server.tar debian@217.182.252.91:/home/debian/projects/jobbi

rm -f client.tar
rm -f server.tar