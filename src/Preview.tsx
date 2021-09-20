import { PreviewTemplateComponentProps } from 'netlify-cms-core';

export function Preview<T>(Component: (values: T) => JSX.Element) {
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

    return Component(values);
  };

  return Preview;
}
