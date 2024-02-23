import {
  EmbeddedScene,
  PanelBuilders,
  SceneApp,
  SceneAppPage,
  SceneGridItem,
  SceneGridLayout,
  VariableValueSelectors,
} from '@grafana/scenes';
import { ROUTES } from '../../constants';
import { prefixRoute } from 'utils/utils.routing';

const getGridLayoutScene = () => {
  return new EmbeddedScene({
    body: new SceneGridLayout({
      isResizable: true,
      isDraggable: true,
      key: 'Resizable',
      children: [
        new SceneGridItem({
          x: 0,
          y: 0,
          width: 20,
          height: 5,
          key: 'Outsider',
          isResizable: true,
          isDraggable: true,
          body: PanelBuilders.timeseries().setTitle('Outsider').build(),
        }),
        new SceneGridItem({
          x: 0,
          y: 0,
          width: 20,
          height: 5,
          isResizable: true,
          isDraggable: true,
          key: 'Outsider2',
          body: PanelBuilders.timeseries().setTitle('Outsider2').build(),
        }),
      ],
    }),
  });
};

export const getScene = () => {
  return new SceneApp({
    name: 'Resizable',
    pages: [
      new SceneAppPage({
        title: 'Resizable',
        url: prefixRoute(ROUTES.Resizable),
        controls: [new VariableValueSelectors({})],
        getScene: getGridLayoutScene,
      }),
    ],
  });
};
