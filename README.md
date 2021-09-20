# React NetlifyCMS with Identity Widget

```bash
yarn add react-netlifycms
```

## collections.ts

```typescript
import { CmsCollection } from 'react-netlifycms';
import { TinyMCEField } from './widgets/TinyMCEWidget';

export const collections: CmsCollection[] = [
  {
    name: 'post',
    label: 'Post',
    folder: 'blog',
    create: true,
    fields: [
      { label: 'Published', name: 'published', widget: 'boolean' },
      { label: 'Title', name: 'title', widget: 'string' },
      { label: 'Publish Date', name: 'date', widget: 'datetime' },
      { label: 'Body', name: 'body', widget: 'editor' } as TinyMCEField,
      { label: 'Authors', name: 'authors', widget: 'list' },
    ],
  },
]
```

## Page (admin.tsx)

```typescript
import React from 'react';
import dynamic from 'next/dynamic';
import { collections } from '../admin/collections'
import { PostPreview } from '../admin/previews/PostPreview'
import { TinyMCEWidget } from '../admin/widgets/TinyMCEWidget';

const NetlifyCMS = dynamic(() => import('react-netlifycms'), {
  ssr: false,
});

export default function AdminPage() {
  return (
    <NetlifyCMS
      cms={{
        backend: {
          name: 'git-gateway',
          branch: 'master',
        },
        media_folder: 'public/uploads',
        public_folder: '/uploads',
        collections,
        local_backend: process.env.NODE_ENV !== 'production',
        load_config_file: false,

        onLoad: (cms) => {
          cms.registerPreviewTemplate('post', PostPreview);
          cms.registerWidget('editor', TinyMCEWidget);
        },
      }}
    />
  );
}
```

## Custom Preview (PostPreview.tsx)

```typescript
import React from 'react';
import { Preview } from 'react-netlifycms';
import { PostTemplate } from '~/components/templates/Post';

interface Post {
  published:boolean;
  title: string;
  date: Date;
  body: string;
  authors: string[];
}

export const PostPreview = Preview<Post>(post) => {
  return <PostTemplate post={post} />;
};
```

## Custom Widget

```typescript
import React from 'react';
import { Editor, IAllProps } from '@tinymce/tinymce-react';
import { Widget, WidgetParams } from 'react-netlifycms';

type TinyMCEWidgetProps = IAllProps['init'] & {
  apiKey?: string;
};

export const TinyMCEWidget = Widget<string, TinyMCEWidgetProps>(
  ({ onChange, value, params: { apiKey, ...init } }) => {
    return (
      <Editor
        apiKey={apiKey}
        value={value}
        init={init}
        onEditorChange={(content) => onChange(content)}
      />
    );
  }
);

export type TinyCmsField = WidgetParams<TinyMCEWidgetProps, 'editor'>;
```

## Access admin in dev mode

```bash
yarn add -D concurrently netlify-cms-proxy-server
```

edit dev script in package.json

```json
{
  "scripts": {
    "dev": "concurrently \"next dev\" \"netlify-cms-proxy-server\""
  }
}
```

run

```bash
yarn dev
```
