import React, { ComponentType } from 'react';
import { CmsField, CmsWidgetControlProps } from 'netlify-cms-core';

export type WidgetParams<P, N = string> = CmsField & P & { widget: N };

function Widget<T, P = CmsField>(
  Component: ComponentType<CmsWidgetControlProps<T> & { params: WidgetParams<P> }>,
  config?: {
    isValid?: (value: T) => boolean | { error: { message: string } };
    activateFix?: boolean;
  }
) {
  return class WidgetComponent extends React.Component<CmsWidgetControlProps<T>> {
    getParams = (): WidgetParams<P> => {
      const params: any = {};
      this.props.field.forEach((value, key) => {
        if (key) params[key] = value;
      });
      return params;
    };

    isValid = () => config?.isValid?.(this.props.value) || true;

    render() {
      return <Component {...this.props} params={this.getParams()} />;
    }
  };
}

export { Widget };
