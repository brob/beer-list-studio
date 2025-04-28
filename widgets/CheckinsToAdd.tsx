// ./widgets/MyWidget.tsx
import { DashboardWidgetContainer } from "@sanity/dashboard";
import type {DashboardWidget, LayoutConfig} from '@sanity/dashboard'
import {Card, Flex, Button, Stack} from '@sanity/ui'
import { useEffect, useState } from "react";
import {useClient} from 'sanity'


function CheckinItem({item}) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  console.log({success})
  
  return (success == null && (<Card padding={2} tone="transparent">
    <h3>{item.beerName}</h3>
    <p>{item.untappedLink}</p>
    {!loading && success && (<p>Added successfully</p>)}
    {success === false && (
      <p>Failed to add checkin</p>
    )}
    {!success && (
      <Button
      text="Add checkin and beer"
      tone="primary"
      loading={loading}
      onClick={async () => {
        setLoading(true)
        const response = await fetch(`https://beer-list-site.netlify.app/api/singleCheckin?checkinUrl=${item.link}`, {
          mode: 'cors',
        })
        console.log({response})
        const {status} = response
        if (status === 200) {
          setSuccess(true)
        }
        if (status === 500) {
          setSuccess(false)
        }
        setLoading(false)
      }}
      />
    )}
    
  </Card>))
}


async function getLatestRss(client) {

  const response = await fetch('https://beer-list-site.netlify.app/api/currentRssToJson', {
    mode: 'cors',
  }).then((res) => res.json())
  const {items} = response
  const addData = await Promise.all(items.map(async (item) => {
    const existingItem = await client.fetch(
      `*[_type == "checkin" && _id == $id][0]`,
      { link: item.link,
        id: item.link.split('/').pop()
       }
    );

    return {
      ...item,
      exists: existingItem ? true : false
    }
  }));
  
  // Wait for all promises to resolve


  // Filter out items that already exist in the database
  const filteredItems = await addData.filter(item => !item.exists)

  const mapped = (await Promise.all(filteredItems)).map(item => {
    const beerName = item.title != '' ? item.title.split(/ is drinking a | is drinking an /)[1].split(' by ')[0] : ''
    return {
      title: item.title,
      beerName,
      untappedLink: item.link,
      ...item
    }

  })
  return mapped
}

export const MyWidget = () => {
  const client = useClient()
  const [rssItems, setRssItems] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getLatestRss(client).then((rssItems) => {
      setRssItems(rssItems)
      setLoading(false)
    })
  }
  , [])
  console.log({rssItems})
  return (
  <DashboardWidgetContainer
    header="Checkins not added"
  >
    <Card padding={4} tone="transparent">
      <Stack space={3}>
        {loading && <p>Checking beers...</p>}
        {rssItems.length === 0 && !loading && <p>No new checkins</p>}
        {rssItems.map((item, index) => (
          <CheckinItem key={index} item={item} />
        ))}
      </Stack>
    </Card>
  </DashboardWidgetContainer>
)}


export function myWidget(layout: LayoutConfig): DashboardWidget {
    return {
      name: 'my-widget',
      component: function component() {
        return <MyWidget />
      },
      layout: layout,
    }
  }