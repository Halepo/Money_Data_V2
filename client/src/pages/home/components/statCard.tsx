import React from 'react';

export default function StatCard() {
  return (
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
                  </span>{' '}
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
  );
}
