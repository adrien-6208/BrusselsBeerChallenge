const { Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    category: {
      type: Relationship,
      ref: "Category.subcategory",
    },
    translation: {
      type: Relationship,
      ref: "SubCategoryTranslation.subcategory",
      many: true,
    },
    beer: {
      type: Relationship,
      ref: "Beer.subcategory",
      many: true,
    },
  },
};
