## How to run the deployment script:

1. Pull the latest changes of course
2. In your computers home directory clone the deploy repo. from github
3. When you want to deploy in fuse run gulp deploy command, wait for it to finish and don't mess with the code while it's working
4. Then the new changes will be in the deploy directory in your home folder and you can push and deploy on Heroku

*if gulp deploy gives you an error try running npm install*
####The script will change the apiUrl itself and bring it back when it's finished so no need to change that, and don't mess with the apiUrl variable it needs to stay as it's now to work
