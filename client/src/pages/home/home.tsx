import './home.sass';
import TransactionsDataTable from '../transactions/transactionsDataTable';
import StatCard from './components/statCard';
import ActionButtons from './components/actionButtons';
import Modal from '../layout/modal/modal';

export default function Home(props: any) {
  console.log('Home rendered!');
  return (
    <div className="home-wrapper">
      <div className="container-fluid py-4">
        <ActionButtons />
        <div className="row">
          <StatCard />
          <StatCard />
          <StatCard />
          <StatCard />

          <TransactionsDataTable />

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
                <div className="chart">
                  <img
                    src="https://www.amcharts.com/wp-content/uploads/2019/02/demo_13290_none-1-1024x690.png"
                    width="700px"
                    height="300px"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 mb-lg-0 mb-4">
            <div className="card z-index-2 h-100">
              <div className="card-header pb-0 pt-3 bg-transparent">
                <h6 className="text-capitalize">Others</h6>
                <p className="text-sm mb-0">
                  <i className="bi bi-arrow-up"></i>
                  <span className="font-weight-bold">4% more</span> " in 2021 "
                </p>
              </div>
              <div className="card-body p-3">
                <div className="chart">
                  <img
                    src="https://d2mvzyuse3lwjc.cloudfront.net/doc/en/UserGuide/images/2D_B_and_W_Pie_Chart/2D_B_W_Pie_Chart_1.png?v=83139"
                    width="450px"
                    height="350px"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
