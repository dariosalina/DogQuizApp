import React, { Component} from 'react'


class OptionComponents extends Component{
    render(){
        return(
            <div className=" optionComponents">  
                <button type="button" class="btn btn-outline-dark">{this.props.breed}</button>
            </div>
        )
    }
}


export default OptionComponents