export const schemaTypes = [
    {
        type: 'document',
        name: 'beer',
        title: 'Beer',
        fields: [
            {
                name: 'name',
                title: 'Name',
                type: 'string'
            },
            {
                name: 'brewery',
                title: 'Brewery',
                type: 'reference',
                to: [{ type: 'brewery' }]
            },
            {
                name: 'abv',
                title: 'ABV',
                type: 'number'
            },
            {
                name: 'ibu',
                title: 'IBU',
                type: 'number'
            },
            {
                name: 'style',
                title: 'Style',
                type: 'string'
            },
            {
                name: 'untappdLink',
                title: 'Untappd Url',
                type: 'url'
            },
            {
                name: 'image',
                title: 'Image',
                type: 'string'
            },
            {
                name: 'myScore',
                title: 'Rating',
                type: 'number'
            },
            {
                name: 'firstTaste',
                title: 'First Tasted',
                type: 'date'
            },
            {
                name: 'notTasted',
                type: 'boolean',
                title: 'Owned but Not Tasted'
            }
        ]
    },
    {
        // type brewery
        type: 'document',
        name: 'brewery',
        title: 'Brewery',
        fields: [
            {
                name: 'name',
                title: 'Name',
                type: 'string'
            },
            {
                name: 'location',
                title: 'Location',
                type: 'string'
            },
            { 
                name: 'untappdLink',
                title: 'Untappd Url',
                type: 'url'
            },
            {
                name: 'city',
                title: 'City',
                type: 'string'
            },
            {
                name: 'state',
                title: 'State',
                type: 'string'
            },
            {
                name: 'country',
                title: 'Country',
                type: 'string'
            },


        ]
    }
]
