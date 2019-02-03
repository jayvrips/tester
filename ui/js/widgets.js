
function input(label, id, value, onChange) {
    return E("div", {},
        E("label", {for:id}, label + ": "),
        INPUT({id: id,
               value: value,
               onChange: (event) => {onChange(id, event.target.value)}})
    );
}

class CardComponent extends React.Component {
    render() {
        return E("div",
            {className: "card"}, 
            E("div", {className: "card-header"}, this.props.header),
            E("div", {className: "card-body"}, this.props.body)
        );
    }
}

function card(header, body) {
    return E(CardComponent, {header: header, body: body});
}


class DropdownComponent extends React.Component {
    render() {
        let item_elems = [];

        for(let key in this.props.items)
            item_elems.push(E("option", {value: key}, this.props.items[key]))

        return E(
            "select",
            {
                 onChange: (event)=>this.props.callback(event.target.value),
                 value: this.props.selected_key
            },
            item_elems
        );
    }
}

function dropdown(items_dict, selected_key, callback) {
    return E(DropdownComponent, {
        items: items_dict,
        selected_key: selected_key,
        callback: callback
    });
}

