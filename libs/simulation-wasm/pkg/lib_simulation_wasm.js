import * as wasm from "./lib_simulation_wasm_bg.wasm";
import { __wbg_set_wasm } from "./lib_simulation_wasm_bg.js";
__wbg_set_wasm(wasm);
export * from "./lib_simulation_wasm_bg.js";
