import React, {Component} from 'react';
import { v4 as uuidv4 } from 'uuid';
import BreadCrumbStyle from "./BreadCrumb.module.css"
import {FaChevronRight} from 'react-icons/fa';

class BreadCrumb extends Component {

    render() {

        const breadCrumbsElements = [];
        this.props.elements.forEach((e,index) => {


            if(index===(this.props.elements.length-1))  {
                breadCrumbsElements.push(<div key={uuidv4()} className={BreadCrumbStyle.breadCrumb+" "+BreadCrumbStyle.activeBreadCrumb}>{e.name}</div>)

            }else{
                breadCrumbsElements.push(<div onDragLeave={(event)=>this.props.BreadCrumbDragLeave(event,e)} onDragOver={(event)=>this.props.BreadCrumbDragOver(event,e)} onDrop={(event)=>this.props.BreadCrumbDrop(event,e)} onClick={()=>{this.props.clickCallback(index,e)}} key={uuidv4()} className={BreadCrumbStyle.breadCrumb}>{e.name}</div>)
                breadCrumbsElements.push(<FaChevronRight className={BreadCrumbStyle.seperator}/>)

            }



        })

        console.log(breadCrumbsElements)


        return (
            <div className={this.props.className+" "+BreadCrumbStyle.breadCrumbContainer}>
                {breadCrumbsElements}
            </div>
        );
    }
}

export default BreadCrumb;