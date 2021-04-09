import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { SplitIt } from "./splitIt";

configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe("<SplitIt/> in base product info", () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = {
      total: 150,
      instalments: 3,
      over: 120,
      currency: "$",
      getData: jest.fn()
    };
    wrapper = shallow(<SplitIt {...props} />);
    window.dataLayer = [];
  });

  describe("componentDidMount method", () => {
    it("should call props getData", () => {
      expect(props.getData).not.toHaveBeenCalled();

      wrapper.instance().componentDidMount();
      expect(props.getData).toHaveBeenCalled();
    });
  });

  describe("openPopup method", () => {
    it("should change popupVisible in state in true", () => {
      wrapper.setState({ popupVisible: false });
      wrapper.instance().openPopup();
      expect(wrapper.state("popupVisible")).toBe(true);
    });

    it("should send analytics event", () => {
      const spy = jest.spyOn(window.dataLayer, "push");
      expect(spy).not.toHaveBeenCalled();
      wrapper.instance().openPopup();
      expect(spy).toHaveBeenCalledWith({
        event: "PDPInteraction",
        eventAction: "Product Details",
        eventCategory: "PDP - D",
        eventLabel: "Learn More - Split It"
      });
    });
  });

  describe("closePopup method", () => {
    it("should change popupVisible in state in false", () => {
      wrapper.setState({ popupVisible: true });

      wrapper.instance().closePopup();
      expect(wrapper.state("popupVisible")).toBe(false);
    });
  });
});
