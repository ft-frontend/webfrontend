import React from "react";


class Selector extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            items: []
        }


        this.props.items.forEach(item => {

            this.state.items.push(
                <li><a href={item.link}>{item.text}</a></li>
            )

        })

    }

    render() {



        return (
            <ul>
                {this.state.items}

            </ul>

        );
    }

}

export default Selector;