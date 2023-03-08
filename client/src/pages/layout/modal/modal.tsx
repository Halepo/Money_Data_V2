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

export default function Modal() {
  return (
    <div>
      <button
        type="button"
        className="btn btn btn-secondary p-2 m-2"
        data-bs-toggle="modal"
        data-bs-target="#custom-modal-right"
      >
        Custom Modal Right
      </button>
      <button
        type="button"
        className="btn btn btn-secondary p-2 m-2"
        data-bs-toggle="modal"
        data-bs-target="#custom-modal-left"
      >
        Custom Modal left
      </button>
      <div
        className="modal right"
        id="custom-modal-right"
        tabIndex={-1}
        aria-labelledby="modal-title"
        style={{ display: 'none' }}
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-zee">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-title">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                This is some placeholder content to show a vertically centered
                modal.
              </p>
              <br />
              <p>Just like that.</p>
            </div>
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

      <div
        className="modal left"
        id="custom-modal-left"
        tabIndex={-1}
        aria-labelledby="modal-title"
        style={{ display: 'none' }}
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-zee-l">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-title">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                This is some placeholder content to show a vertically centered
                modal.
              </p>
              <br />
              <p>Just like that.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
