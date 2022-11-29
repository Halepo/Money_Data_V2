import './cardContainer.sass';

export default function CardContainer(props: any) {
  return (
    <div className="card-container-head-container">
      <div className="card-container-wrapper card">
        <div className="card-container-head-container ">
          <h4 className="card-container-section-title">{props.cardTitle}</h4>
          {props.headContent}
        </div>
        <div className="card-container-card-container container">
          {props.bodyContent}
        </div>
      </div>
    </div>
  );
}
