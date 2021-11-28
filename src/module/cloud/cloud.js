import React, {Component} from 'react';
import folderIcon from "../../res/folder.svg";
import fileIcon from "../../res/file.svg";
import api from "../../api/api";
import { v4 as uuidv4 } from 'uuid';
import CloudStyle from "./cloud.module.css"

class Cloud extends Component {
    constructor(props) {
        super(props);

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const path = urlParams.get('path')==null?"/":urlParams.get('path');
        window.history.replaceState({}, '', "/module/cloud?path="+path);
        this.state ={
            path: path,
            folderContent: [],
            folderContentElements: []
        };

        this.fetchFolderContent =this.fetchFolderContent.bind(this)
        this.gotoFolder =this.gotoFolder.bind(this)
        this.changeFolder =this.changeFolder.bind(this)
        this.parseURLParams =this.parseURLParams.bind(this)

        this.parseURLParams();



    }
    parseURLParams() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const path = urlParams.get('path')==null?"/":urlParams.get('path');
        window.history.replaceState({}, '', "/module/cloud?path="+path);
        this.setState({
            path: path,
            folderContent: [],
            folderContentElements: []
        });
    }

    changeFolder(newPath) {
        window.history.pushState({}, '', "/module/cloud?path="+newPath);
    }

    gotoFolder(folderName) {
        if(this.state.path==="/") {
            this.setState({
                path: this.state.path+folderName
            })
            window.history.pushState({}, '', "/module/cloud?path="+this.state.path+folderName);
            this.fetchFolderContent(this.state.path+folderName);
        }else{
            this.setState({
                path: this.state.path+"/"+folderName
            })
            window.history.pushState({}, '', "/module/cloud?path="+this.state.path+"/"+folderName);
            this.fetchFolderContent(this.state.path+"/"+folderName);
        }


    }

    componentDidMount() {
        this.fetchFolderContent(this.state.path);

        this.popStateEventHandler = (event)=>{
            this.parseURLParams();
            this.fetchFolderContent(this.state.path);
        };

        window.addEventListener('popstate',this.popStateEventHandler)

    }

    componentWillUnmount() {
        window.removeEventListener('popstate',this.popStateEventHandler)
    }

    fetchFolderContent(folder) {
        api.listCloudFilesInDirectory(folder).then(result=>{
            if(result.result===false) return;

            console.log(result)
            let folderContentElements = [];
            result.foundFolder.files.forEach(content=>{
                if(content.isFolder===true) {

                    folderContentElements.push(

                        <div onClick={()=>{this.gotoFolder(content.name)}} className={CloudStyle.fileEntry}>

                            <div className={CloudStyle.fileEntryImageContainer}><img className={CloudStyle.fileEntryImage} key={uuidv4()} src={folderIcon}  alt="folder"/></div>
                            <p className={CloudStyle.fileName}>{content.name}</p>

                        </div>

                    )

                }else{
                    folderContentElements.push(

                        <div  className={CloudStyle.fileEntry}>

                            <img className={CloudStyle.fileEntryImage} key={uuidv4()} src={fileIcon}  alt="file"/>
                            <p className={CloudStyle.fileName}>{content.name}</p>

                        </div>

                    )


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
            <div className={CloudStyle.cloudContainer}>

                <div className={CloudStyle.filesContainer}>
                    {this.state.folderContentElements}


                </div>
            </div>
        );
    }
}

export default Cloud;