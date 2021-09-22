import React from "react";
class SetPIDValue extends React.Component {
    constructor(props) {
        super(props);
        this.apply = this.apply.bind(this);
    }

    apply(event) {

        const PIDSelect = document.getElementById("pidSelector").value

        const p = document.getElementById("PValue").value
        const i = document.getElementById("IValue").value
        const d = document.getElementById("DValue").value

        const obj = {
            type: "pid",
            pidType:  parseInt(PIDSelect),
            p: p,
            i: i,
            d: d
        }
        this.props.ws.send(JSON.stringify(obj));

        event.preventDefault();
    }


    render() {
        return (
            <div>
                <form id="newPIDValues" onSubmit={this.apply}>
                <label htmlFor="pid"><p>PID-Regler:</p></label>
                <select name="pidType" id="pidSelector">
                    <option value="1">Roll</option>
                    <option value="2">PITCH</option>
                    <option value="3">YAW</option>
                    <option value="4">ROLL Autolevel</option>
                    <option value="5">PITCH Autolevel</option>
                    <option value="6">YAW Autolevel</option>
                    <option value="7">GPS</option>

                </select>

                <input  name="p" id="PValue" placeholder="P"/>
                <input  name="i" id="IValue" placeholder="I" />
                <input  name="d" id="DValue" placeholder="D"/>

                <button>Übernehmen</button>
                </form>

            </div>
        );
    }

}

export default SetPIDValue;
