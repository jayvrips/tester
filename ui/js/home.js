
class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current_user: null,
            selected: null,
            name: '',
            fullname: ''
        };

        this.onDropdownSelect = this.onDropdownSelect.bind(this)
        this.onFieldChange = this.onFieldChange.bind(this)
        this.onAddUser = this.onAddUser.bind(this)
        this.onLogin = this.onLogin.bind(this)
    }

    onDropdownSelect(selected) {
        this.setState({selected:selected});
    }

    onFieldChange(id, value) {
        this.setState({[id]: value});
    }

    onAddUser() {
        //data = {};
        //ajaxPost(path, data, success, error)
        console.log("name: " + this.state.name);
        console.log("fullname: " + this.state.fullname);
        console.log("password: " + this.state.password);
    }

    onLogin() {
        this.props.login(this.state.username);
    }

    renderUserCard() {
        if(this.state.current_user) {
            return card("User", "You're logged in as " + this.state.current_user);
        }

        return card("Login",
<div>
    <p>{input("Username", "username", this.state.username, this.onFieldChange)}</p>
    <p><input type="submit" name="Login" onClick={this.onLogin}/></p>
</div>
        );
    }

    renderSelectionCard() {
        let items = {"number1": "first", "number2": "second", "number3": "third"};

        let dd = dropdown(items, this.state.selected, this.onDropdownSelect);

        let text = "You haven't selected anything";
        if(this.state.selected)
            text = "You've selected " + this.state.selected;

        return card("This is the header", E("div", {}, 
            E("div", {}, dd),
            E("div", {}, text)
        ));
    }

    renderAddUserCard() {
        let fields = [];

        fields.push(
            input("Name", "name", this.state.name, this.onFieldChange)
        );
        fields.push(
            input("Full Name", "fullname", this.state.fullname, this.onFieldChange)
        );
        fields.push(
            input("Password", "password", this.state.password, this.onFieldChange)
        );
        fields.push(BUTTON({onClick: this.onAddUser}, "submit"))

        return card("Add User", fields);
    }

    render() {
        let login_card = this.renderUserCard();

        let test_card = this.renderSelectionCard();

        let add_user_card = this.renderAddUserCard();

        let link = <ReactRouterDOM.Link to='/page1'>page 1</ReactRouterDOM.Link>;

        return <div>
            {login_card}
            {test_card}
            {add_user_card}
            {"Go to: "}
            {link}
        </div>;
    }
}

const mapStateToProps = state => {
    return { current_user: state.current_user, users: state.users };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username) => {
            ajaxPost("/login",
                function(data) {
                    dispatch({type: 'UPDATE_CURRENT_USER', payload: data});
                },
                function(xhr, textStatus, errorThrown) {
                    console.log("ERROR!!!!");
                }
            );
        },
        get_users: (users) => {
            if (Object.keys(users).length !== 0)
                return;
            ajaxGet("/users",
                function(data) {
                    dispatch({type: 'UPDATE_USERS', payload: data});
                },
                function(xhr, textStatus, errorThrown) {
                    console.log("ERROR!!!!");
                }
            );
        }
    }
};

ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Home);

