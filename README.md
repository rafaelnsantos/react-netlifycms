# React NetlifyCMS with Identity Widget

```bash
yarn add @monx/react-netlifycms
yarn add -D @types/netlify-identity-widget 
```

## collections.ts

```typescript
import { CmsCollection } from '@monx/react-netlifycms';

export const collections: CmsCollection[] = [
  {
    name: 'blog',
    label: 'Post',
    folder: 'blog',
    create: true,
    fields: [
      { label: 'Published', name: 'published', widget: 'boolean' },
      { label: 'Title', name: 'title', widget: 'string' },
      { label: 'Publish Date', name: 'date', widget: 'datetime' },
      { label: 'Body', name: 'body', widget: 'editor' },
      { label: 'Authors', name: 'authors', widget: 'list' },
    ],
  },
]
```

## Page

```typescript
import dynamic from 'next/dynamic';
import { collections } from '~/admin/collections'
import { PostPreview } from '~/admin/previews/Post'
import { TinyMCEWidget } from '~/admin/widgets/TinyMCEWidget';

const NetlifyCMS = dynamic(() => import('@monx/react-netlifycms'), {
  ssr: false,
})

// import NetlifyCMS from '@monx/react-netlifycms'

export default function AdminPage() {
  return (
    <NetlifyCMS
      cms={{
        config: {
          backend: {
            name: 'git-gateway',
            branch: 'master',
          },
          media_folder: 'public/uploads',
          public_folder: 'uploads',
          collections,
          local_backend: process.env.NODE_ENV !== 'production',
          load_config_file: false,
        },
        onLoad: (cms) => {
          cms.registerPreviewTemplate('blog', PostPreview);
          cms.registerWidget('editor', TinyMCEWidget);
        },
      }}
      identity={{ // optional
        config: {
          logo: false
        },
        onLoad: (identity) => {

        }
      }}
    />
  );
}
```

## Preview

```typescript
import { Preview } from '@monx/react-netlifycms/dist/Preview';
import { PostTemplate } from '~/components/templates/Post';

interface Post {
  published:boolean;
  title: string;
  date: Date;
  body: string;
  authors: string[];
}

export const PostPreview = Preview<Post>(({ values }) => {
  return <PostTemplate post={values} />;
});
```

## Widget

```typescript
import Widget from '@monx/react-netlifycms/dist/Widget';
import { Editor } from '@tinymce/tinymce-react';

export const TinyMCEWidget = Widget<string>(({ onChange, value }) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
      value={value}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'codesample',
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | codesample | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
      }}
      onEditorChange={(content) => onChange(content)}
    />
  );
});
```

## Dev mode

to access admin in dev mode

```bash
yarn add -D concurrently netlify-cms-proxy-server
```

add script in package.json

```json
"dev:admin": "concurrently \"next dev\" \"netlify-cms-proxy-server\""
```

run

```bash
yarn dev:admin
```
