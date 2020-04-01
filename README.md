#Stay at home pizza-delivery app
In order to deploy this app to heroku, you need only to upload this repository to heroku folloing the standard deployment steps on heroku site.
after the deployment finishes you need to generate the encryption keys for passport. one option to do so is by running this command heroku ps:exec -a your_app_name in the terminal then by running this command php artisan passport:keys, that will generate the keys. or you can generate the keys somewhere else and deploy them with the repository in somme secure way.
the next step is to config vars in the app settings on heroku, where the following vars need to be set:
APP_DEBUG = true
APP_ENV = production
APP_KEY = (app key)
APP_URL = (the url to the app on heroku)
DB_CONNECTION = (the remote db e.g. mysql)
DB_DATABASE = (the remote db e.g. mysql)
DB_HOST = (the remote db address)
DB_PASSWORD = (the remote db password)
DB_PORT = (the remote db port)
DB_USERNAME = (the remote db username)
