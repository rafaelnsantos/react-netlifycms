import React, { ComponentType } from 'react';
import { PreviewTemplateComponentProps } from 'netlify-cms-core';

interface PreviewProps<T> {
  values: T;
}

export function Preview<T>(Component: ComponentType<PreviewProps<T>>) {
  const Preview = ({ entry }: PreviewTemplateComponentProps) => {
    function test(prev: any, value: any, key: string) {
      if (typeof value === 'object' && typeof value.getMonth !== 'function') {
        prev[key] = value.reduce(test, value._tail ? [] : {});
      } else {
        if (Array.isArray(prev[key])) {
          prev[key].push(value);
        } else {
          prev[key] = value;
        }
      }
      return prev;
    }

    const values = entry.getIn(['data']).reduce(test, {});

    return <Component values={values} />;
  };

  return Preview;
}
