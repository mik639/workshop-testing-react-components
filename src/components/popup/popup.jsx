import { PureComponent } from "react";
import RCPopup from "rc-dialog";
import classNames from "classnames";

import './popup.css';

// type PropsType = {
//     className?: string,
//     zIndex?: number | string,
//     wrapClassName?: string,
//     visible: boolean,
//     style?: {},
//     onClose?: VoidFunctionType<>,
//     full?: boolean,
//     showClose?: boolean,
// };

/**
 * Show content with blue close button
 */
export class Popup extends PureComponent {
  static defaultProps = {
    full: false,
    showClose: true,
    zIndex: "",
    wrapClassName: "",
    className: "",
    style: {},
    onClose: () => {}
  };

  onClose = () => {
    if (typeof this.props.onClose === "function") this.props.onClose();
  };

  /**
   * Render jsx to html
   * @returns {Node} Rendered react component
   */
  render() {
    return (
      <RCPopup
        {...this.props}
        onClose={this.onClose}
        destroyOnClose
        className={classNames(this.props.className, {
          "full-popup": this.props.full,
          "hide-close": !this.props.showClose
        })}
      />
    );
  }
}
