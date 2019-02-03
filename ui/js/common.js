
function INPUT(props) {
    return E("input", props);
}

function BUTTON(props, value) {
    //className = (props["className"] ? props["className"]
    return E("button", {...props, className: "btn"}, value);
}

function ajaxCall(method, path, data, success, error) {
    let url = APP_URL + path

    let params =
    {
        method: method,
        success: success,
        error: error,
        crossDomain: true
    }

    if (data) {
        params["contentType"] = "application/json; charset=utf-8";
        params["dataType"] = "json";
        params["data"] = JSON.stringify(data);
    }

    $.ajax(url, params);
}

function ajaxGet(path, success, error) {
    ajaxCall("GET", path, null, success, error);
}

function ajaxPost(path, data, success, error) {
    ajaxCall("POST", path, data, success, error);
}

function ajaxPut(path, data, success, error) {
    ajaxCall("PUT", path, data, success, error);
}

/*
function fetchUsers(dispatch, users) {
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

function fetchProfiles(dispatch, profiles) {
      if (Object.keys(profiles).length !== 0)
          return;
      ajaxGet("/profiles",
          function(data) {
              dispatch({type: 'UPDATE_PROFILES', payload: data});
          },
          function(xhr, textStatus, errorThrown) {
              console.log("ERROR!!!!");
          }
      );
  }
*/
