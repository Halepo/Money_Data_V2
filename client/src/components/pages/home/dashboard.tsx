import "./dashboard.css";
import TransactionsDataTable from "../transactions/transactionsDataTable";

export default function Dashboard(props: any) {
  console.log("dashboard rendered!");
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      Today's Cash
                    </p>
                    <h5 className="font-weight-bolder">55,000 Birr</h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        +60%
                      </span>{" "}
                      " since yesterday"
                    </p>
                  </div>
                </div>
                <div className="col-4 icon-style">
                  <i className="bi bi-cash-coin"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      Today's Cash
                    </p>
                    <h5 className="font-weight-bolder">55,000 Birr</h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        +60%
                      </span>{" "}
                      " since yesterday"
                    </p>
                  </div>
                </div>
                <div className="col-4 icon-style">
                  <i className="bi bi-cash-coin"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      Today's Cash
                    </p>
                    <h5 className="font-weight-bolder">55,000 Birr</h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        +60%
                      </span>{" "}
                      " since yesterday"
                    </p>
                  </div>
                </div>
                <div className="col-4 icon-style">
                  <i className="bi bi-cash-coin"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      Today's Cash
                    </p>
                    <h5 className="font-weight-bolder">55,000 Birr</h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        +60%
                      </span>{" "}
                      " since yesterday"
                    </p>
                  </div>
                </div>
                <div className="col-4 icon-style">
                  <i className="bi bi-cash-coin"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4"></div>
        <div className="col-lg-7 mb-lg-0 mb-4">
          <div className="card z-index-2 h-100">
            <div className="card-header pb-0 pt-3 bg-transparent">
              <h6 className="text-capitalize">Overview</h6>
              <p className="text-sm mb-0">
                <i className="bi bi-arrow-up"></i>
                <span className="font-weight-bold">4% more</span> " in 2021 "
              </p>
            </div>
            <div className="card-body p-3">
              <div className="chart">Do chart here</div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">Do another chart here</div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-12 mb-lg-0 mb-4">
          <div className="card">
            <div className="card-header pb-0 p-3">
              <div className="d-flex justify-content-between">
                <h6 className="mb-2">Table of cash</h6>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table align-items-center ">
                <TransactionsDataTable />
              </table>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-5">
          <div className="card">
            <div className="card-header pb-0 p-3">
              <h6 className="mb-0">Categories</h6>
            </div>
            <div className="card-body p-3"></div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
