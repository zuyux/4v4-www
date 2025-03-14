import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = await request.formData();
    const file = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    try {
      // Attempt to upload the file to Pinata
      const { cid } = await pinata.upload.public.file(file);
      // Construct the public URL using Pinata's gateway
      const url = await pinata.gateways.public.convert(cid);

      // Return the URL to the client
      return NextResponse.json({ url: url }, { status: 200 });
    } catch (pinataError) { // Removed : any
        // Handle Pinata-specific errors
        console.error("Pinata upload error:", pinataError);
        let errorMessage = "File upload failed";
        if (pinataError instanceof Error) {
            errorMessage = pinataError.message;
        }
        return NextResponse.json(
            { error: "Pinata Error: " + errorMessage },
            { status: 500 }
        );
    }

  } catch (e) { // Removed : any
    // Handle general errors
    console.error("Error in API route:", e);
    let errorMessage = "An unexpected error occurred";
    if (e instanceof Error) {
        errorMessage = e.message;
    }
    return NextResponse.json(
      { error: "Internal Server Error: " + errorMessage },
      { status: 500 }
    );
  }
}