import React from 'react';
import { CmsField } from 'netlify-cms-core';

type WidgetParams<T> = T & CmsField;

export interface WidgetComponentProps<T> {
  field: any;
  forID: string;
  value: T;
  classNameWrapper: string;
  setActiveStyle: () => void;
  setInactiveStyle: () => void;
  onChange: (value: T) => void;
}

interface WidgetProps<T, P> {
  value: T;
  onChange: (value: T) => void;
  params: WidgetParams<P>;
}

function Widget<T, P = CmsField>(
  Component: React.ComponentType<WidgetProps<T, P>>,
  config?: {
    isValid?: (value: T) => boolean | { error: { message: string } };
    activateFix?: boolean;
  }
) {
  return class WidgetComponent extends React.Component<WidgetComponentProps<T>> {
    getParams = (): WidgetParams<P> => {
      const params: any = {};
      this.props.field._root.entries.forEach((p: string[]) => {
        params[p[0]] = p[1];
      });
      return params;
    };

    isValid = () => (config && config.isValid && config.isValid(this.props.value)) || true;

    render() {
      const { forID, classNameWrapper, setActiveStyle, setInactiveStyle } = this.props;
      return (
        <div
          id={forID}
          className={classNameWrapper}
          onFocus={config?.activateFix ? undefined : setActiveStyle}
          onBlur={setInactiveStyle}
        >
          <Component
            value={this.props.value}
            onChange={this.props.onChange}
            params={this.getParams()}
          />
        </div>
      );
    }
  };
}

export { Widget };
