const { Text, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    phone: {
      type: Text,
    },
    email: {
      type: Text,
    },
    website: {
      type: Text,
    },
    address: {
      type: Text,
    },
    beer: {
      type: Relationship,
      ref: "Beer.brewery",
      many: true,
    },
    translation: {
      type: Relationship,
      ref: "BreweryTranslation.brewery",
      many: true,
    },
  },
};
