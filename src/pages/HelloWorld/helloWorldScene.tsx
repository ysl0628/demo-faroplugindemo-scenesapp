import {
  EmbeddedScene,
  SceneFlexLayout,
  SceneFlexItem,
  PanelBuilders,
  SceneApp,
  SceneAppPage,
  SceneToolbarButton,
  SceneToolbarInput,
  SceneCSSGridLayout,
  SceneCSSGridItem,
  SceneGridLayout,
  SceneGridRow,
  SceneGridItem,
} from '@grafana/scenes';
import { ROUTES } from '../../constants';
// import { getBasicScene } from 'pages/Home/scenes';
import { prefixRoute } from 'utils/utils.routing';
import { Button, LinkButton, Select } from '@grafana/ui';
import React from 'react';

const getHelloWorldScene = () => {
  return new EmbeddedScene({
    body: new SceneFlexLayout({
      children: [
        new SceneFlexItem({
          width: '100%',
          height: 300,
          body: PanelBuilders.text()
            .setTitle('Hello world panel')
            .setOption('content', 'Hello world!')
            .setHeaderActions(
              <LinkButton variant="secondary" size="sm" title="Explore" icon="compass" href="/explore">
                Explore
              </LinkButton>
            )
            .build(),
        }),
      ],
    }),
  });
};

const getHeaderActionsScene = () => {
  return new EmbeddedScene({
    body: new SceneCSSGridLayout({
      templateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      autoRows: '320px',
      children: [
        new SceneCSSGridItem({
          body: PanelBuilders.timeseries()
            .setTitle('Panel with sm button')
            // .setData(getQueryRunnerWithRandomWalkQuery())
            .setHeaderActions(
              <Button size="sm" variant="secondary">
                Does nothing
              </Button>
            )
            .build(),
        }),
        new SceneCSSGridItem({
          body: PanelBuilders.timeseries()
            .setTitle('Panel with md button')
            // .setData(getQueryRunnerWithRandomWalkQuery())
            .setHeaderActions(
              <Button size="md" variant="secondary">
                Does nothing
              </Button>
            )
            .build(),
        }),
        new SceneCSSGridItem({
          body: PanelBuilders.timeseries()
            .setTitle('Panel with select')
            // .setData(getQueryRunnerWithRandomWalkQuery())
            .setHeaderActions(<Select options={[{ label: 'Option 1', value: '1' }]} onChange={() => {}} value="1" />)
            .build(),
        }),
      ],
    }),
  });
};

export function getGridWithRowLayout() {
  return new EmbeddedScene({
    // $data: getQueryRunnerWithRandomWalkQuery(),
    body: new SceneGridLayout({
      isDraggable: true,
      isResizable: true,
      children: [
        new SceneGridRow({
          title: 'Row A',
          key: 'Row A',
          isCollapsed: true,
          isDraggable: true,
          isResizable: true,
          y: 0,
          x: 0,
          children: [
            new SceneGridItem({
              x: 0,
              y: 1,
              width: 12,
              height: 5,
              isResizable: true,
              isDraggable: true,
              body: PanelBuilders.timeseries().setTitle('Row A Child1').build(),
            }),
            new SceneGridItem({
              x: 0,
              y: 5,
              width: 6,
              height: 5,
              isResizable: true,
              isDraggable: true,
              body: PanelBuilders.timeseries().setTitle('Row A Child2').build(),
            }),
          ],
        }),
        new SceneGridRow({
          title: 'Row B',
          key: 'Row B',
          isCollapsed: true,
          y: 1,
          children: [
            new SceneGridItem({
              x: 0,
              y: 2,
              width: 12,
              height: 5,
              isResizable: false,
              isDraggable: true,
              body: PanelBuilders.timeseries().setTitle('Row B Child1').build(),
            }),
            new SceneGridItem({
              x: 0,
              y: 7,
              width: 6,
              height: 5,
              isResizable: false,
              isDraggable: true,
              body: PanelBuilders.timeseries().setTitle('Row B Child2').build(),
            }),
          ],
        }),
        new SceneGridItem({
          x: 2,
          y: 12,
          width: 12,
          height: 10,
          isResizable: true,
          isDraggable: true,
          body: PanelBuilders.timeseries().setTitle('Outsider').build(),
        }),
      ],
    }),
  });
}

export function getScene() {
  return new SceneApp({
    name: 'Hello World',
    pages: [
      new SceneAppPage({
        title: 'Hello World',
        subTitle: 'Hello World this is  my first Scenes.',
        url: prefixRoute(ROUTES.HelloWorld),
        hideFromBreadcrumbs: true,
        getScene: getHelloWorldScene,
        controls: [
          new SceneToolbarButton({
            icon: 'arrow',
            onClick: () => {
              console.log('Hello World');
            },
          }),
          new SceneToolbarInput({ onChange: (value) => console.log(value) }),
        ],
        tabs: [
          new SceneAppPage({
            title: 'Hello World Scene',
            url: prefixRoute(`${ROUTES.HelloWorld}`),
            getScene: getHelloWorldScene,
          }),
          new SceneAppPage({
            title: 'Header Action Scene',
            url: prefixRoute(`${ROUTES.HelloWorld}/tab-two`),
            getScene: getHeaderActionsScene,
          }),
          new SceneAppPage({
            title: 'Grid Layout Scene',
            url: prefixRoute(`${ROUTES.HelloWorld}/tab-three`),
            getScene: getGridWithRowLayout,
          }),
        ],
      }),
    ],
  });
}
