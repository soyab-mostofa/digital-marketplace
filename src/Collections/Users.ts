import { CollectionConfig } from "payload/types";
import dotenv from "dotenv";

dotenv.config();
export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `
          <div>
            <h1>Verify your email</h1>
            <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">Verify</a>
          </div>
        `;
      },
    },
  },
  access: {
    create: () => true,
    read: () => true,
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
