import React from 'react';
import { getScene } from './faroScene';

export const FaroPluginPage = () => {
  const scene = getScene();

  return <scene.Component model={scene} />;
};
