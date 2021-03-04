const { Relationship, Checkbox } = require("@keystonejs/fields");

module.exports = {
  fields: {
    visible: {
      type: Checkbox,
    },
    translation: {
      type: Relationship,
      ref: "CategoryTranslation.category",
      many: true,
    },
    subcategory: {
      type: Relationship,
      ref: "SubCategory.category",
      many: true,
    },
  },
};
