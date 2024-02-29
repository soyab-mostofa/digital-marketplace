import { User } from "../../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null;
  return { ...data, user: user?.id };
};

const yourOwnedAndPurchased: Access = async ({ req }) => {
  const user = req.user as User | null;
  if (user?.role === "admin") return true;
  if (!user) return false;

  const { docs: products } = await req.payload.find({
    depth: 0,
    collection: "products",
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const ownProductFileIds = products
    .map((product) => product.product_files)
    .flat();

  const { docs: orders } = await req.payload.find({
    depth: 2,
    collection: "orders",
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const purchasedProductIds = orders
    .map((order) => {
      return order.products.map((product) => {
        if (typeof product === "string")
          return req.payload.logger.error(
            "Search depth insufficient to find purchased IDs"
          );

        return typeof product.product_files === "string"
          ? product.product_files
          : product.product_files.id;
      });
    })
    .filter(Boolean)
    .flat();

  return {
    id: {
      in: [...ownProductFileIds, ...purchasedProductIds],
    },
  };
};

export const ProductFiles: CollectionConfig = {
  slug: "product_files",
  admin: {
    hidden: ({ user }) => user?.role !== "admin",
  },
  hooks: { beforeChange: [addUser] },
  access: {
    read: yourOwnedAndPurchased,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  upload: {
    staticURL: "/product_files",
    staticDir: "product_files",
    mimeTypes: ["application/postscript", "image/*", "font/*"],
  },

  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        condition: () => false,
      },
      required: true,
      hasMany: false,
    },
  ],
};
