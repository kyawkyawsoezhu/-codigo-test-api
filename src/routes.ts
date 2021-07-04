import { UserController } from "./controller/UserController";
import { TokenController } from "./controller/TokenController";
import { VoucherController } from "./controller/VoucherController";
import jwtAuthenticate from "./middleware/jwtAuthenticate";
import voucherStoreValidator from "./validator/voucherStoreValidator";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},

{ method: "post", route: "/tokens", controller: TokenController, action: "save" },
{ method: "put", route: "/tokens", controller: TokenController, action: "update" },

{ method: "get", route: "/vouchers", controller: VoucherController, action: "all", middleware: jwtAuthenticate },
{ method: "post", route: "/vouchers", controller: VoucherController, action: "save", middleware: [jwtAuthenticate, voucherStoreValidator] },
{ method: "get", route: "/vouchers/:id", controller: VoucherController, action: "one", middleware: jwtAuthenticate }


];
