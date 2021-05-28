import React from 'react'



export const ConfirmDelete = (props) => {
    const { ConfirmationMessage, ConfirmationTitle, deleteHandler } = props;


    return (
        <div className="modal fade show d-block" id="exampleModal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{ConfirmationTitle}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => deleteHandler(false)}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {ConfirmationMessage}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => deleteHandler(false)}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={event => deleteHandler(true)}>Delete</button>
                    </div>
                </div >
            </div >
        </div>
    );
}