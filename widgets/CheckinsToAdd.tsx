// ./widgets/MyWidget.tsx
import { DashboardWidgetContainer } from "@sanity/dashboard";
import type {DashboardWidget, LayoutConfig} from '@sanity/dashboard'
import {Card, Flex, Button, Stack} from '@sanity/ui'
import { useEffect, useState } from "react";
import pkg from 'rss-to-json';
const {parse} = pkg;

async function getLatestRss() {

  const response = await parse('https://untappd.com/rss/user/glrob54?key=22bf8950a97512ac2b5da8bb7617ab76', {
    mode: 'no-cors'
  });

  console.log({response})
  return response
}

export const MyWidget = () => {

  const [rssItems, setRssItems] = useState([])
  useEffect(() => {
    getLatestRss().then((rssItems) => {
      setRssItems(rssItems)
    })
  }
  , [])

  console.log(rssItems)
  return (
  <DashboardWidgetContainer
    header="A cat"
    footer={
      <Flex direction="column" align="stretch">
        <Button
          flex={1}
          paddingX={2}
          paddingY={4}
          mode="bleed"
          tone="primary"
          text="Get new cat"
        />
      </Flex>
    }
  >
    <figure>
      <img src="https://placekitten.com/300/450" />
    </figure>
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