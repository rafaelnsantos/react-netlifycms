import React, { ComponentType } from 'react';
import { CmsField, CmsWidgetControlProps } from 'netlify-cms-core';

type WidgetParams<T> = T & CmsField;

export interface WidgetComponentProps<T> extends CmsWidgetControlProps<T> {
  setActiveStyle: () => void;
  setInactiveStyle: () => void;
}

function Widget<T, P = CmsField>(
  Component: ComponentType<CmsWidgetControlProps<T> & { params: WidgetParams<P> }>,
  config?: {
    isValid?: (value: T) => boolean | { error: { message: string } };
    activateFix?: boolean;
  }
) {
  return class WidgetComponent extends React.Component<WidgetComponentProps<T>> {
    getParams = (): WidgetParams<P> => {
      const params: any = {};
      this.props.field.forEach((value, key) => {
        if (key) params[key] = value;
      });
      return params;
    };

    isValid = () => (config && config.isValid && config.isValid(this.props.value)) || true;

    render() {
      const { forID, classNameWrapper, field, setActiveStyle, setInactiveStyle } = this.props;
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
            forID={forID}
            field={field}
            classNameWrapper={classNameWrapper}
            params={this.getParams()}
          />
        </div>
      );
    }
  };
}

export { Widget };
