import { useEffect } from 'react';
import identity, { InitOptions } from 'netlify-identity-widget';

export interface IdentityWidgetProps extends InitOptions {
  onLoad?: (identit: typeof identity) => void;
}

export const useIdentityWidget = ({ onLoad, ...config }: IdentityWidgetProps) => {
  useEffect(() => {
    (window as any).netlifyIdentity = identity;

    if (onLoad) onLoad(identity);

    identity.init(config);
  }, [onLoad, config]);
};
