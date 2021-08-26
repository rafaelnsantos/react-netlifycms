import React from 'react';
import { NetlifyCMSProps, useNetlifyCMS } from './useNetlifyCMS';
import { IdentityWidgetProps, useIdentityWidget } from './useIdentityWidget';

interface TemplateProps {
  cms: NetlifyCMSProps;
  identity?: IdentityWidgetProps;
}

export default function Template(props: TemplateProps) {
  useNetlifyCMS(props.cms);
  useIdentityWidget(props.identity || {});

  return <></>;
}
