import React from "react";
import '@testing-library/jest-dom';
import {render, waitFor, fireEvent} from '@testing-library/react';

import { SplitIt } from "./splitIt";

describe("<SplitIt/> in base product info", () => {
  let props;
  beforeEach(() => {
    props = {
      total: 150,
      instalments: 3,
      over: 120,
      currency: "$",
      getData: jest.fn(),
      isLoaded: true
    };
    window.dataLayer = [];
  });

  it('should call getData prop on mount', () => {
    render(<SplitIt {...props} />);
    expect(props.getData).toHaveBeenCalledTimes(1);
  });

  it("should render text and button if total > over", () => {
    const {queryByText, queryByTitle} = render(<SplitIt {...props} />);

    expect(queryByText('Or $ 50.00 x 3')).toBeInTheDocument();
    expect(queryByTitle('learn more')).toBeInTheDocument();
  });

  it("should NOT render text and button if total < over", () => {
    const {queryByText, queryByTitle} = render(<SplitIt {...props} total={100} over={120} />);

    expect(queryByText('Or $ 50.00 x 3')).not.toBeInTheDocument();
    expect(queryByTitle('learn more')).not.toBeInTheDocument();
  });

  it("should NOT render text and button if data is loading", () => {
    const {queryByText, queryByTitle} = render(<SplitIt {...props} isLoaded={false} />);

    expect(queryByText('Or $ 50.00 x 3')).not.toBeInTheDocument();
    expect(queryByTitle('learn more')).not.toBeInTheDocument();
  });

  test('learn more popup', () => {
    const {getByTitle, queryByText, getByRole, debug} = render(<SplitIt {...props} />);
    const dataLayerSpy = jest.spyOn(window.dataLayer, 'push');

    const button = getByTitle('learn more');
    fireEvent.click(button);

    expect(dataLayerSpy).toHaveBeenCalledWith({
      event: "PDPInteraction",
      eventAction: "Product Details",
      eventCategory: "PDP - D",
      eventLabel: "Learn More - Split It"
    });
    expect(queryByText('Your monthly payment $50 ($50 × 3 = $150)')).toBeInTheDocument();

    const closeButton = getByRole('button', {name: 'Close'});
    fireEvent.click(closeButton);

    expect(queryByText('Your monthly payment $50 ($50 × 3 = $150)')).not.toBeInTheDocument();
  });
});
