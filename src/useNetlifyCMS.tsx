import { useEffect } from 'react';
import CMS from 'netlify-cms-app';
import { CmsConfig } from 'netlify-cms-core';

export interface NetlifyCMSProps extends CmsConfig {
  onLoad?: (cms: typeof CMS) => void;
}

export const useNetlifyCMS = ({ onLoad, ...config }: NetlifyCMSProps) => {
  useEffect(() => {
    CMS.init({
      config: config,
    });

    if (onLoad) onLoad(CMS);
  }, [onLoad, config]);
};
