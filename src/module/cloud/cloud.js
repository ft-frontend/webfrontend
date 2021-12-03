import React, {Component} from 'react';
import folderIcon from "../../res/folder.svg";
import fileIcon from "../../res/file.svg";
import api from "../../api/api";
import {v4 as uuidv4} from 'uuid';
import CloudStyle from "./cloud.module.css";
import BreadCrumb from "../../UI/breadcrumb/BreadCrumb";
import FolderContentElement from "./FolderContentElement";
import uploadHandler from "./UploadHandler";

class Cloud extends Component {
    constructor(props) {
        super(props);

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const path = urlParams.get('path') == null ? "/" : urlParams.get('path');
        window.history.replaceState({}, '', "/module/cloud?path=" + path);
        this.state = {
            path: path,
            folderContent: [],
            folderContentElements: [],
            filePath: [],

        };

        this.fetchFolderContent = this.fetchFolderContent.bind(this);
        this.gotoFolder = this.gotoFolder.bind(this);
        this.changeFolder = this.changeFolder.bind(this);
        this.parseURLParams = this.parseURLParams.bind(this);
        this.breadCrumbClick = this.breadCrumbClick.bind(this);
        this.updateBreadCrumb = this.updateBreadCrumb.bind(this);
        this.openFolderContextMenu = this.openFolderContextMenu.bind(this);
        this.dropEvent = this.dropEvent.bind(this);
        this.dragOver = this.dragOver.bind(this);
        this.dragLeave = this.dragLeave.bind(this);
        this.dragStartEvent = this.dragStartEvent.bind(this);
        this.dragEndEvent = this.dragEndEvent.bind(this);
        this.breadCrumbDrop = this.breadCrumbDrop.bind(this);

        this.parseURLParams();


    }

    parseURLParams() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const path = urlParams.get('path') == null ? "/" : urlParams.get('path');
        window.history.replaceState({}, '', "/module/cloud?path=" + path);
        this.setState({
            path: path,
            folderContent: [],
            folderContentElements: []
        });
    }

    changeFolder(newPath) {
        window.history.pushState({}, '', "/module/cloud?path=" + newPath);
        this.setState({
            path: newPath
        });


    }

    updateBreadCrumb(newPath) {
        let filePath = [];
        filePath.push({name: 'Eigene Dateien', path: "/"});
        let pathCounter = "/";
        this.parsePath(newPath).forEach(e => {
            pathCounter += e;

            filePath.push({
                name: e,
                path: pathCounter
            });

            pathCounter += "/";
        });

        this.setState({
            filePath: filePath
        });
    }

    gotoFolder(folderName) {
        if (this.state.path === "/") {

            window.history.pushState({}, '', "/module/cloud?path=" + this.state.path + folderName);
            this.fetchFolderContent(this.state.path + folderName);
            this.updateBreadCrumb(this.state.path + folderName);
            this.setState({
                path: this.state.path + folderName
            });
        } else {

            window.history.pushState({}, '', "/module/cloud?path=" + this.state.path + "/" + folderName);
            this.fetchFolderContent(this.state.path + "/" + folderName);
            this.updateBreadCrumb(this.state.path + "/" + folderName);
            this.setState({
                path: this.state.path + "/" + folderName
            });
        }


    }

    componentDidMount() {
        this.fetchFolderContent(this.state.path);

        this.popStateEventHandler = (event) => {
            this.parseURLParams();
            this.fetchFolderContent(this.state.path);
        };

        window.addEventListener('popstate', this.popStateEventHandler);

    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.popStateEventHandler);
    }

    fetchFolderContent(folder) {
        this.setState({
            folderContentElements: []
        });
        api.listCloudFilesInDirectory(folder).then(result => {
            if (result.result === false) return;

            let folderContentElements = [];
            result.foundFolder.files.forEach(content => {
                if (content.isFolder === true) {

                    folderContentElements.push(
                        <FolderContentElement folder={true} dragStartEvent={this.dragStartEvent}
                                              dragEndEvent={this.dragEndEvent} dropEvent={this.dropEvent}
                                              dragOver={this.dragOver} dragLeave={this.dragLeave} key={uuidv4()}
                                              name={content.name} clickCallback={this.gotoFolder}/>
                    );

                } else {
                    folderContentElements.push(
                        <FolderContentElement folder={false} dragStartEvent={this.dragStartEvent}
                                              dragEndEvent={this.dragEndEvent} dropEvent={this.dropEvent}
                                              dragOver={this.dragOver} dragLeave={this.dragLeave} key={uuidv4()}
                                              name={content.name} clickCallback={this.gotoFolder}/>
                    );


                }


            });

            this.setState({
                folderContentElements: folderContentElements,
                folderContent: result.foundFolder

            });

            this.updateBreadCrumb(folder);
        });
    }

    openFolderContextMenu(event) {

        event.preventDefault();

    }

    parsePath(path) {
        const pathsArray = [];

        path.split('/').forEach(element => {
            if (element === "") return;
            pathsArray.push(element);
        });
        return pathsArray;
    }


    breadCrumbClick(index, e) {
        this.changeFolder(e.path);
        this.fetchFolderContent(e.path);
    }


    render() {


        return (
            <div className={CloudStyle.cloudContainer}>
                <BreadCrumb BreadCrumbDrop={this.breadCrumbDrop} BreadCrumbDragOver={this.dragOver}
                            BreadCrumbDragLeave={this.dragLeave} clickCallback={this.breadCrumbClick}
                            className={CloudStyle.pathList} elements={this.state.filePath}/>

                <div className={CloudStyle.filesContainer}>
                    {this.state.folderContentElements}


                </div>
            </div>
        );
    }

    dropEvent(event, name) {
        event.preventDefault();
        event.target.classList.remove(CloudStyle.folderFileHover);
        if (this.state.draggingElement != null) {
            if (this.state.draggingElement !== event.target) {

                api.moveCloudResourceTo(this.state.path, this.state.draggingResourceName, this.state.path === "/" ? this.state.path + name : this.state.path + "/" + name).then(() => {

                    this.fetchFolderContent(this.state.path === "/" ? this.state.path + name : this.state.path + "/" + name); //go to folder
                    this.setState({
                        path: this.state.path === "/" ? this.state.path + name : this.state.path + "/" + name
                    });
                });
            }

        } else {

            uploadHandler.handleFileUpload(event.dataTransfer.items,this.state.path === "/" ? this.state.path + name : this.state.path + "/" + name)
            //TODO File upload
            console.log(event);

        }


    }


    breadCrumbDrop(event, e) {
        event.preventDefault();
        event.target.classList.remove(CloudStyle.folderFileHover);

        if (this.state.draggingElement != null) {
            if (this.state.draggingElement !== event.target) {

                api.moveCloudResourceTo(this.state.path, this.state.draggingResourceName, e.path).then(() => {
                    this.setState({
                        path: e.path
                    });
                    this.fetchFolderContent(e.path); //go to folder

                });

            }

        } else {

            //TODO File upload

        }

    }

    dragOver(event) {
        event.preventDefault();
        

        if (event.target !== this.state.draggingElement) {
            event.target.classList.add(CloudStyle.folderFileHover);
        }

    }

    dragLeave(event) {
        event.preventDefault();
        event.target.classList.remove(CloudStyle.folderFileHover);

    }

    dragStartEvent(event, name) {
        this.setState({
            draggingElement: event.target,
            draggingResourceName: name
        });
    }

    dragEndEvent(event) {

        this.setState({
            draggingElement: null,
            draggingResourceName: ""
        });
    }



}

export default Cloud;