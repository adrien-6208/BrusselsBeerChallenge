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
                    name : 'Brasserie Caulier SPRL',
                    phone : '+32 472 89 71 42',
                    email : 'info@brasseriecaulier.com',
                    website : 'https://brasseriecaulier.beer/',
                    address : 'Rue de Sondeville, 7600 Péruwelz',
                    country : 'Belgique'
                },
            },
            {
                data : {
                    name : 'Brasserie Grain d’Orge',
                    phone : '+32 87 78 77 84',
                    email : 'info@brasseriegraindorge.com',
                    website : 'http://www.brasserie-graindorge.be',
                    address : 'Rue Laschet 3, 4852 Hombourg-Plombières',
                    country : 'Belgique'
                },
            },
            {
                data : {
                    name : 'Brasserie de Brunehaut',
                    phone : '+32 69 34 64 11',
                    email : 'info@brunehaut.com',
                    website : 'https://www.brunehaut.com',
                    address : 'Rue des Panneries 17, 7623 Rongy-Brunehaut',
                    country : 'Belgique'
                },
            },
        ],

        returnFields: 'id, name',
    });

    const medals = await createItems({
        keystone,
        listKey: 'Medal',
        items: [
            {
                data : {
                    name : 'Médaille d\'or',
                },
            },
            {
                data : {
                    name : 'Médaille d\'argent',
                },
            },
            {
                data : {
                    name : 'Médaille de bronze',
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
                    medal: {
                        connect: { id: medals.find(medal => medal.name === 'Médaille d\'or').id },
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
                    medal: {
                        connect: { id: medals.find(medal => medal.name === 'Médaille d\'argent').id },
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
                    medal: {
                        connect: { id: medals.find(medal => medal.name === 'Médaille de bronze').id },
                    },
                },
            },
            {
                data : {
                    name : 'MOINETTE BLONDE',
                    alcohol : '8,5',
                    bitterness : '32',
                    bottle_content : '75cl',
                    final_gravity : '0,80',
                    original_gravity : '16,50',
                    brewery: {
                        connect: { id: breweries.find(brewery => brewery.name === 'Brasserie Dupont').id },
                    },
                    medal: {
                        connect: { id: medals.find(medal => medal.name === 'Médaille d\'or').id },
                    },
                },
            },
            {
                data : {
                    name : 'PAIX DIEU',
                    alcohol : '10,00',
                    bitterness : '20',
                    bottle_content : '33cl',
                    final_gravity : '2.00',
                    original_gravity : '20,00',
                    brewery: {
                        connect: { id: breweries.find(brewery => brewery.name === 'Brasserie Caulier SPRL').id },
                    },
                    medal: {
                        connect: { id: medals.find(medal => medal.name === 'Médaille d\'argent').id },
                    },
                },
            },
            {
                data : {
                    name : 'PAIX DIEU',
                    alcohol : '10,00',
                    bitterness : '20',
                    bottle_content : '33cl',
                    final_gravity : '2.00',
                    original_gravity : '20,00',
                    brewery: {
                        connect: { id: breweries.find(brewery => brewery.name === 'Brasserie Caulier SPRL').id },
                    },
                    medal: {
                        connect: { id: medals.find(medal => medal.name === 'Médaille de bronze').id },
                    },
                },
            },
            {
                data : {
                    name : 'BON SECOURS BLONDE',
                    alcohol : '8,00',
                    bitterness : '20',
                    bottle_content : '33cl',
                    final_gravity : '0',
                    original_gravity : '14,00',
                    brewery: {
                        connect: { id: breweries.find(brewery => brewery.name === 'Brasserie Caulier SPRL').id },
                    },
                    medal: {
                        connect: { id: medals.find(medal => medal.name === 'Médaille d\'or').id },
                    },
                },
            },
            {
                data : {
                    name : 'AUBEL PURE',
                    alcohol : '5,00',
                    bitterness : '40',
                    bottle_content : '33cl',
                    final_gravity : '2.60',
                    original_gravity : '11,50',
                    brewery: {
                        connect: { id: breweries.find(brewery => brewery.name === 'Brasserie Grain d’Orge').id },
                    },
                    medal: {
                        connect: { id: medals.find(medal => medal.name === 'Médaille d\'argent').id },
                    },
                },
            },
            {
                data : {
                    name : 'JOUP',
                    alcohol : '6,8',
                    bitterness : '20',
                    bottle_content : '33cl',
                    final_gravity : '3,70',
                    original_gravity : '15,40',
                    brewery: {
                        connect: { id: breweries.find(brewery => brewery.name === 'Brasserie Grain d’Orge').id },
                    },
                    medal: {
                        connect: { id: medals.find(medal => medal.name === 'Médaille de bronze').id },
                    },
                },
            },
            {
                data : {
                    name : 'BRUNEHAUT TRIPLE',
                    alcohol : '8,0',
                    bitterness : '30',
                    bottle_content : '33cl',
                    final_gravity : '2,80',
                    original_gravity : '16,90',
                    brewery: {
                        connect: { id: breweries.find(brewery => brewery.name === 'Brasserie de Brunehaut').id },
                    },
                    medal: {
                        connect: { id: medals.find(medal => medal.name === 'Médaille d\'or').id },
                    },
                },
            },
        ],
    });
};
