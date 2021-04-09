import { PureComponent } from "react";
import s from "./monthlyPayments.module.css";

// type PropsType = {
//     over: number,
//     parts: number,
//     partCost: string,
//     total: number,
//     currency: string,
// };

/**
 * Popup for information about monthly payments
 */
export class MonthlyPayments extends PureComponent {
  /**
   * Render title popup
   * @returns {DOM} Rendered react component
   */
  renderTitlePopup() {
    const { parts, total, over, currency, partCost } = this.props;

    if (total < over) return null;

    return (
      <span>
        Your monthly payment {currency}
        {partCost} (
        <span className="payment">
          {currency}
          {partCost} &times; {parts} = {currency}
          {total}
        </span>
        )
      </span>
    );
  }

  /**
   * Render jsx to html
   * @returns {React.DOM} Rendered react component
   */
  render() {
    return (
      <div className={s.monthlyPayments} id="monthly-popup">
        <header className={s.header}>
          <h4 className={s.headerCaption}>{this.renderTitlePopup()}</h4>
        </header>
        <div className={s.body}>
          <h2 className={s.bodyCaption}>Interest Free Monthly Payments</h2>
          <span className={s.bodyDescription}>
            Pay Over 3 Months | No Fees | 0% Interest
          </span>
          <p className={s.bodyQuestion}>How it works? (Important to know)</p>
          <ul className={s.bodyQuestionDescription}>
            <li className={s.bodyQuestionDescriptionItem}>
              <b>
                The entire amount is held in reserve on your credit card to
                ensure payment,
              </b>
              the card is only
              <br />
              charged for the 1st month&apos;s installment. No Charges apply to
              the held amount.
            </li>
            <li className={s.bodyQuestionDescriptionItem}>
              Installment payments will be charged monthly to your credit card.
              The credit line hold will be
              <br />
              reduced monthly by the same amount.
            </li>
            <li className={s.bodyQuestionDescriptionItem}>
              The Credit Card bill will only show the $100 monthly payment, the
              remaining amount on hold
              <br />
              will not show up as a debt. The revolving credit interest only
              includes actual charged amounts.
            </li>
          </ul>
          <p className={s.bodyQuestion2}>
            To be eligible all you need is the following:
          </p>
          <ul className={s.bodyQuestion2Description}>
            <li className={s.bodyQuestion2DescriptionItem}>
              * VISA or MasterCard credit card
            </li>
            <li className={s.bodyQuestion2DescriptionItem}>
              * Have the entire amount of your purchase available on your card.
            </li>
          </ul>
          <table className={s.bodyTable}>
            <thead>
              <tr>
                <th>Product Price</th>
                <th>Month #1</th>
                <th>Month #2</th>
                <th>Month #3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="2">$300</td>
                <td>$100 Paid</td>
                <td>$100 Paid</td>
                <td>$100 Paid</td>
              </tr>
              <tr>
                <td>$200 Held</td>
                <td>$100 Held</td>
                <td>$0 Held</td>
              </tr>
            </tbody>
          </table>
          <p className={s.bodyAnswer}>
            JUST SELECT “PAY WITH SPLITIT” AT CHECKOUT
          </p>
        </div>
      </div>
    );
  }
}
