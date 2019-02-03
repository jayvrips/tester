

function appReducer(state, action) {
    let initialState =  {
        current_user: null,
        users: {},
        profiles: {}
    };

    let current_user = null;
    let users = null;
    let profiles = null;
    switch (action.type) {
        case 'UPDATE_CURRENT_USER':
            current_user = {current_user: action.payload};
            return {...state, ...current_user};
/*
        case "UPDATE_USERS":
            users = {users: action.payload};
            return {...state, ...users};

        case "UPDATE_USER":
            users = Object.assign({}, state.users);
            users[action.id] = action.user_data;
            return {...state, ...{users: users}};

        case "UPDATE_PROFILES":
            profiles = {profiles: action.payload};
            return {...state, ...profiles};

        case "UPDATE_PROFILE":
            profiles = Object.assign({}, state.profiles);
            profiles[action.id] = action.profile_data;
            return {...state, ...{profiles: profiles}};

        case "DELETE_PROFILE":
            profiles = Object.assign({}, state.profiles);
            delete profiles[action.id];
            return {...state, ...{profiles: profiles}};
*/


        default:
            if (state === undefined)
                return initialState;
            else
                return state;
    }
}

const store = Redux.createStore(appReducer);

ReactDOM.render(
    E(ReactRedux.createProvider(), {store: store},
        <ReactRouterDOM.BrowserRouter>
            <div>
                <ReactRouterDOM.Route exact="true" path="/" component={Home}/>
                <ReactRouterDOM.Route exact="true" path="/page1" component={Page1}/>
            </div>
        </ReactRouterDOM.BrowserRouter>
               //<ReactRouterDOM.Route path='/profile/:id' component={Profile}/>
    ),
    document.getElementById('root')
);

