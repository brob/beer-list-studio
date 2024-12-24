import { Image } from "sanity"

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
    },
    {
        name: 'checkin',
        title: 'Checkins',
        type: 'document',
        fields: [
            {
                name: 'beer',
                title: 'Beer',
                type: 'reference',
                to: [{ type: 'beer' }]
            },
            {
                name: 'venue',
                title: 'Venue',
                type: 'reference',
                to: [{ type: 'venue' }]
            },
            {
                name: 'date',
                title: 'Date',
                type: 'datetime'
            },
            { 
                name: 'untappdLink',
                title: 'Untappd Url',
                type: 'url'
            
            },
            { 
                name: 'locationUrl',
                title: 'Location Url',
                type: 'url'
            
            },
            {
                name: 'processed',
                title: 'Processed?',
                type: 'boolean'
            }
            
        ],
        preview: {
            select: {
              date: 'date',
              name: 'beer.name' // if the movie has a director, follow the reference and get the name
            },
            prepare(selection) {
              const {date, name} = selection
              return {
                title: date,
                subtitle: `Drank: ${name}`
              }
            }
        }
    },
    {
        name: 'venue',
        title: 'Venues',
        type: 'document',
        fields: [
            {
                name: 'address',
                title: 'Address',
                type: 'string',
            },
            {
                name: 'name',
                title: 'Name',
                type: 'string'
            },
            {
                name: 'slug',
                title: 'Slug',
                type: 'string',
                
            },
         
            {
                name: 'city',
                title: 'City',
                type: 'string',
            },
            {
                name: 'state',
                title: 'State',
                type: 'string',
            },
            {
                name: 'logoUrl',
                title: 'Logo Url',
                type: 'string'
            },
            {
                name: 'locationUrl',
                type:'string'
            }
        ],
        preview: {
            select: {
              name: 'name',
              image: 'logoUrl',
            },
            prepare({name}) {

                  return {
                    title: name,

                }
            }
        }
    }
]
