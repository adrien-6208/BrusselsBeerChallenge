const { createItems } = require("@keystonejs/server-side-graphql-client");

module.exports = async (keystone) => {
  await keystone.adapter.dropDatabase();
  const {
    data: {
      _allUsersMeta: { count = 0 },
    },
  } = await keystone.executeGraphQL({
    context: keystone.createContext().sudo(),
    query: `query {
            _allUsersMeta {
            count
            }
        }`,
  });

  if (count === 0) {
    const password = "admin123";
    const email = "admin@example.com";

    const { errors } = await keystone.executeGraphQL({
      context: keystone.createContext().sudo(),
      query: `mutation initialUser($password: String, $email: String) {
                  createUser(data: {name: "Administrateur", email: $email, isAdmin: true, password: $password}) {
                    id
                  }
                }`,
      variables: { password, email },
    });

    if (errors) {
      console.log("failed to create initial user:");
      console.log(errors);
    } else {
      console.log(`
            User created:
            email: ${email}
            password: ${password}
            Please change these details after initial login.
            `);
    }
  }

  const breweries = await createItems({
    keystone,
    listKey: "Brewery",
    items: [
      {
        data: {
          phone: "+32 471 56 76 01",
          email: "info@brasserie-28.com",
          website: "http://www.brewery28.com",
          address: "Rue Jean Burger, 7850 Enghien"
        },
      },
      {
        data: {
          phone: "+32 69 67 10 66",
          email: "info@brasserie-dupont.com",
          website: "https://www.brasserie-dupont.com",
          address: "Rue Basse 5, 7904 Tourpes-Leuze",
        },
      },
      {
        data: {
          phone: "+32 472 89 71 42",
          email: "info@brasseriecaulier.com",
          website: "https://brasseriecaulier.beer/",
          address: "Rue de Sondeville, 7600 Péruwelz",
        },
      },
      {
        data: {
          phone: "+32 87 78 77 84",
          email: "info@brasseriegraindorge.com",
          website: "http://www.brasserie-graindorge.be",
          address: "Rue Laschet 3, 4852 Hombourg-Plombières",
        },
      },
      {
        data: {
          phone: "+32 69 34 64 11",
          email: "info@brunehaut.com",
          website: "https://www.brunehaut.com",
          address: "Rue des Panneries 17, 7623 Rongy-Brunehaut",
        },
      },
    ],

    returnFields: "id, phone",
  });

  await createItems({
    keystone,
    listKey: "BreweryTranslation",
    items: [
      {
        data: {
          language: "fr",
          name: "Brasserie 28",
          countryName: "Belgique",
          brewery: {
            connect: {
              id: breweries.find((brewery) => brewery.phone === "+32 471 56 76 01").id,
            },
          },
        },
      },
      {
        data: {
          language: "fr",
          name: "Brasserie Dupont",
          countryName: "Belgique",
          brewery: {
            connect: {
              id: breweries.find((brewery) => brewery.phone === "+32 69 67 10 66").id,
            },
          },
        }
      },
      {
        data: {
          language: "fr",
          name: "Brasserie Caulier SPRL",
          countryName: "Belgique",
          brewery: {
            connect: {
              id: breweries.find((brewery) => brewery.phone === "+32 472 89 71 42").id,
            },
          },
        }
      },
      {
        data: {
          language: "fr",
          name: "Brasserie Grain d’Orge",
          countryName: "Belgique",
          brewery: {
            connect: {
              id: breweries.find((brewery) => brewery.phone === "+32 87 78 77 84").id,
            },
          },
        }
      },
      {
        data: {
          language: "fr",
          name: "Brasserie de Brunehaut",
          countryName: "Belgique",
          brewery: {
            connect: {
              id: breweries.find((brewery) => brewery.phone === "+32 69 34 64 11").id,
            },
          },
        }
      }
    ],
  });

  const beer1 = await createItems({
    keystone,
    listKey: "Beer",
    items: [
      {
        data: {
          alcohol: "6,0",
          bitterness: "26",
          bottle_content: "33cl",
          final_gravity: "12,00",
          original_gravity: "12,00",
          brewery: {
            connect: {
              id: breweries.find((brewery) => brewery.phone === "+32 471 56 76 01").id,
            },
          },
        },
      },
    ],
    returnFields: "id",
  });

  await createItems({
    keystone,
    listKey: "BeerTranslation",
    items: [
      {
        data: {
          language: "fr",
          name: "28 SAISON",
          beer: {
            connect: {
              id: beer1[0].id,
            },
          }, 
        },
      },
    ],
    returnFields: "id",
  });

  const beer2 = await createItems({
    keystone,
    listKey: "Beer",
    items: [
      {
        data: {
          alcohol: "8,0",
          bitterness: "18",
          bottle_content: "75cl",
          final_gravity: "1,20",
          original_gravity: "16,00",
          brewery: {
            connect: {
              id: breweries.find(
                (brewery) => brewery.phone === "+32 69 67 10 66").id,
            },
          },
        },
      },
    ],
    returnFields: "id",
  });

  await createItems({
    keystone,
    listKey: "BeerTranslation",
    items: [
      {
        data: {
          language: "fr",
          name: "BIÈRE DE MIEL",
          beer: {
            connect: {
              id: beer2[0].id,
            },
          }, 
        },
      },
    ],
    returnFields: "id",
  });

  const beer3 = await createItems({
    keystone,
    listKey: "Beer",
    items: [
      {
        data: {
          alcohol: "7,80",
          bitterness: "23",
          bottle_content: "25cl",
          final_gravity: "0,90",
          original_gravity: "7,80",
          brewery: {
            connect: {
              id: breweries.find(
                (brewery) => brewery.phone === "+32 69 67 10 66").id,
            },
          },
        },
      },
    ],
    returnFields: "id",
  });

  await createItems({
    keystone,
    listKey: "BeerTranslation",
    items: [
      {
        data: {
          language: "fr",
          name: "BIOLÉGÈRE",
          beer: {
            connect: {
              id: beer3[0].id,
            },
          }, 
        },
      },
    ],
    returnFields: "id",
  });

  const beer4 = await createItems({
    keystone,
    listKey: "Beer",
    items: [
      {
        data: {
          alcohol: "8,5",
          bitterness: "32",
          bottle_content: "75cl",
          final_gravity: "0,80",
          original_gravity: "16,50",
          brewery: {
            connect: {
              id: breweries.find(
                (brewery) => brewery.phone === "+32 69 67 10 66").id,
            },
          },
        },
      },
    ],
    returnFields: "id",
  });

  await createItems({
    keystone,
    listKey: "BeerTranslation",
    items: [
      {
        data: {
          language: "fr",
          name: "MOINETTE BLONDE",
          beer: {
            connect: {
              id: beer4[0].id,
            },
          }, 
        },
      },
    ],
    returnFields: "id",
  });

  const beer5 = await createItems({
    keystone,
    listKey: "Beer",
    items: [
      {
        data: {
          alcohol: "10,00",
          bitterness: "20",
          bottle_content: "33cl",
          final_gravity: "2.00",
          original_gravity: "20,00",
          brewery: {
            connect: {
              id: breweries.find(
                (brewery) => brewery.phone === "+32 472 89 71 42").id,
            },
          },
        },
      },
    ],
    returnFields: "id",
  });

  await createItems({
    keystone,
    listKey: "BeerTranslation",
    items: [
      {
        data: {
          language: "fr",
          name: "PAIX DIEU",
          beer: {
            connect: {
              id: beer5[0].id,
            },
          }, 
        },
      },
    ],
    returnFields: "id",
  });

  const beer6 = await createItems({
    keystone,
    listKey: "Beer",
    items: [
      {
        data: {
          alcohol: "8,00",
          bitterness: "20",
          bottle_content: "33cl",
          final_gravity: "0",
          original_gravity: "14,00",
          brewery: {
            connect: {
              id: breweries.find(
                (brewery) => brewery.phone === "+32 472 89 71 42").id,
            },
          },
        },
      },
    ],
    returnFields: "id",
  });

  await createItems({
    keystone,
    listKey: "BeerTranslation",
    items: [
      {
        data: {
          language: "fr",
          name: "BON SECOURS BLONDE",
          beer: {
            connect: {
              id: beer6[0].id,
            },
          }, 
        },
      },
    ],
    returnFields: "id",
  });

  const beer7 = await createItems({
    keystone,
    listKey: "Beer",
    items: [
      {
        data: {
          alcohol: "5,00",
          bitterness: "40",
          bottle_content: "33cl",
          final_gravity: "2.60",
          original_gravity: "11,50",
          brewery: {
            connect: {
              id: breweries.find(
                (brewery) => brewery.phone === "+32 87 78 77 84").id,
            },
          },
        },
      },
    ],
    returnFields: "id",
  });

  await createItems({
    keystone,
    listKey: "BeerTranslation",
    items: [
      {
        data: {
          language: "fr",
          name: "AUBEL PURE",
          beer: {
            connect: {
              id: beer7[0].id,
            },
          }, 
        },
      },
    ],
    returnFields: "id",
  });

  const beer8 = await createItems({
    keystone,
    listKey: "Beer",
    items: [
      {
        data: {
          alcohol: "6,8",
          bitterness: "20",
          bottle_content: "33cl",
          final_gravity: "3,70",
          original_gravity: "15,40",
          brewery: {
            connect: {
              id: breweries.find(
                (brewery) => brewery.phone === "+32 87 78 77 84").id,
            },
          },
        },
      },
    ],
    returnFields: "id",
  });

  await createItems({
    keystone,
    listKey: "BeerTranslation",
    items: [
      {
        data: {
          language: "fr",
          name: "JOUP",
          beer: {
            connect: {
              id: beer8[0].id,
            },
          }, 
        },
      },
    ],
    returnFields: "id",
  });

  const beer9 = await createItems({
    keystone,
    listKey: "Beer",
    items: [
      {
        data: {
          alcohol: "6,8",
          bitterness: "20",
          bottle_content: "33cl",
          final_gravity: "3,70",
          original_gravity: "15,40",
          brewery: {
            connect: {
              id: breweries.find(
                (brewery) => brewery.phone === "+32 69 34 64 11").id,
            },
          },
        },
      },
    ],
    returnFields: "id",
  });

  await createItems({
    keystone,
    listKey: "BeerTranslation",
    items: [
      {
        data: {
          language: "fr",
          name: "BRUNEHAUT TRIPLE",
          beer: {
            connect: {
              id: beer9[0].id,
            },
          }, 
        },
      },
    ],
    returnFields: "id",
  });
};