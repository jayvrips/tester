
from flask import Flask, escape, request, redirect, url_for, render_template, send_from_directory

from login_logger import LoginFileLogger
log = LoginFileLogger()


LoginApp = Flask(__name__)
LoginApp.secret_key = b' \xa9\x16\x17}n\xe3\xad\xae:\x1d\xa5fr\xd3\xa4'

@LoginApp.route("/")
def index():
    return send_static('index.html')

@LoginApp.route("/page1")
def send_page1():
    return send_static('index.html')

@LoginApp.route("/<path:path>")
def send_static(path):
    return send_from_directory('ui', path)

####################### login/logout ##############################
from flask_login import LoginManager, login_required, login_user, current_user, logout_user

login_manager = LoginManager()
login_manager.init_app(LoginApp)

@login_manager.user_loader
def load_user(user_id):
    log.dbg("load_user({})".format(user_id))
    try:
        #TODO: fetch user from db
        return User.get(user_id)
    except:
        log.tb()
        raise
    #TODO: if invalid ID:
    return None

class User:
    def __init__(self, username):
        self.is_authenticated = False
        self.is_active = False
        self.is_anonymous = True
        self.username = username

    @classmethod
    def get(cls, username):
        user = User(username)
        user.is_authenticated = True
        user.is_active = True
        return user

    def get_id(self):
        log.dbg("get_id()")
        return self.username

@LoginApp.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        #TODO: verify creds correctly
        if request.form['username'] == 'asdf':
            user = User(request.form['username'])
            user.is_authenticated = True
            user.is_active = True
            try:
                login_user(user)
            except:
                log.tb()
                raise
            log.info("User logged in as: {}", current_user.username)
            return '{"username": "asdf"}', 200 #redirect(url_for('index'))
        #TODO: else indicate login failure in login.html
    return render_template('login.html')

@LoginApp.route('/logout')
@login_required
def logout():
    try:
        logout_user()
    except:
        log.tb()
        raise
    return redirect(url_for('index'))



################### main ############################
def main():
    LoginApp.run()

if __name__ == "__main__":
    try:
        main()
    except:
        render_template('error.html')

