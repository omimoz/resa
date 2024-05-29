import { CardData } from "../../Types";
import Style from "./Style";
const Card = ({ item, lagecy }: CardData) => {
  const { data, checkContainMinus } = item;
  const { s, c, P } = data;
  const lagecyPrice = lagecy?.data?.c;
  return (
    <div className={Style}>
      <div className="wrapper">
        <div className="container">
          <div className="section">
            <div className="symbole bold">{s ? s : "unknown"}</div>
            <div className="sub">perpetual</div>
          </div>
          <div className="section items-end">
            <div
              className={`price bold ${
                lagecyPrice === c
                  ? ""
                  : lagecyPrice && c && lagecyPrice > c
                  ? "decrease"
                  : "increase"
              }`}
            >
              {Number(c ? c : 0).toString()}
            </div>
            <div
              className={`precentage ${
                checkContainMinus ? "decrease" : "increase"
              }`}
            >
              {!checkContainMinus && "+"}
              {Number(P ? P : 0).toString()}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
