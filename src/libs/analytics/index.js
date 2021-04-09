export function sendAnalytics(event) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

export const PDP = {
  SPLIT_IT_LEARN_MORE: {
    event: "PDPInteraction",
    eventAction: "Product Details",
    eventCategory: "PDP - D",
    eventLabel: "Learn More - Split It"
  }
};
