"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "\n          <div>\n            <h1>Verify your email</h1>\n            <a href=\"".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token, "\">Verify</a>\n          </div>\n        ");
            },
        },
    },
    access: {
        create: function () { return true; },
        read: function () { return true; },
    },
    fields: [
        {
            name: "role",
            type: "select",
            required: true,
            defaultValue: "user",
            options: [
                {
                    label: "Admin",
                    value: "admin",
                },
                {
                    label: "User",
                    value: "user",
                },
            ],
        },
    ],
};
