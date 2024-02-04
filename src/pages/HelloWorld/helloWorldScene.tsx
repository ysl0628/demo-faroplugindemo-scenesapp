import {
  EmbeddedScene,
  SceneFlexLayout,
  SceneFlexItem,
  PanelBuilders,
  SceneApp,
  SceneAppPage,
  SceneToolbarButton,
  SceneToolbarInput,
} from '@grafana/scenes';
import { ROUTES } from '../../constants';
// import { getBasicScene } from 'pages/Home/scenes';
import { prefixRoute } from 'utils/utils.routing';
import { LinkButton } from '@grafana/ui';
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
      }),
    ],
  });
}
