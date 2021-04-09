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
      getData: jest.fn(),
      isLoaded: true
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

  it("should render text and button if total > over", () => {
    wrapper.setProps({ total: 150, over: 100 });
    expect(wrapper.contains("Or $ 50.00 x 3")).toBe(true);
    expect(wrapper.find('[title="learn more"]')).toHaveLength(1);
  });

  it("should NOT render text and button if total < over", () => {
    wrapper.setProps({ total: 100, over: 120 });

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it("should NOT render text and button if data is loading", () => {
    wrapper.setProps({ total: 150, over: 100, isLoaded: false });

    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
