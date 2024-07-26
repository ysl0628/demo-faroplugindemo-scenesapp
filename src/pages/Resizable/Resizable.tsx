import React from 'react';
import { getScene } from './resizableScene';

export const ResizablePluginPage = () => {
  const scene = getScene();

  return <scene.Component model={scene} />;
};
