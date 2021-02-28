const { createItems } = require('@keystonejs/server-side-graphql-client');

module.exports = async keystone => {
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
        const password = 'admin123';
        const email = 'admin@example.com';

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
            console.log('failed to create initial user:');
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
        listKey: 'Brewery',
        items: [
            {
                data : {
                    name : 'Brasserie 28',
                    phone : '+32 471 56 76 01',
                    email : '',
                    website : 'http://www.brewery28.com',
                    address : 'Rue Jean Burger, 7850 Enghien',
                    country : 'Belgique'
                },
            },
            {
                data : {
                    name : 'Brasserie Dupont',
                    phone : '+32 69 67 10 66',
                    email : 'contact@brasserie-dupont.com',
                    website : 'https://www.brasserie-dupont.com',
                    address : 'Rue Basse 5, 7904 Tourpes-Leuze',
                    country : 'Belgique'
                },
            },
            {
                data : {
                    name : 'Heineken',
                    phone : '+31 2244 51 43',
                    email : '',
                    website : 'http://www.amstel.nl',
                    address : 'Burg. Smeetsweg 1, 2382 PH Zoeterwoude',
                    country : 'Pays-Bas'
                },
            },
            {
                data : {
                    name : 'Cervejaria Colorado',
                    phone : '+55 1 99 92 59 91 17',
                    email : '',
                    website : 'http://www.cervejariacolorado.com.br',
                    address : 'Anhanguera s/n Km 308 + 300m, 14093500 Ribeirão Preto',
                    country : 'Brésil'
                },
            },
        ],

        returnFields: 'id, name',
    });

    await createItems({
        keystone,
        listKey: 'Beer',
        items: [
            {
                data : {
                    name : '28 SAISON',
                    alcohol : '6,0',
                    bitterness : '26',
                    bottle_content : '33cl',
                    final_gravity : '12,00',
                    original_gravity : '12,00',
                    brewery: {
                        connect: { id: breweries.find(brewery => brewery.name === 'Brasserie 28').id },
                    },
                },
            },
            {
                data : {
                    name : 'BIÈRE DE MIEL',
                    alcohol : '8,0',
                    bitterness : '18',
                    bottle_content : '75cl',
                    final_gravity : '1,20',
                    original_gravity : '16,00',
                    brewery: {
                        connect: { id: breweries.find(brewery => brewery.name === 'Brasserie Dupont').id },
                    },
                },
            },
            {
                data : {
                    name : 'BIOLÉGÈRE',
                    alcohol : '7,80',
                    bitterness : '23',
                    bottle_content : '25cl',
                    final_gravity : '0,90',
                    original_gravity : '7,80',
                    brewery: {
                        connect: { id: breweries.find(brewery => brewery.name === 'Brasserie Dupont').id },
                    },
                },
            },
            {
                data : {
                    name : 'COLORADO RIBEIRÃO LAGER',
                    alcohol : '4,5',
                    bitterness : '20',
                    bottle_content : '60cl',
                    final_gravity : '2,40',
                    original_gravity : '10,70',
                    brewery: {
                        connect: { id: breweries.find(brewery => brewery.name === 'Cervejaria Colorado').id },
                    },
                },
            },
            {
                data : {
                    name : 'COLORADO DOUBLE BROWN COCONUT',
                    alcohol : '8,0',
                    bitterness : '30',
                    bottle_content : '60cl',
                    final_gravity : '3,50',
                    original_gravity : '18,20',
                    brewery: {
                        connect: { id: breweries.find(brewery => brewery.name === 'Cervejaria Colorado').id },
                    },
                },
            },
            {   
                data : {
                    name : 'COLORADO BLACK INDICA',
                    alcohol : '7,0',
                    bitterness : '45',
                    bottle_content : '60cl',
                    final_gravity : '3,50',
                    original_gravity : '16,30',
                    brewery: {
                        connect: { id: breweries.find(brewery => brewery.name === 'Cervejaria Colorado').id },
                    },
                },
            },
            {
                data : {
                    name : 'AMSTEL 0.0',
                    alcohol : '0,0',
                    bitterness : '21',
                    bottle_content : '30cl',
                    final_gravity : '6,20',
                    original_gravity : '6,20',
                    brewery: {
                        connect: { id: breweries.find(brewery => brewery.name === 'Heineken').id },
                    },
                },
            },
        ],
    });
};