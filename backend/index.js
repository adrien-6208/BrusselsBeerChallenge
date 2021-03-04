const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");

const UserSchema = require("./models/User.js");
const BrewerySchema = require("./models/Brewery.js");
const BeerSchema = require("./models/Beer.js");
const MedalSchema = require("./models/Medal.js");
const BreweryTranslationSchema = require("./models/BreweryTranslation.js");
const BeerTranslationSchema = require("./models/BeerTranslation.js");
const MedalTranslationSchema = require("./models/MedalTranslation.js");
const CategorySchema = require("./models/Category.js");
const CategoryTranslationSchema = require("./models/CategoryTranslation.js");
const SubCategorySchema = require("./models/SubCategory.js");
const SubCategoryTranslationSchema = require("./models/SubCategoryTranslation.js");


const initialiseData = require("./data/data.js");

const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const PROJECT_NAME = "Brussels Beer Challenge";
const adapterConfig = { mongoUri: "mongodb://localhost/brusselsbeerchallenge" };

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== "true" && initialiseData,
});

keystone.createList("User", UserSchema);
keystone.createList("Category", CategorySchema);
keystone.createList("CategoryTranslation", CategoryTranslationSchema);
keystone.createList("SubCategory", SubCategorySchema);
keystone.createList("SubCategoryTranslation", SubCategoryTranslationSchema);
keystone.createList("Brewery", BrewerySchema);
keystone.createList("BreweryTranslation", BreweryTranslationSchema);
keystone.createList("Medal", MedalSchema);
keystone.createList("MedalTranslation", MedalTranslationSchema);
keystone.createList("Beer", BeerSchema);
keystone.createList("BeerTranslation", BeerTranslationSchema);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  config: { protectIdentities: process.env.NODE_ENV === "production" },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
