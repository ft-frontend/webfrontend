import React, {Component} from 'react';
import CloudFolderSelectorStyle from './CloudFolderSelector.module.css';

class CloudFolderSelector extends Component {
    render() {
        return (
            <div className={CloudFolderSelectorStyle.spaceSelector}>

                <div className={CloudFolderSelectorStyle.headline}>
                    <p>
                        {window.localStorage.getItem('username')}
                    </p>
                </div>

            </div>
        );
    }
}

export default CloudFolderSelector;