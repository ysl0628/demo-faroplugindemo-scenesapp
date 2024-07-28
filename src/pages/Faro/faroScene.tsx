import {
  AdHocFiltersVariable,
  EmbeddedScene,
  PanelBuilders,
  SceneApp,
  SceneAppPage,
  SceneGridItem,
  SceneGridLayout,
  SceneRefreshPicker,
  SceneTimePicker,
  SceneToolbarButton,
  SceneVariableSet,
  CustomVariable,
  VariableValueSelectors,
} from '@grafana/scenes';
import { ROUTES } from '../../constants';
import { prefixRoute } from 'utils/utils.routing';
import { getDataSourceSrv } from '@grafana/runtime';
import { Icon, Tooltip } from '@grafana/ui';
import React from 'react';

const getGridLayoutScene = () => {
  return new EmbeddedScene({
    $variables: new SceneVariableSet({
      variables: [
        new AdHocFiltersVariable({
          name: 'Filters',
          // Only want keys for this series
          baseFilters: [{ key: '__name__', operator: '=', value: 'ALERTS', condition: '' }],
          datasource: { uid: 'gdev-prometheus' },
        }),
      ],
    }),
    controls: [new VariableValueSelectors({})],
    body: new SceneGridLayout({
      isResizable: true,
      isDraggable: true,
      key: 'Faro',
      children: [
        new SceneGridItem({
          x: 0,
          y: 0,
          width: 5,
          height: 5,
          key: 'PageLoads',
          isResizable: false,
          isDraggable: false,
          body: PanelBuilders.stat()
            .setTitle('Page Loads')
            .setHeaderActions(
              <Tooltip content="Tooltip">
                <Icon name="exclamation-circle" />
              </Tooltip>
            )
            .build(),
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
  const variable = new CustomVariable({
    name: 'Logs',
    options: [],
    value: '',
    text: '',
    query: '',
  });

  variable.addActivationHandler(() => {
    const bes = getDataSourceSrv().getList({ filter: (ds) => ds.type === 'loki' });
    const options = bes.map((be) => ({ label: be.name, value: be.uid }));
    variable.setState({ options, value: options[0].value, text: options[0].label });
  });

  return new SceneApp({
    name: 'Faro',
    pages: [
      new SceneAppPage({
        title: 'LinkOrchard',
        url: prefixRoute(ROUTES.Faro),
        $variables: new SceneVariableSet({ variables: [variable] }),
        controls: [
          new VariableValueSelectors({}),
          new SceneTimePicker({}),
          new SceneRefreshPicker({}),
          new SceneToolbarButton({
            icon: 'document-info',
            onClick: () => {
              console.log('Hello World');
            },
          }),
        ],
        tabs: [
          new SceneAppPage({
            title: 'Overview',
            hideFromBreadcrumbs: true,
            url: prefixRoute(`${ROUTES.Faro}/overview`),
            getScene: getGridLayoutScene,
          }),
          new SceneAppPage({
            title: 'Errors',
            hideFromBreadcrumbs: true,
            url: prefixRoute(`${ROUTES.Faro}/errors`),
            getScene: getGridLayoutScene,
          }),
          new SceneAppPage({
            title: 'Sessions',
            hideFromBreadcrumbs: true,
            url: prefixRoute(`${ROUTES.Faro}/sessions`),
            getScene: getGridLayoutScene,
          }),
        ],
        getScene: getGridLayoutScene,
      }),
    ],
  });
};
