const { Text, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    beer: {
      type: Relationship,
      ref: "Beer.medal",
      many: true,
    },
    translation: {
      type: Relationship,
      ref: "MedalTranslation.medal",
      many: true,
    },
  },
};
