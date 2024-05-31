import { getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import {
  init,
  validateFramesMessage,
  ValidateFramesMessageInput,
  ValidateFramesMessageOutput,
} from '@airstack/frames';
import { toHex } from 'viem';
import { URL } from '../../../config';
import { Errors } from '../../../errors';

init(process.env.AIRSTACK_API_KEY ?? '');

async function getResponse(req: NextRequest): Promise<NextResponse> { 
  try {
    const body: ValidateFramesMessageInput = await req.json();
    const { isValid, message } = await validateFramesMessage(body);
    if (!isValid) return new NextResponse(Errors.NoValidMessage);
  } catch (err) {
    console.log(err);
  }
  
  //const fid: number | undefined = message?.data?.fid || undefined;
  //const action = message?.data?.frameActionBody || undefined;
  
  //console.log(toHex(action?.castId?.hash ?? ''));
  //const text = action?.inputText?.[0] || '';
  
  /*
  if (action?.buttonIndex === 1) {
    console.log(fid);
  }
  */
  
  const imageIndex: string = req.nextUrl.searchParams.get('img') ?? '69';
 
  return new NextResponse(getFrameHtmlResponse({
    buttons: [
      {
        label: 'Play'
      }
    ],
    image: {
      src: `${URL}/gb_${imageIndex}.png`,
      aspectRatio: '1:1'
    },
    postUrl: `${URL}/api/frame/guess-block?img=${imageIndex}`
  }));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
