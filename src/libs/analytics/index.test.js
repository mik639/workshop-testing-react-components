import { sendAnalytics } from ".";

describe("sendAnalytics", () => {
  beforeEach(() => {
    delete window.dataLayer;
  });

  const event = { name: "some event" };

  it("should create dataLayer if it isn't exists", () => {
    expect(window.dataLayer).toBeUndefined();
    sendAnalytics(event);
    expect(window.dataLayer).toEqual([event]);
  });

  it("should keep dataLayer if it is exists", () => {
    window.dataLayer = [{ name: "event" }];
    sendAnalytics(event);
    expect(window.dataLayer).toEqual([{ name: "event" }, event]);
  });
});
