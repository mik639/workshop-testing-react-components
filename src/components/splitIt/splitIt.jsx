import { PureComponent } from "react";
import { connect } from "react-redux";

import { sendAnalytics, PDP } from "../../libs/analytics";
import { fetchSplitIt } from "../../store/splitIt";
import { QuestionMark } from "../icons/questionMark";
import { Popup } from "../popup/popup";
import { MonthlyPayments } from "./monthlyPayments";

import s from "./splitIt.module.css";

// Props {
//   total: number,
//   instalments: number,
//   over: number,
//   currency: string,
//   getData: ActionCreatorType<>,
//   isLoaded: boolean
// };

// State {
//   popupVisible: boolean,
// };

export class SplitIt extends PureComponent {
  static defaultProps = {
    currency: "$"
  };

  state = {
    popupVisible: false
  };

  componentDidMount() {
    this.props.getData();
  }

  /**
   * Open Monthly Payments popup
   */
  openPopup = () => {
    sendAnalytics(PDP.SPLIT_IT_LEARN_MORE);
    this.setState({ popupVisible: true });
  };

  /**
   * Close Monthly Payments popup
   */
  closePopup = () => {
    this.setState({ popupVisible: false });
  };

  render() {
    const { popupVisible } = this.state;
    const { over, total, instalments, currency, isLoaded } = this.props;
    const instalmentPrice = (total / instalments).toFixed(2);

    if (!isLoaded) return null;

    return (
      total > over && (
        <div className={s.container}>
          <div className={s.text}>
            <span
              className={s.item}
            >{`Or ${currency} ${instalmentPrice} x ${instalments}`}</span>
            <span>
              Interest - Free Payments
              <button className={s.btn} onClick={this.openPopup}>
                <QuestionMark />
              </button>
            </span>
          </div>
          <Popup onClose={this.closePopup} visible={popupVisible}>
            <MonthlyPayments
              over={over}
              parts={instalments}
              partCost={Number(instalmentPrice)}
              total={total}
              currency={currency}
            />
          </Popup>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  instalments: state.splitIt.installments,
  over: state.splitIt.minTotal,
  isLoaded: state.splitIt.status === "fulfilled"
});

export const SplitItConnected = connect(mapStateToProps, {
  getData: fetchSplitIt
})(SplitIt);
