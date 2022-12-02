import './accountDrawer.sass';

export default function AccountDrawer({
  button,
  sliderItems,
}: {
  button: JSX.Element;
  sliderItems: JSX.Element;
}) {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#modal1234"
      >
        Large modal
      </button>

      <div
        id="modal1234"
        className="modal fade bd-example-modal-lg"
        tabIndex={-1}
        role="dialog"
        aria-labelledby=""
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">This is the modal content</div>
        </div>
      </div>
    </>
  );
}
