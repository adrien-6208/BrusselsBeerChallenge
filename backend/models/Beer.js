const { Text, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    translation: {
      type: Relationship,
      ref: "BeerTranslation.beer",
      many: true,
    },
    brewery: {
      type: Relationship,
      ref: "Brewery.beer",
      isRequired: true,
    },
    medal: {
      type: Relationship,
      ref: "Medal.beer",
    },
    subcategory: {
      type: Relationship,
      ref: "SubCategory.beer",
    },
    alcohol: {
      type: Text,
    },
    bitterness: {
      type: Text,
    },
    bottle_content: {
      type: Text,
    },
    final_gravity: {
      type: Text,
    },
    original_gravity: {
      type: Text,
    },
  },
};
