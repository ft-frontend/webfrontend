import React, {Component} from 'react';
import FolderContentElementStyle from "./FolderContentElement.module.css";
import folderIcon from "../../res/folder.svg";
import fileIcon from "../../res/file.svg";

class FolderContentElement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false
        };
    }

    render() {
        return (

                this.props.folder?
                    <div onDragEnd={(e)=>this.props.dragEndEvent(e,this.props.name)} onDragStart={(e)=>this.props.dragStartEvent(e,this.props.name)} onDrop={(e)=>{this.props.dropEvent(e,this.props.name)}} onDragOver={this.props.dragOver} onDragLeave={this.props.dragLeave}  key={this.props.key} onClick={()=>{this.props.clickCallback(this.props.name)}} className={FolderContentElementStyle.fileEntry+" "+(this.state.isSelected?FolderContentElementStyle.selectedFile:"")}>

                        <div className={FolderContentElementStyle.fileEntryImageContainer}><img className={FolderContentElementStyle.fileEntryImage} src={folderIcon}  alt="folder"/></div>
                        <p className={FolderContentElementStyle.fileName}>{this.props.name}</p>

                    </div>:
                    <div onDragOver={(e)=>{e.stopPropagation();e.preventDefault();}} onDragEnd={(e)=>this.props.dragEndEvent(e,this.props.name)} onDragStart={(e)=>this.props.dragStartEvent(e,this.props.name)} key={this.props.key}  className={FolderContentElementStyle.fileEntry+" "+(this.state.isSelected?FolderContentElementStyle.selectedFile:"")}>

                        <div className={FolderContentElementStyle.fileEntryImageContainer}><img className={FolderContentElementStyle.fileEntryImage}  src={fileIcon}  alt="file"/></div>
                        <p className={FolderContentElementStyle.fileName}>{this.props.name}</p>

                    </div>



        );
    }
}

export default FolderContentElement;