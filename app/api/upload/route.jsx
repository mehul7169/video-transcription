import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { AssemblyAI } from 'assemblyai'

const client = new AssemblyAI({
  apiKey: '36a4883a4e8141f4aa7a0abc5d105515'
})

export async function POST(request) {
  const body = await request.json();
 
  try {
    const transcript = ""
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        // Generate a client token for the browser to upload the file
        // ⚠️ Authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.
 
        return {
          allowedContentTypes: ['audio/mpeg', 'audio/mp3', 'audio/wav'],
          tokenPayload: JSON.stringify({
            video: "video"
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
 
        const config = {
          audio_url: blob.url
        }
        console.log("Printing transcript")
        transcript = await client.transcript.create(config)

        console.log(transcript)
        
 
        try {
          console.log('blob upload completed', blob, tokenPayload);
        } catch (error) {
          throw new Error('Could not update user');
        }
      },
    });
 
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.error(error);
  }
}