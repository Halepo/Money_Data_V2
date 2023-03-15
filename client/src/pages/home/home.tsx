import './home.sass';
import TransactionsDataTable from '../transactions/transactionsDataTable';
import StatCard from './components/statCard';
import Modal from '../../components/shared/modal/modal';

import { RegisterAccountForm } from './account/registerAccountForm';
import { UilPlusCircle } from '@iconscout/react-unicons';

const NewContent = (): any => {
  return (
    <>
      <div className="modal-body">
        <p>
          This is some placeholder content to show the scrolling behavior for
          modals. We use repeated line breaks to demonstrate how content can
          exceed minimum inner height, thereby showing inner scrolling. When
          content becomes longer than the prefedined max-height of modal,
          content will be cropped and scrollable within the modal.
        </p>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p>This content should appear at the bottom after you scroll.</p>
      </div>
    </>
  );
};

export default function Home(props: any) {
  console.log('Home rendered!');
  return (
    <div className="home-wrapper">
      <div className="container-fluid">
        <div className="row pb-4">
          <Modal
            title="Add Account"
            buttonName="Add Account"
            buttonIcon={<UilPlusCircle />}
            content={<RegisterAccountForm />}
            buttonMaxWidth="16rem"
          />
          <Modal
            title="Add Income"
            buttonName="Add Income"
            buttonIcon={<UilPlusCircle />}
            content={<NewContent />}
            buttonMaxWidth="16rem"
          />
          <Modal
            title="Add Expense"
            buttonName="Add Expense"
            buttonIcon={<UilPlusCircle />}
            content={<h1>Expense</h1>}
            buttonMaxWidth="16rem"
          />
        </div>
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
