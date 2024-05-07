import "./TableHeader.scss";
import sortIcon from "../../../assets/icons/sort-24px.svg";

function TableHeader({
  className,
  firstHeader,
  secondHeader,
  thirdHeader,
  fourthHeader,
  fifthHeader,
  sixthHeader,
  seventhHeader,
}) {
  return (
    <section className="tableHeader">
      <div
        className={`tableHeader__container tableHeader__${className}-container--first`}
      >
        <h4 className="tableHeader__title">{firstHeader}</h4>
        <img
          className="tableHeader__icon"
          src={sortIcon}
          alt="Sorting arrows icon/button"
        />
      </div>
      <div
        className={`tableHeader__container tableHeader__${className}-container--second`}
      >
        <h4 className="tableHeader__title">{secondHeader}</h4>
        <img
          className="tableHeader__icon"
          src={sortIcon}
          alt="Sorting arrows icon/button"
        />
      </div>
      <div
        className={`tableHeader__container tableHeader__${className}-container--third`}
      >
        <h4 className="tableHeader__title">{thirdHeader}</h4>
        <img
          className="tableHeader__icon"
          src={sortIcon}
          alt="Sorting arrows icon/button"
        />
      </div>
      <div
        className={`tableHeader__container tableHeader__${className}-container--fourth`}
      >
        <h4 className="tableHeader__title">{fourthHeader}</h4>
        <img
          className="tableHeader__icon"
          src={sortIcon}
          alt="Sorting arrows icon/button"
        />
      </div>
      <div
        className={`tableHeader__container tableHeader__${className}-container--fifth`}
      >
        <h4 className="tableHeader__title">{fifthHeader}</h4>
        <img
          className="tableHeader__icon"
          src={sortIcon}
          alt="Sorting arrows icon/button"
        />
      </div>
      <div
        className={`tableHeader__container tableHeader__${className}-container--sixth`}
      >
        <h4 className="tableHeader__title">{sixthHeader}</h4>
      </div>
      <div
        className={`tableHeader__container tableHeader__${className}-container--sixth`}
      >
        <h4 className="tableHeader__title">{seventhHeader}</h4>
      </div>
    </section>
  );
}

export default TableHeader;
