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
  const imageIndex: string = typeof searchParams.img === "string" 
    ?  searchParams.img : '0';
  
  const title = 'Melon Games';
  const description = 'Melon Games';
  const image = `${URL}/hidden_words.jpg`;

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
    //input: { text: 'Some text' },
    postUrl: `${URL}/api/frame/hidden-words?img=${imageIndex}`
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
