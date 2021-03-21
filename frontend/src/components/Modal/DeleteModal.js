import { useEffect, useRef } from "react";
import {useDispatch}  from "react-redux"
import {deletePost} from "../../redux/actions/postAction"
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";


const DeleteModal  = (props) => {
    const modal1 = useRef();
    const dispatch = useDispatch()
    const id = props.id.split("modal")[1];

    const handleDeletePost = () => {
        dispatch(deletePost(id))
    }

    useEffect(() => {
        const options = {
            onOpenStart: () => {
              
            },
            onOpenEnd: () => {
              
            },
            onCloseStart: () => {
              
            },
            onCloseEnd: () => {
              
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: true,
            startingTop: "4%",
            endingTop: "10%"
          };
          M.Modal.init(modal1.current, options);
    }, [])

    return (
        <div>
      <div ref={modal1} id={props.id} className="modal">
        <div className="modal-content">
          <h4>Delete this Post?</h4>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-red btn-flat">
            No
          </button>
          <button
            onClick={handleDeletePost}
            className="modal-close waves-effect waves-green btn-flat"
          >
            Yes
          </button>
        </div>
      </div>
    </div>

    )
   
}

export default DeleteModal