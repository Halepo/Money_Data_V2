import { useEffect, useRef, useState } from 'react';
import CustomButton from '../customButton';
import './modal.sass';
import useUI from '../../../helpers/hooks/useUI';

export default function Modal({
  buttonName,
  buttonIcon,
  buttonMaxWidth,
  content,
  title,
}: any) {
  //TODO Create a modal context and we will only pass content to it as opposed to mounting modal everywhere. (Very Important)
  const { isModalOpen, setIsModalOpen } = useUI();

  const [isThisModalOpen, setIsThisModalOpen] = useState(isModalOpen);

  const toggleModalVisible = () => {
    setIsThisModalOpen(!isThisModalOpen);
    setIsModalOpen(!isThisModalOpen);
  };
  const { deviceTypeByWidth } = useUI();
  let modalMinWidth = '50%';

  if (deviceTypeByWidth == 'mobile') modalMinWidth = '100%';
  if (deviceTypeByWidth == 'tablet') modalMinWidth = '75%';
  if (deviceTypeByWidth == 'desktop') modalMinWidth = '50%';

  return (
    <div style={{ maxWidth: buttonMaxWidth }}>
      <CustomButton
        style={{ width: 'inherit' }}
        icon={buttonIcon}
        name={buttonName}
        type="button"
        className="modal-trigger"
        onClick={() => {
          toggleModalVisible();
        }}
      ></CustomButton>

      <div
        className="modal-zee right"
        id="custom-modal-right"
        tabIndex={-1}
        style={{ display: isThisModalOpen ? 'block' : 'none' }}
      >
        <div className="modal-dialog-zee" style={{ minWidth: modalMinWidth }}>
          <div className="modal-content-zee">
            <div className="modal-header-zee">
              <h1 className="modal-title-zee fs-5" id="modal-title-zee">
                {title}
              </h1>
              <button
                type="button"
                className="modal-close-button-zee btn-close"
                aria-label="Close"
                onClick={() => {
                  toggleModalVisible();
                }}
              >
                x
              </button>
            </div>

            <div className="modal-body-zee">{content}</div>

            <div className="modal-footer-zee">
              <CustomButton
                type="button"
                className="btn btn-primary"
                style={{ fontColor: 'green', fontWight: 'bold' }}
              >
                Save changes
              </CustomButton>
              <CustomButton
                style={{ fontColor: 'red', fontWight: 'bold' }}
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  toggleModalVisible();
                }}
              >
                Close
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
      {isThisModalOpen ? (
        <div
          onClick={() => {
            toggleModalVisible();
          }}
          className="modal-backdrop-zee show"
        ></div>
      ) : (
        ''
      )}
    </div>
  );
}
