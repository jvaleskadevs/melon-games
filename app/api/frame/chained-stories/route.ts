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
 
  return new NextResponse(getFrameHtmlResponse({
    buttons: [
      {
        label: 'Play'
      }
    ],
    image: {
      src: `${URL}/chained_stories_1.png`,
      aspectRatio: '1.91:1'
    },
    postUrl: `${URL}/api/frame/chained-stories`
  }));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
