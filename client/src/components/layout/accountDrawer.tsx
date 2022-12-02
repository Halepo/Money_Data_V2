import "./accountDrawer.sass";

export default function AccountDrawer({
  button,
  sliderItems,
}: {
  button: JSX.Element;
  sliderItems: JSX.Element;
}) {
  console.log("ZZZZZZZZZ", sliderItems);
  return (
    <>
      <div className="dropdown show">
        <a
          className="btn dropdown-toggle"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {button}
        </a>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a className="dropdown-item" href="#">
            {sliderItems}
          </a>
        </div>
      </div>
    </>
  );
}

/* import "./accountDrawer.sass";

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
        data-bs-toggle="modal"
        data-bs-target="#accountModal"
      >
        {button}
      </button>

      <div
        className="modal fade bd-example-modal-lg"
        tabIndex={-1}
        id="accountModal"
        role="dialog"
        aria-labelledby=""
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">{sliderItems}</div>
        </div>
      </div>
    </>
  );
}
 */
