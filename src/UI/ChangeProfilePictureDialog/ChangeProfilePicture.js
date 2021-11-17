import React, {Component} from 'react';
import ChangeProfilePictureStyle from "./ChangeProfilePicture.module.css";
import api from "../../api/api";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {withTranslation} from "react-i18next";
import EventSystem from "../../EventSystem";


class ChangeProfilePicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogWidth: 500,
            dialogHeight: 600,
            inImageCrop: false,
            imageURL: "",
            crop: {
                unit: "%",
                aspect: 1,
                width: 128
            }

        };
        this.closeCallback = this.props.onClose;
        this.onDialogClick = this.onDialogClick.bind(this);
        this.onDialogClose = this.onDialogClose.bind(this);
        this.gotoImageCrop = this.gotoImageCrop.bind(this);
        this.openFileSelectDialog = this.openFileSelectDialog.bind(this);
        this.gotoImageSelect = this.gotoImageSelect.bind(this);
        this.applyImage = this.applyImage.bind(this);
        this.onCropImageLoad = this.onCropImageLoad.bind(this);
        this.getCroppedImg = this.getCroppedImg.bind(this);
    }

    onDialogClick(event) {
        event.stopPropagation();
    }

    onDialogClose(event) {
        if(this.state.inImageCrop) {
            this.gotoImageSelect(undefined,true);
        }else{
            this.closeCallback();
        }

    }

    gotoImageCrop(event) {
        console.log(event.target.result);
        if (event.target.files && event.target.files.length > 0) {


            this.setState({
                dialogWidth: 1000,
                dialogHeight: 700,
                inImageCrop: true,
                imageURL: URL.createObjectURL(event.target.files[0])
            });
        }
    }

    gotoImageSelect(event,noError) {


        this.setState({
            dialogWidth: 500,
            dialogHeight: 600,
            inImageCrop: false,
            error: !noError&&this.props.t('error_2')
        });

    }

    openFileSelectDialog(event) {
        document.getElementById("openFileSelectDialogButtonInput").click();
    }

    applyImage(event) {
        this.getCroppedImg(this.imageRef,this.state.crop,"profileImage").then(blob=>{
            api.uploadProfileImage(blob).then(()=>{
                EventSystem.dispatch('profilePictureChange',null);
                this.closeCallback();

            })
        })

    }

    onCropImageLoad(image) {
        this.imageRef = image;

    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        // New lines to be added
        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        // As Base64 string
        // const base64Image = canvas.toDataURL("image/jpeg");
        // return base64Image;

        // As a blob
        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    blob.name = fileName;
                    resolve(blob);
                },
                "image/jpeg",
                1
            );
        });
    }

    render() {
        const {t} = this.props;
        return (
            <>
                <div className={ChangeProfilePictureStyle.dialogPageWrapper} >

                    <div style={{width: this.state.dialogWidth + "px", height: this.state.dialogHeight + "px"}}
                         className={ChangeProfilePictureStyle.dialog} onClick={this.onDialogClick}>

                        <div className={ChangeProfilePictureStyle.dialogControl}>
                            <div className={ChangeProfilePictureStyle.closeButtonWrapper} onClick={this.onDialogClose}>
                                <svg viewBox="0 0 24 24" focusable="false"
                                     className={ChangeProfilePictureStyle.closeButton}>
                                    {!this.state.inImageCrop ?
                                        <path className={ChangeProfilePictureStyle.closeButtonPath}
                                              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41"/>
                                        : <path className={ChangeProfilePictureStyle.closeButtonPath}
                                                d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                                    }
                                </svg>
                            </div>
                        </div>

                        {!this.state.inImageCrop ? <>
                            <div className={ChangeProfilePictureStyle.AccountImage}>
                                <img className={ChangeProfilePictureStyle.accountCircleImage}
                                     src={api.getProfilePictureURL()+"&force="+Math.random()}/>
                            </div>

                            <div
                                className={ChangeProfilePictureStyle.profilePictureText}>{t('direct_translation_profilePicture')}</div>

                            <div
                                className={ChangeProfilePictureStyle.profilePictureExplainText}>{t('profilePictureExplain')}</div>

                            <div className={ChangeProfilePictureStyle.imageError}>{this.state.error}</div>

                            <div className={ChangeProfilePictureStyle.profilePictureChangeButton}
                                 onClick={this.openFileSelectDialog}><span>{t('direct_translation_uploadImage')}</span>
                            </div>
                            <input onChange={this.gotoImageCrop} id="openFileSelectDialogButtonInput"
                                   className={ChangeProfilePictureStyle.openFileSelectDialog} accept="image/jpeg"
                                   type="file"/>
                        </> : <>

                            <div
                                className={ChangeProfilePictureStyle.profileImageCropText}>{t('direct_translation_cropImage')}</div>
                            <ReactCrop onImageError={this.gotoImageSelect} circularCrop={true} keepSelection={true}
                                       crop={this.state.crop} src={this.state.imageURL}
                                       className={ChangeProfilePictureStyle.profilePictureCrop}
                                       onChange={(crop, percentCrop) => {
                                           this.setState({crop});
                                       }}
                                       onImageLoaded={this.onCropImageLoad}
                            />
                            <div
                                className={ChangeProfilePictureStyle.profilePictureUpdateWarningText}>{t('profilePictureUpdateWarning')}</div>

                            <div className={ChangeProfilePictureStyle.profilePictureChangeButton}
                                 onClick={this.applyImage}><span>{t('direct_translation_apply')}</span></div>


                        </>
                        }

                    </div>
                </div>
            </>
        );
    }
}

export default withTranslation()(ChangeProfilePicture);