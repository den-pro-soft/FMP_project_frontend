# Instructions for basic deploying to server

Deploy settings to bluehost
- key password: **your password**
- host: root@108.179.218.140

## 1) Build project locally on your pc
Open your terminal in project folder, and write command:
```sh
$ npm run build
```
After that you need to copy **'cert'** folder and paste to your build folder **'dist'**

## 2) Open ssh connection with your server
Write following command in terminal:

```sh
$ ssh -i ~/keys/id_rsa.pem root@108.179.218.140
$ cd /home/jgaockmy/www/fmp_front
$ rm -rf dist
```
## 3) Send files to server
Open terminal and write:

```sh
$ scp -i ~/keys/id_rsa.pem -r <relative path dist folder> root@108.179.218.140:/home/jgaockmy/www/fmp_front
```

## 4) Deploy process:
Go to your server , where you have removed dist and write following:

```sh
$ pm2 restart 0 
```
or

```sh
pm2 start dist/server.js
```

### Calendly settings:
- endpoint: **/calendly/create**
- description: Need to create weebhook subscription in calendly integration.
- gettings hooks: **https://calendly.com/api/v1/hooks**
- create webhook:

```sh
https://calendly.com/api/v1/hooks?events[]=invitee.created&events[]=invitee.canceled&url=${http://jga.ock.mybluehost.me || 'Domain name'}/calendly/create
```
  
# IMPORTANT
Before starting the build project, you need to remove node_modules folder and run npm install. 
Before building the project, check please versions of modules in package.json file. They need to be the same as listed

# Environment
If you want to switch between dev / prod environment in angular node project, you should go to package.json and set a variable **--env.mode='dev'** of your running script. Default value of env.mode is set to **'Prod'**. Example:
- --env.mode='dev' for dev environment
- --env.mode='' for prod environment
