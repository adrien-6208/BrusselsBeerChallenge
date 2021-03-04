const { Text, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    language: {
      type: Text,
    },
    name: {
      type: Text,
    },
    subcategory: {
      type: Relationship,
      ref: "SubCategory.translation",
    },
  },
};
