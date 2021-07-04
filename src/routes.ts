import { UserController } from "./controller/UserController";
import { TokenController } from "./controller/TokenController";
import { VoucherController } from "./controller/VoucherController";
import jwtAuthenticate from "./middleware/jwtAuthenticate";
import voucherStoreValidator from "./validator/voucherStoreValidator";
import orderStoreValidator from "./validator/orderStoreValidator";
import { OrderController } from "./controller/OrderController";
import { PaymentController } from "./controller/PaymentController";
import { PromoCodeVerifyController } from "./controller/PromoCodeVerifyController";

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

// ### Token ###
{ method: "post", route: "/tokens", controller: TokenController, action: "save" },
{ method: "put", route: "/tokens", controller: TokenController, action: "update" },

// ### Voucher ###
{ method: "get", route: "/vouchers", controller: VoucherController, action: "all", middleware: jwtAuthenticate },
{ method: "post", route: "/vouchers", controller: VoucherController, action: "save", middleware: [jwtAuthenticate, voucherStoreValidator] },
{ method: "get", route: "/vouchers/:id", controller: VoucherController, action: "one", middleware: jwtAuthenticate },

// ### Order ###
{ method: "get", route: "/orders", controller: OrderController, action: "all", middleware: jwtAuthenticate },
{ method: "post", route: "/orders", controller: OrderController, action: "save", middleware: [jwtAuthenticate, orderStoreValidator] },

// ### Payments ###
{ method: "get", route: "/payments", controller: PaymentController, action: "all", middleware: jwtAuthenticate },

// PromoCode
{ method: "post", route: "/promocode/verify", controller: PromoCodeVerifyController, action: "__invoke", middleware: jwtAuthenticate },

];
