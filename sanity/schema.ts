import { type SchemaTypeDefinition } from "sanity";
import product from "./schemas/product";
import category from "./schemas/category";
import apparel from "./schemas/apparel";
import banner from "./schemas/banner";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [banner, product, category, apparel],
};
