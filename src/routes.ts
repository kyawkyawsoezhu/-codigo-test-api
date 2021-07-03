import { UserController } from "./controller/UserController";
import { TokenController } from "./controller/TokenController";

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
{ method: "put", route: "/tokens", controller: TokenController, action: "update" }


];
