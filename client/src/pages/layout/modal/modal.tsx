import { useEffect, useRef } from 'react';
import CustomButton from '../../../components/shared/customButton';
import './modal.sass';

// const ModalTrigger = () => {
//   return (
//     <button
//       type="button"
//       classNameName="btn btn-demo"
//       data-toggle="modal"
//       data-target="#myModal"
//     >
//       Left Sidebar Modal
//     </button>
//   );
// };

export default function Modal(props: any) {
  console.log(props);

  const buttonName: any = props.buttonName ? props.buttonName : 'Open Modal';
  const buttonIcon: any = props.buttonIcon ? props.buttonIcon : '';
  const modalContent: any = props.modalContent ? props.modalContent : '';
  const buttonMaxWidth: any = props.buttonMaxWidth
    ? props.buttonMaxWidth
    : '16rem';

  return (
    <div style={{ maxWidth: buttonMaxWidth }}>
      <CustomButton
        width="inherit"
        icon={buttonIcon}
        name={buttonName}
        type="button"
        className=""
        dataBsToggle="modal"
        dataBsTarget="#custom-modal-right"
      ></CustomButton>

      {/* <button
        type="button"
        className="btn btn btn-secondary p-2 m-2"
        data-bs-toggle="modal"
        data-bs-target="#custom-modal-left"
      >
        Custom Modal left
      </button> */}
      <div
        className="modal right"
        id="custom-modal-right"
        tabIndex={-1}
        aria-labelledby="modal-title"
        style={{ display: 'none' }}
        aria-hidden="true"
      >
        {modalContent}
        <div className="modal-dialog  modal-dialog-zee">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-title">
                Modal Title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{props.modalContent}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
