import React, {Component} from 'react';
import CloudFatalErrorStyle from "./CloudFatalError.module.css"

class CloudFatalError extends Component {
    render() {
        return (
            <div className={CloudFatalErrorStyle.container}>
                <h1>No Access</h1>
                <p>
                    Currently you have no access to the cloud. Please try again later.
                </p>

                <p>
                   Cloud is in closed beta. Roll out is in progress.
                </p>
            </div>
        );
    }
}

export default CloudFatalError;