# Collaborative-Online-Judge-System

## Install NodeJs:
sudo apt-get update

curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

sudo apt-get install -y nodejs

## Install Nodemon
sudo npm install -g nodemon

## Install git
sudo apt-get install git

## Install angular/cli
sudo npm install -g @angular/cli@latest

## Install Terminator
sudo apt-get install terminator

## Download Postman
Follow: https://blog.bluematador.com/posts/postman-how-to-install-on-ubuntu-1604/

## Install Redis
wget http://download.redis.io/releases/redis-3.2.6.tar.gz

tar xzf redis-3.2.6.tar.gz

cd redis-3.2.6

make

sudo make install

cd utils

sudo ./install_server.sh

## Install Python 3 (already installed in ubuntu)
## Install pip3 for python3
sudo apt-get update

sudo apt-get -y install python3-pip

sudo pip3 install Flask

## Install Docker:
curl -fsSL https://get.docker.com/ | sh

Setup docker permission:

sudo usermod -aG docker $(whoami)

(you need to logout and login again after set permission)

To start docker when the system boots: sudo systemctl enable docker

## Install Nginx
(For ubuntu 16.04) Add following two lines into /etc/apt/sources.list

deb http://nginx.org/packages/ubuntu/ xenial nginx

deb-src http://nginx.org/packages/ubuntu/ xenial nginx

Then run:

sudo apt-get update

sudo apt-get install nginx
