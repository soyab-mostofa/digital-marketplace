"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
var yourOwn = function (_a) {
    var user = _a.req.user;
    if (user.role === "admin")
        return true;
    return {
        user: {
            equals: user.id,
        },
    };
};
exports.Orders = {
    slug: "orders",
    admin: {
        useAsTitle: "Your orders page",
        description: "A summery of all of your orders on digitalhippo",
    },
    access: {
        read: yourOwn,
        update: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        create: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
    },
    fields: [
        {
            name: "_isPaid",
            type: "checkbox",
            access: {
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                create: function () { return false; },
                update: function () { return false; },
            },
            admin: {
                hidden: true,
            },
            required: true,
        },
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            admin: {
                hidden: true,
            },
            required: true,
        },
        {
            name: "products",
            relationTo: "products",
            type: "relationship",
            hasMany: true,
            required: true,
        },
    ],
};
