import React, {Component} from 'react';
import folderIcon from "../../res/folder.svg";
import fileIcon from "../../res/file.svg";
import api from "../../api/api";
import { v4 as uuidv4 } from 'uuid';

class Cloud extends Component {
    constructor(props) {
        super(props);

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const path = urlParams.get('path')==null?"/":urlParams.get('path');
        window.history.replaceState({}, '', "/module/cloud?path="+path);

        this.state = {
            path: path,
            folderContent: [],
            folderContentElements: []
        }
        this.fetchFolderContent =this.fetchFolderContent.bind(this)
        this.gotoFolder =this.gotoFolder.bind(this)
        this.changeFolder =this.changeFolder.bind(this)



    }

    changeFolder(newPath) {
        window.history.replaceState({}, '', "/module/cloud?path="+newPath);
    }

    gotoFolder(folderName) {
        if(this.state.path==="/") {
            this.setState({
                path: this.state.path+folderName
            })
            window.history.replaceState({}, '', "/module/cloud?path="+this.state.path+folderName);
            this.fetchFolderContent(this.state.path+folderName);
        }else{
            this.setState({
                path: this.state.path+"/"+folderName
            })
            window.history.replaceState({}, '', "/module/cloud?path="+this.state.path+"/"+folderName);
            this.fetchFolderContent(this.state.path+"/"+folderName);
        }


    }

    componentDidMount() {
        this.fetchFolderContent(this.state.path);

    }

    fetchFolderContent(folder) {
        api.listCloudFilesInDirectory(folder).then(result=>{
            if(result.result===false) return;

            console.log(result)
            let folderContentElements = [];
            result.foundFolder.files.forEach(content=>{
                if(content.isFolder===true) {

                    folderContentElements.push(<img onClick={()=>{this.gotoFolder(content.name)}} key={uuidv4()} src={folderIcon} height={50} width={50} alt="folder"/>)

                }else{
                    folderContentElements.push(<img key={uuidv4()} src={fileIcon} height={50} width={50} alt="folder"/>)

                }


            })

            this.setState({
                folderContentElements: folderContentElements,
                folderContent:result.foundFolder

            })
        })
    }



    render() {



        return (
            <div>
                Ich bin die Cloud
                {this.state.folderContentElements}
            </div>
        );
    }
}

export default Cloud;