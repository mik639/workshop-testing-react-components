import { configureStore } from "@reduxjs/toolkit";
import { splitIt } from "./splitIt";

export default configureStore({
  reducer: { splitIt: splitIt.reducer }
});
