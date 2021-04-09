import { setupWorker, rest } from "msw";

export const worker = setupWorker(
  rest.get("https://glassesusa.com/api/splitIt", (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.status(200),
      ctx.json({
        installments: "3",
        minTotal: "90"
      })
    );
  })
);
