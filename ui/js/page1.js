
class Page1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: null
        };
    }

    render() {
        return <ReactRouterDOM.Link to='/'>
&lt; back to home
        </ReactRouterDOM.Link>;
    }
}


ReactRedux.connect(

    (state) => {
        return {
            users: state.users
        };
    },

    (dispatch) => {
        return {
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
    }

)(Page1)


