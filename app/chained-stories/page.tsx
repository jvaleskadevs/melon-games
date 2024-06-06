import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata, ResolvingMetadata } from 'next';
import { URL } from '../config';

type Props = {
  params: { img: string },
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const title = 'Melon Games';
  const description = 'Melon Games';
  const image = `${URL}/chained_stories_0.png`;

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: 'Play'
      }
    ],
    image: { 
      src: image, 
      aspectRatio: '1.91:1' 
    },
    postUrl: `${URL}/api/frame/chained-stories`
  });
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image]
    },
    other: { ...frameMetadata }
  }
}

export default function Page({ params, searchParams }: Props) {
  return <><h1>Melon Games is a Farcaster frame!</h1></>
}
